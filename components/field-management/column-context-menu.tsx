"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ArrowUp, ArrowDown, Pin, Eye, EyeOff, MoreHorizontal, Trash2, Settings } from 'lucide-react'

interface ColumnSettings {
  userInput: boolean
  aiCitations: boolean
  sortOrder?: 'asc' | 'desc'
  isPinned: boolean
  isHidden: boolean
}

interface ColumnContextMenuProps {
  settings: ColumnSettings
  onSettingsChange: (settings: ColumnSettings) => void
  onDelete: () => void
  onEdit: () => void
  trigger?: React.ReactNode
}

export function ColumnContextMenu({ 
  settings, 
  onSettingsChange, 
  onDelete, 
  onEdit,
  trigger 
}: ColumnContextMenuProps) {
  const [open, setOpen] = useState(false)

  const updateSetting = <K extends keyof ColumnSettings>(
    key: K,
    value: ColumnSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value
    })
  }

  const handleSortToggle = (order: 'asc' | 'desc') => {
    const newOrder = settings.sortOrder === order ? undefined : order
    updateSetting('sortOrder', newOrder)
  }

  const defaultTrigger = (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <MoreHorizontal className="h-3 w-3" />
    </Button>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger || defaultTrigger}
      </PopoverTrigger>
      <PopoverContent className="w-56 p-2" align="start">
        <div className="space-y-1">
          <div className="px-2 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wide">
            Column Actions
          </div>
          
          {/* Sort Options */}
          <button
            onClick={() => {
              handleSortToggle('asc')
              setOpen(false)
            }}
            className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-50 transition-colors ${
              settings.sortOrder === 'asc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <ArrowUp className="h-3 w-3" />
            Sort ascending
          </button>

          <button
            onClick={() => {
              handleSortToggle('desc')
              setOpen(false)
            }}
            className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-50 transition-colors ${
              settings.sortOrder === 'desc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <ArrowDown className="h-3 w-3" />
            Sort descending
          </button>

          <div className="h-px bg-gray-200 my-1" />

          {/* Pin Option */}
          <button
            onClick={() => {
              updateSetting('isPinned', !settings.isPinned)
              setOpen(false)
            }}
            className={`w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-50 transition-colors ${
              settings.isPinned ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            <Pin className="h-3 w-3" />
            {settings.isPinned ? 'Unpin' : 'Pin'}
          </button>

          {/* More Settings */}
          <button
            onClick={() => {
              onEdit()
              setOpen(false)
            }}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-50 transition-colors text-gray-700"
          >
            <Settings className="h-3 w-3" />
            More settings
          </button>

          {/* Hide/Show Option */}
          <button
            onClick={() => {
              updateSetting('isHidden', !settings.isHidden)
              setOpen(false)
            }}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-gray-50 transition-colors text-gray-700"
          >
            {settings.isHidden ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
            {settings.isHidden ? 'Show in view' : 'Hide from view'}
          </button>

          <div className="h-px bg-gray-200 my-1" />

          {/* Delete Option */}
          <button
            onClick={() => {
              onDelete()
              setOpen(false)
            }}
            className="w-full flex items-center gap-2 px-2 py-1.5 text-sm rounded hover:bg-red-50 transition-colors text-red-600"
          >
            <Trash2 className="h-3 w-3" />
            Delete Property
          </button>
        </div>
      </PopoverContent>
    </Popover>
  )
}