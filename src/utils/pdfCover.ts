import { pdfjs } from './pdfjs'

const COVER_WIDTH = 360

/** Reads a PDF's page count and renders page 1 as a small JPEG cover. Throws if it isn't a readable PDF. */
export async function readPdfInfo(file: File): Promise<{ pageCount: number; cover: string | null }> {
  const task = pdfjs.getDocument({ data: await file.arrayBuffer() })
  const pdf = await task.promise
  try {
    const page = await pdf.getPage(1)
    const base = page.getViewport({ scale: 1 })
    const viewport = page.getViewport({ scale: COVER_WIDTH / base.width })
    const canvas = document.createElement('canvas')
    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    const context = canvas.getContext('2d')
    if (!context) return { pageCount: pdf.numPages, cover: null }
    await page.render({ canvasContext: context, canvas, viewport }).promise
    return { pageCount: pdf.numPages, cover: canvas.toDataURL('image/jpeg', 0.82) }
  } finally {
    void task.destroy()
  }
}
