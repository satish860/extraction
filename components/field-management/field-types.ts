import { Type, Hash, File, Link, ChevronDown, Database, ToggleLeft, Code, FileText, Layers } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export type FieldType = 'text' | 'number' | 'file' | 'url' | 'single-select' | 'multi-select' | 'collection' | 'reference' | 'json' | 'page-splitter'

export interface FieldTypeConfig {
  id: FieldType
  name: string
  description: string
  icon: LucideIcon
  isNew?: boolean
}

export const FIELD_TYPES: FieldTypeConfig[] = [
  {
    id: 'text',
    name: 'Text',
    description: 'Generate freeform text, perfect for tasks like summarization and open ended analysis.',
    icon: Type,
  },
  {
    id: 'file',
    name: 'File',
    description: 'Upload and manage large files, from PDFs to CSVs. Use files as inputs for AI models.',
    icon: File,
  },
  {
    id: 'number',
    name: 'Number',
    description: 'Numeric data input and calculations.',
    icon: Hash,
    isNew: true,
  },
  {
    id: 'collection',
    name: 'Collection',
    description: 'Grouped data management.',
    icon: Layers,
  },
  {
    id: 'single-select',
    name: 'Single Select',
    description: 'Dropdown selection (single choice).',
    icon: ChevronDown,
  },
  {
    id: 'multi-select',
    name: 'Multi Select',
    description: 'Multiple choice selection.',
    icon: ToggleLeft,
  },
  {
    id: 'url',
    name: 'URL',
    description: 'Link management and validation.',
    icon: Link,
  },
  {
    id: 'reference',
    name: 'Reference',
    description: 'Cross-references to other entities.',
    icon: Database,
  },
  {
    id: 'json',
    name: 'JSON',
    description: 'Structured data format.',
    icon: Code,
  },
  {
    id: 'page-splitter',
    name: 'Page Splitter',
    description: 'Document section management.',
    icon: FileText,
  },
]

export function getFieldTypeConfig(type: FieldType): FieldTypeConfig {
  const config = FIELD_TYPES.find(ft => ft.id === type)
  if (!config) {
    throw new Error(`Unknown field type: ${type}`)
  }
  return config
}