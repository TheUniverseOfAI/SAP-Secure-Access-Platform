import type { ReactNode } from 'react'
import Breadcrumb from '../layouts/Breadcrumb'
import Card from './Card'
import PageHeader from './PageHeader'
import pageStyles from './DetailLayout.module.css'
import proseStyles from './Prose.module.css'

interface DetailLayoutProps {
  parent: string
  current: string
  title: string
  description: string
  updated?: string
  children: ReactNode
}

/**
 * Shared shell for the ~26 detail sub-pages (Privacy/Accessibility/Terms/
 * Status/Security/Help/Contact). Breadcrumb (with parent + current) +
 * PageHeader + a Card wrapping the page's content in Prose typography.
 * Reduces what would otherwise be 26x repeated boilerplate down to one
 * shell + per-page content.
 */
export default function DetailLayout({ parent, current, title, description, updated, children }: DetailLayoutProps) {
  return (
    <>
      <Breadcrumb parent={parent} current={current} />
      <div className={pageStyles.page}>
        <PageHeader title={title} description={description} updated={updated} />
        <Card>
          <div className={proseStyles.prose}>{children}</div>
        </Card>
      </div>
    </>
  )
}
