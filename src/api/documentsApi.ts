import { seedDocuments, type Document } from '../data/documents'
import { request } from './client'

/** In-memory mock "database" for the Documents tab — a mutable copy of the seed data, standing in for a real backend table. */
let db: Document[] = seedDocuments.map((d) => ({ ...d }))
let nextId = db.length + 1

export async function getDocuments(): Promise<Document[]> {
  return request(db.map((d) => ({ ...d })))
}

export async function addDocument(doc: Omit<Document, 'id'>): Promise<Document[]> {
  db = [{ ...doc, id: `doc-upload-${nextId++}` }, ...db]
  return request(db.map((d) => ({ ...d })))
}

export async function deleteDocument(id: string): Promise<Document[]> {
  db = db.filter((d) => d.id !== id)
  return request(db.map((d) => ({ ...d })))
}
