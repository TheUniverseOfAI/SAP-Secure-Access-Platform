import { create } from 'zustand'
import { addBook, deleteBook, listBooks } from '../api/libraryApi'
import { MAX_BOOK_BYTES, type LibraryBook } from '../data/library'
import { readPdfInfo } from '../utils/pdfCover'

interface LibraryState {
  books: LibraryBook[]
  loading: boolean
  /** Messages for files that couldn't be added (not a PDF, too big, unreadable). */
  errors: string[]
  fetchBooks: () => Promise<void>
  addFiles: (files: File[]) => Promise<void>
  removeBook: (id: string) => Promise<void>
  clearErrors: () => void
}

/** Backs the PDF library through src/api/libraryApi.ts (IndexedDB). */
export const useLibraryStore = create<LibraryState>((set, get) => ({
  books: [],
  loading: true,
  errors: [],

  fetchBooks: async () => {
    set({ books: await listBooks(), loading: false })
  },

  addFiles: async (files) => {
    const errors: string[] = []
    for (const file of files) {
      if (!/\.pdf$/i.test(file.name)) {
        errors.push(`${file.name}: only PDF files can be added here.`)
        continue
      }
      if (file.size > MAX_BOOK_BYTES) {
        errors.push(`${file.name}: larger than the ${MAX_BOOK_BYTES / 1024 / 1024} MB limit.`)
        continue
      }
      try {
        await addBook(file, await readPdfInfo(file))
      } catch {
        errors.push(`${file.name}: couldn't be read as a PDF.`)
      }
    }
    set({ books: await listBooks(), errors })
  },

  removeBook: async (id) => {
    set({ books: get().books.filter((b) => b.id !== id) })
    await deleteBook(id)
  },

  clearErrors: () => set({ errors: [] }),
}))
