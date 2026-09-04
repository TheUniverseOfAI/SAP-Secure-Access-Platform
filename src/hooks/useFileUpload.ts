import { useEffect, useRef, useState } from 'react'
import { ACCEPTED_EXTENSIONS, MAX_FILE_SIZE_BYTES, formatFileSize } from '../data/documents'

export interface UploadQueueEntry {
  id: string
  file: File
  progress: number
  status: 'uploading' | 'error'
  error?: string
}

let nextId = 0

function validate(file: File): string | null {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
  if (!ACCEPTED_EXTENSIONS.includes(ext)) return `.${ext || '?'} isn't a supported file type.`
  if (file.size > MAX_FILE_SIZE_BYTES) return `Exceeds the ${formatFileSize(MAX_FILE_SIZE_BYTES)} limit.`
  return null
}

/**
 * Drives an upload queue for DocDropzone: validates each file up front
 * (extension + size, same rules the dropzone already advertises), then
 * simulates real transfer progress for the valid ones before calling
 * `onUpload` — instead of adding the file to the document list the
 * instant it's picked, which reads as fake even for a mock backend.
 *
 * Progress is tracked in a plain closure variable per file rather than
 * read back out of React state, since state updates are async and a
 * setInterval tick needs the exact current value to decide when it's
 * done — mirroring it through a ref would be equivalent but noisier.
 * Only the setInterval handles themselves need a ref (to clear them on
 * cancel/unmount).
 */
export function useFileUpload(onUpload: (file: File) => Promise<void>) {
  const [queue, setQueue] = useState<UploadQueueEntry[]>([])
  const timers = useRef(new Map<string, ReturnType<typeof setInterval>>())

  useEffect(() => {
    const timersAtMount = timers.current
    return () => {
      timersAtMount.forEach(clearInterval)
      timersAtMount.clear()
    }
  }, [])

  const addFiles = (files: FileList | File[]) => {
    Array.from(files).forEach((file) => {
      const id = `upload-${nextId++}`
      const error = validate(file)

      if (error) {
        setQueue((q) => [...q, { id, file, progress: 0, status: 'error', error }])
        return
      }

      setQueue((q) => [...q, { id, file, progress: 0, status: 'uploading' }])

      let progress = 0
      const interval = setInterval(() => {
        progress = Math.min(progress + 8 + Math.random() * 14, 100)
        setQueue((q) => q.map((entry) => (entry.id === id ? { ...entry, progress } : entry)))

        if (progress >= 100) {
          clearInterval(interval)
          timers.current.delete(id)
          onUpload(file).then(() => {
            setQueue((q) => q.filter((entry) => entry.id !== id))
          })
        }
      }, 120)
      timers.current.set(id, interval)
    })
  }

  const dismiss = (id: string) => {
    const timer = timers.current.get(id)
    if (timer) {
      clearInterval(timer)
      timers.current.delete(id)
    }
    setQueue((q) => q.filter((entry) => entry.id !== id))
  }

  return { queue, addFiles, dismiss }
}
