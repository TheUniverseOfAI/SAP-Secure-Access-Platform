export type NewsCategory = 'tech' | 'ai' | 'sports' | 'cybersecurity'

export interface NewsArticle {
  id: string
  category: NewsCategory
  headline: string
  summary: string
  source: string
  time: string
}

export const CATEGORY_LABELS: Record<NewsCategory, string> = {
  tech: 'Tech',
  ai: 'AI',
  sports: 'Sports',
  cybersecurity: 'Cybersecurity',
}

/**
 * Mock news feed — no real news API exists (or is planned) yet, this is
 * placeholder content for the new /home landing page. Headlines/sources
 * are invented for demo purposes, not real articles, so none of these
 * cards link anywhere - same "no fabricated destination" reasoning
 * PortalCard's inert "Launch" link already uses for external targets
 * this app doesn't own.
 */
export const newsArticles: NewsArticle[] = [
  {
    id: 'tech-1',
    category: 'tech',
    headline: 'Quantum-Resistant Encryption Standard Finalized',
    summary: 'NIST publishes the final version of its post-quantum cryptography standard for federal systems.',
    source: 'TechWire',
    time: '1 hour ago',
  },
  {
    id: 'tech-2',
    category: 'tech',
    headline: 'Major Cloud Providers Announce Unified Identity Protocol',
    summary: 'A cross-vendor working group proposes a shared standard for federated enterprise identity.',
    source: 'InfraDaily',
    time: '4 hours ago',
  },
  {
    id: 'tech-3',
    category: 'tech',
    headline: 'Passkeys Adoption Passes 60% Among Fortune 500',
    summary: 'Password-free authentication continues to displace traditional credentials in large enterprises.',
    source: 'The Register Desk',
    time: 'Yesterday',
  },
  {
    id: 'ai-1',
    category: 'ai',
    headline: 'New Model Benchmarks Show Gains in Reasoning Tasks',
    summary: 'Independent evaluators report double-digit improvements on multi-step reasoning benchmarks.',
    source: 'AI Weekly',
    time: '2 hours ago',
  },
  {
    id: 'ai-2',
    category: 'ai',
    headline: 'Enterprises Shift Budget Toward AI Governance Tooling',
    summary: 'Survey finds compliance and audit tooling now outpacing raw model spend at large organizations.',
    source: 'Enterprise AI Report',
    time: '6 hours ago',
  },
  {
    id: 'ai-3',
    category: 'ai',
    headline: 'Open-Weight Models Close the Gap on Coding Tasks',
    summary: 'Latest open releases post competitive scores against proprietary models on coding benchmarks.',
    source: 'ML Digest',
    time: 'Yesterday',
  },
  {
    id: 'sports-1',
    category: 'sports',
    headline: 'League Announces Expanded Playoff Format Starting Next Season',
    summary: 'The new format adds two wild-card slots and a revamped tiebreaker system.',
    source: 'SportsCenter Wire',
    time: '3 hours ago',
  },
  {
    id: 'sports-2',
    category: 'sports',
    headline: 'Underdog Squad Clinches Division Title on Final Day',
    summary: 'A last-minute win secures the division after trailing for most of the season.',
    source: 'GameDay Report',
    time: '5 hours ago',
  },
  {
    id: 'sports-3',
    category: 'sports',
    headline: 'Star Player Returns Ahead of Schedule After Injury',
    summary: 'Medical staff clear the all-star for full contact practice two weeks early.',
    source: 'Locker Room Wire',
    time: 'Yesterday',
  },
  {
    id: 'cyber-1',
    category: 'cybersecurity',
    headline: 'Critical Vulnerability Disclosed in Widely-Used VPN Appliance',
    summary: 'Vendor releases emergency patch; agencies urged to update within 48 hours.',
    source: 'ThreatPost Daily',
    time: '30 minutes ago',
  },
  {
    id: 'cyber-2',
    category: 'cybersecurity',
    headline: 'Phishing Campaign Impersonates Federal Benefits Portals',
    summary: 'Security researchers track a coordinated campaign targeting government employee credentials.',
    source: 'SecOps Bulletin',
    time: '3 hours ago',
  },
  {
    id: 'cyber-3',
    category: 'cybersecurity',
    headline: 'New Guidance Released on Zero Trust Implementation Timelines',
    summary: 'Updated federal guidance sets revised milestones for agency zero-trust architecture rollouts.',
    source: 'GovSec Weekly',
    time: 'Yesterday',
  },
]

export function articlesByCategory(category: NewsCategory): NewsArticle[] {
  return newsArticles.filter((a) => a.category === category)
}
