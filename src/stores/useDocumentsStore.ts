import { create } from 'zustand'
import { addDocument, deleteDocument, getDocuments } from '../api/documentsApi'
import type { Document } from '../data/documents'

interface DocumentsState {
  documents: Document[]
  loading: boolean
  error: string | null
  fetchDocuments: () => Promise<void>
  addDocument: (doc: Omit<Document, 'id'>) => Promise<void>
  deleteDocument: (id: string) => Promise<void>
}

/** Backs the Documents profile tab through src/api/documentsApi.ts — same pattern as useAuthSettingsStore. */
export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  documents: [],
  loading: false,
  error: null,

  fetchDocuments: async () => {
    set({ loading: true, error: null })
    try {
      const documents = await getDocuments()
      set({ documents, loading: false })
    } catch {
      set({ loading: false, error: 'Failed to load documents.' })
    }
  },

  addDocument: async (doc) => {
    try {
      const documents = await addDocument(doc)
      set({ documents })
    } catch {
      set({ error: 'Failed to add the document — please try again.' })
    }
  },

  deleteDocument: async (id) => {
    const previous = get().documents
    set({ documents: previous.filter((d) => d.id !== id) })
    try {
      await deleteDocument(id)
    } catch {
      set({ documents: previous, error: 'Failed to delete the document — please try again.' })
    }
  },
}))
