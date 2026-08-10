export type PortalCategory = 'ai' | 'dev' | 'productivity' | 'health' | 'education' | 'data'
export type PortalStatus = 'live' | 'beta' | 'dev' | 'planned'

export interface Portal {
  name: string
  cat: PortalCategory
  icon: string
  color: string
  status: PortalStatus
  desc: string
}

export const CATEGORY_LABELS: Record<PortalCategory, string> = {
  ai: 'AI & ML',
  dev: 'Dev Tools',
  productivity: 'Productivity',
  health: 'Health',
  education: 'Education',
  data: 'Data',
}

/** Source: the `portals` array in sap-portal_v2.html's inline script. */
export const portals: Portal[] = [
  { name: 'RAG Studio', cat: 'ai', icon: 'RS', color: 'linear-gradient(135deg,#1d5cbf,#3b82f6)', status: 'live',
    desc: 'Build, test, and deploy Retrieval-Augmented Generation pipelines. Chat with docs, extract summaries, test retrieval strategies, and manage production RAG configs.' },
  { name: 'AI4Free', cat: 'ai', icon: '4F', color: 'linear-gradient(135deg,#9333ea,#a855f7)', status: 'live',
    desc: 'Open AI notebook environment with curated books, learning roadmaps, and hands-on tutorials. From Python basics to advanced ML — your free AI learning hub.' },
  { name: 'Project++', cat: 'ai', icon: 'P+', color: 'linear-gradient(135deg,#0d9488,#14b8a6)', status: 'live',
    desc: 'End-to-end AI/ML project lifecycle manager. Plan, develop, train, evaluate, and deploy models with integrated CI/CD, experiment tracking, and one-click deployment.' },
  { name: 'PII Tracker', cat: 'productivity', icon: 'PI', color: 'linear-gradient(135deg,#ea580c,#f97316)', status: 'live',
    desc: 'Personal information intelligence dashboard. Track your PII across systems, monitor data footprint, manage consent records, and auto-detect exposure risks.' },
  { name: 'AI SWE', cat: 'dev', icon: 'SW', color: 'linear-gradient(135deg,#16a34a,#22c55e)', status: 'live',
    desc: 'Full-stack application builder powered by AI. Scaffold React/Node/Python apps, generate components, debug with AI pair programming, and deploy to production.' },
  { name: 'AI Studio', cat: 'ai', icon: 'AS', color: 'linear-gradient(135deg,#db2777,#ec4899)', status: 'live',
    desc: 'Comprehensive AI media library. Video courses, research papers, podcast episodes, model demos, and curated collections organized by topic and difficulty level.' },
  { name: 'Bookmark Hub', cat: 'productivity', icon: 'BM', color: 'linear-gradient(135deg,#d97706,#f59e0b)', status: 'beta',
    desc: 'Universal bookmark aggregator. Import from Chrome, Firefox, Safari, and Edge. AI-powered tagging, duplicate detection, dead link checking, and smart search across all browsers.' },
  { name: 'MyDr Studio', cat: 'health', icon: 'Dr', color: 'linear-gradient(135deg,#dc2626,#ef4444)', status: 'beta',
    desc: 'Personal health tracker with AI diagnostics. Log vitals, medications, appointments, and symptoms. Includes AI models for sleep analysis, nutrition tracking, and mental wellness.' },
  { name: 'AI for Education', cat: 'education', icon: 'Ed', color: 'linear-gradient(135deg,#4f46e5,#6366f1)', status: 'live',
    desc: 'AI-powered learning platform. Adaptive quizzes, study plan generator, flashcard builder, essay grading assistant, and progress analytics for students and educators.' },
  { name: 'Todo Portal', cat: 'productivity', icon: 'TD', color: 'linear-gradient(135deg,#0891b2,#06b6d4)', status: 'live',
    desc: 'Smart task management with AI prioritization. Kanban boards, calendar sync, recurring tasks, team assignments, time tracking, and natural language task creation.' },
  { name: 'DataForge', cat: 'data', icon: 'DF', color: 'linear-gradient(135deg,#374151,#6b7280)', status: 'live',
    desc: 'Visual data pipeline builder. Connect 50+ sources (SQL, NoSQL, APIs, files), transform with drag-and-drop nodes, schedule jobs, and monitor pipeline health in real time.' },
  { name: 'ModelHub', cat: 'ai', icon: 'MH', color: 'linear-gradient(135deg,#7c3aed,#a78bfa)', status: 'live',
    desc: 'Model registry and versioning platform. Store, compare, and serve ML models. A/B testing, canary deployments, drift monitoring, and automated retraining triggers.' },
  { name: 'PromptLab', cat: 'ai', icon: 'PL', color: 'linear-gradient(135deg,#e11d48,#f43f5e)', status: 'beta',
    desc: 'Prompt engineering workspace. Version-control prompts, run A/B evaluations across LLMs, share prompt libraries with your team, and track cost-per-prompt analytics.' },
  { name: 'CloudOps', cat: 'dev', icon: 'CO', color: 'linear-gradient(135deg,#1a4080,#1d5cbf)', status: 'live',
    desc: 'Infrastructure monitoring and alerting dashboard. Multi-cloud visibility (AWS, GCP, Azure), cost analytics, auto-scaling policies, and incident runbooks.' },
  { name: 'API Gateway', cat: 'dev', icon: 'AG', color: 'linear-gradient(135deg,#065f46,#059669)', status: 'live',
    desc: 'API management console. Design, document, version, and rate-limit APIs. OpenAPI spec editor, mock server, automated testing, and usage analytics per consumer.' },
  { name: 'SecureVault', cat: 'dev', icon: 'SV', color: 'linear-gradient(135deg,#78350f,#a16207)', status: 'live',
    desc: 'Secrets and credentials manager. Store API keys, certificates, SSH keys, and tokens. Role-based access, audit trail, auto-rotation, and CI/CD integration.' },
  { name: 'AI Canvas', cat: 'ai', icon: 'AC', color: 'linear-gradient(135deg,#86198f,#c026d3)', status: 'dev',
    desc: 'Visual AI workflow designer. Drag-and-drop ML pipeline builder with pre-built blocks for data preprocessing, feature engineering, training, evaluation, and serving.' },
  { name: 'AI Marketplace', cat: 'ai', icon: 'MP', color: 'linear-gradient(135deg,#4338ca,#6366f1)', status: 'dev',
    desc: 'Browse and deploy pre-built AI templates, fine-tuned models, RAG configurations, and agent workflows shared by the community. One-click deploy to your workspace.' },
  { name: 'HealthAI Lab', cat: 'health', icon: 'HL', color: 'linear-gradient(135deg,#9f1239,#e11d48)', status: 'dev',
    desc: 'AI for healthcare research. Medical image analysis, clinical NLP, drug interaction checker, patient risk scoring, and HIPAA-compliant model training environment.' },
  { name: 'EduBot Builder', cat: 'education', icon: 'EB', color: 'linear-gradient(135deg,#1e3a5f,#2563eb)', status: 'planned',
    desc: 'Create custom AI tutoring bots for any subject. Upload curriculum, define learning paths, and deploy chatbots that adapt to individual student pace and style.' },
]
