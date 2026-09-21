import type { LibraryBook } from '../data/library'

/**
 * The PDF library's storage. Unlike the other src/api files this is not a
 * mock latency simulator: with no backend, books live in the browser's own
 * database (IndexedDB) so they survive a refresh. Metadata (reading position,
 * bookmarks, cover) and the file's bytes are kept in separate object stores,
 * so listing the library never loads a whole PDF. A real backend would replace
 * this file and nothing that calls it.
 */
const DB_NAME = 'sap-library'
const META = 'books'
const FILES = 'files'

let dbPromise: Promise<IDBDatabase> | null = null

function openDb(): Promise<IDBDatabase> {
  dbPromise ??= new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1)
    req.onupgradeneeded = () => {
      req.result.createObjectStore(META, { keyPath: 'id' })
      req.result.createObjectStore(FILES)
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
  return dbPromise
}

function run<T>(store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const req = fn(db.transaction(store, mode).objectStore(store))
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error)
      }),
  )
}

export async function listBooks(): Promise<LibraryBook[]> {
  const books = await run<LibraryBook[]>(META, 'readonly', (s) => s.getAll())
  return books.sort((a, b) => (b.lastOpenedAt ?? b.addedAt) - (a.lastOpenedAt ?? a.addedAt))
}

export function getBook(id: string): Promise<LibraryBook | undefined> {
  return run<LibraryBook | undefined>(META, 'readonly', (s) => s.get(id))
}

export async function addBook(file: File, info: { pageCount: number; cover: string | null }): Promise<LibraryBook> {
  const book: LibraryBook = {
    id: crypto.randomUUID(),
    name: file.name,
    title: file.name.replace(/\.pdf$/i, ''),
    size: file.size,
    addedAt: Date.now(),
    lastOpenedAt: null,
    pageCount: info.pageCount,
    cover: info.cover,
    lastPage: 1,
    zoom: 1,
    rotation: 0,
    bookmarks: [],
  }
  await run(FILES, 'readwrite', (s) => s.put(file, book.id))
  await run(META, 'readwrite', (s) => s.put(book))
  return book
}

export function getBookFile(id: string): Promise<Blob | undefined> {
  return run<Blob | undefined>(FILES, 'readonly', (s) => s.get(id))
}

export async function updateBook(id: string, patch: Partial<Omit<LibraryBook, 'id'>>): Promise<void> {
  const book = await getBook(id)
  if (!book) return
  await run(META, 'readwrite', (s) => s.put({ ...book, ...patch }))
}

export async function deleteBook(id: string): Promise<void> {
  await run(META, 'readwrite', (s) => s.delete(id))
  await run(FILES, 'readwrite', (s) => s.delete(id))
}
