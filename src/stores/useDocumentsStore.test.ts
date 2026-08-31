import { beforeEach, describe, expect, it } from 'vitest'
import { seedDocuments } from '../data/documents'
import { useDocumentsStore } from './useDocumentsStore'

describe('useDocumentsStore', () => {
  beforeEach(async () => {
    useDocumentsStore.setState({ documents: [], loading: false, error: null })
    // The mock "database" in documentsApi.ts is module-level state, not reset between tests —
    // fetch once per test so each starts from whatever the previous test left behind, then assert deltas.
    await useDocumentsStore.getState().fetchDocuments()
  })

  it('loads the seed documents on first fetch', () => {
    const { documents } = useDocumentsStore.getState()
    expect(documents.length).toBeGreaterThanOrEqual(seedDocuments.length)
  })

  it('addDocument adds a new entry to the front of the list', async () => {
    const before = useDocumentsStore.getState().documents.length
    await useDocumentsStore
      .getState()
      .addDocument({ type: 'pdf', label: 'PDF', name: 'test-upload.pdf', meta: '12 KB · Uploaded just now' })

    const { documents } = useDocumentsStore.getState()
    expect(documents.length).toBe(before + 1)
    expect(documents[0]!.name).toBe('test-upload.pdf')
  })

  it('deleteDocument removes the entry by id', async () => {
    await useDocumentsStore.getState().addDocument({ type: 'txt', label: 'TXT', name: 'to-delete.txt', meta: '1 KB · Uploaded just now' })
    const added = useDocumentsStore.getState().documents[0]!
    const before = useDocumentsStore.getState().documents.length

    await useDocumentsStore.getState().deleteDocument(added.id)

    const { documents } = useDocumentsStore.getState()
    expect(documents.length).toBe(before - 1)
    expect(documents.find((d) => d.id === added.id)).toBeUndefined()
  })

  it('deleteDocument optimistically removes even if called for a nonexistent id (no-op on the mock backend)', async () => {
    const before = useDocumentsStore.getState().documents.length
    await useDocumentsStore.getState().deleteDocument('does-not-exist')
    expect(useDocumentsStore.getState().documents.length).toBe(before)
  })
})
