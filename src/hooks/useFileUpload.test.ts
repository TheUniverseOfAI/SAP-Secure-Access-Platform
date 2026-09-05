import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useFileUpload } from './useFileUpload'

function makeFile(name: string, sizeBytes = 1024): File {
  const file = new File(['x'], name, { type: 'application/octet-stream' })
  Object.defineProperty(file, 'size', { value: sizeBytes })
  return file
}

describe('useFileUpload', () => {
  it('rejects an unsupported extension immediately, without starting an upload', () => {
    const onUpload = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useFileUpload(onUpload))

    act(() => {
      result.current.addFiles([makeFile('malware.exe')])
    })

    expect(result.current.queue).toHaveLength(1)
    expect(result.current.queue[0]).toMatchObject({ status: 'error' })
    expect(result.current.queue[0]!.error).toMatch(/isn't a supported file type/)
    expect(onUpload).not.toHaveBeenCalled()
  })

  it('rejects a file over the 25 MB limit immediately', () => {
    const onUpload = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useFileUpload(onUpload))

    act(() => {
      result.current.addFiles([makeFile('huge.pdf', 26 * 1024 * 1024)])
    })

    expect(result.current.queue).toHaveLength(1)
    expect(result.current.queue[0]).toMatchObject({ status: 'error' })
    expect(result.current.queue[0]!.error).toMatch(/Exceeds/)
    expect(onUpload).not.toHaveBeenCalled()
  })

  it(
    'accepts a valid file, ticks progress up, then commits it via onUpload and clears the queue',
    async () => {
      const onUpload = vi.fn().mockResolvedValue(undefined)
      const { result } = renderHook(() => useFileUpload(onUpload))
      const file = makeFile('resume.pdf', 2048)

      act(() => {
        result.current.addFiles([file])
      })

      expect(result.current.queue).toHaveLength(1)
      expect(result.current.queue[0]).toMatchObject({ status: 'uploading', progress: 0 })

      await waitFor(() => expect(result.current.queue).toHaveLength(0), { timeout: 4000 })

      expect(onUpload).toHaveBeenCalledTimes(1)
      expect(onUpload).toHaveBeenCalledWith(file)
    },
    8000,
  )

  it('dismiss removes an error entry from the queue', () => {
    const onUpload = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useFileUpload(onUpload))

    act(() => {
      result.current.addFiles([makeFile('bad.exe')])
    })
    const id = result.current.queue[0]!.id

    act(() => {
      result.current.dismiss(id)
    })

    expect(result.current.queue).toHaveLength(0)
  })

  it(
    'dismiss cancels an in-progress upload without ever calling onUpload',
    async () => {
      const onUpload = vi.fn().mockResolvedValue(undefined)
      const { result } = renderHook(() => useFileUpload(onUpload))

      act(() => {
        result.current.addFiles([makeFile('report.pdf', 2048)])
      })
      const id = result.current.queue[0]!.id

      act(() => {
        result.current.dismiss(id)
      })
      expect(result.current.queue).toHaveLength(0)

      // Give the (now-cancelled) interval plenty of time to have fired if it were still running.
      await new Promise((resolve) => setTimeout(resolve, 1500))

      expect(onUpload).not.toHaveBeenCalled()
    },
    4000,
  )

  it('handles multiple files added in one call independently', () => {
    const onUpload = vi.fn().mockResolvedValue(undefined)
    const { result } = renderHook(() => useFileUpload(onUpload))

    act(() => {
      result.current.addFiles([makeFile('good.pdf', 1024), makeFile('bad.exe')])
    })

    expect(result.current.queue).toHaveLength(2)
    expect(result.current.queue.find((e) => e.file.name === 'good.pdf')).toMatchObject({ status: 'uploading' })
    expect(result.current.queue.find((e) => e.file.name === 'bad.exe')).toMatchObject({ status: 'error' })
  })
})
