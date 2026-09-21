import { pdfjs } from 'react-pdf'

// Vite-native way to get a correct, bundled URL for pdf.js's worker file —
// see https://github.com/wojtekmaj/react-pdf#configure-pdfjs-worker. One place
// so the viewer and the library's cover generation share the same setup.
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()

export { pdfjs }
