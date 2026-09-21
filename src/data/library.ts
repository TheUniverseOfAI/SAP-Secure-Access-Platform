export interface Bookmark {
  id: string
  page: number
  note: string
  createdAt: number
}

export interface LibraryBook {
  id: string
  name: string
  /** File name without its extension — what the library shows. */
  title: string
  size: number
  addedAt: number
  lastOpenedAt: number | null
  pageCount: number
  /** Small JPEG of page 1, as a data URL. */
  cover: string | null
  /** Reading position, restored when the book is reopened. */
  lastPage: number
  zoom: number
  rotation: number
  bookmarks: Bookmark[]
}

export const MAX_BOOK_BYTES = 100 * 1024 * 1024
