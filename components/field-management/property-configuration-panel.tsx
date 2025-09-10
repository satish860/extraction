"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getFieldTypeConfig, type FieldType } from './field-types'
import { ArrowUp, ArrowDown, Pin, Eye, EyeOff, MoreHorizontal, Trash2 } from 'lucide-react'

interface ColumnSettings {
  userInput: boolean
  aiCitations: boolean
  sortOrder?: 'asc' | 'desc'
  isPinned: boolean
  isHidden: boolean
}

interface PropertyConfigurationPanelProps {
  fieldType: FieldType
  columnName: string
  settings: ColumnSettings
  onNameChange: (name: string) => void
  onSettingsChange: (settings: ColumnSettings) => void
  onSave: () => void
  onCancel: () => void
  onDelete?: () => void
  isNewColumn?: boolean
}

export function PropertyConfigurationPanel({
  fieldType,
  columnName,
  settings,
  onNameChange,
  onSettingsChange,
  onSave,
  onCancel,
  onDelete,
  isNewColumn = false
}: PropertyConfigurationPanelProps) {
  const [showMoreSettings, setShowMoreSettings] = useState(false)
  const fieldConfig = getFieldTypeConfig(fieldType)
  const Icon = fieldConfig.icon

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

  return (
    <div className="space-y-4 w-80 animate-slideInFromTop">
      <h4 className="font-medium text-sm text-gray-800 flex items-center gap-2">
        {isNewColumn ? (
          <>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            Configure New Column
          </>
        ) : (
          <>
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            Edit Column
          </>
        )}
      </h4>

      {/* Field Type Display */}
      <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="p-1.5 bg-white rounded-md shadow-sm">
          <Icon className="h-4 w-4 text-gray-600" />
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium text-gray-900">{fieldConfig.name}</span>
          {fieldConfig.isNew && (
            <span className="ml-2 px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full font-medium animate-pulse">
              New
            </span>
          )}
        </div>
      </div>

      {/* Column Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
          Column Name
          <span className="text-xs text-gray-400">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            value={columnName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter column name..."
            className="w-full px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onSave()
              }
            }}
            autoFocus={isNewColumn}
          />
          {columnName && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* Tool Settings */}
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-4 bg-blue-500 rounded-full" />
          <span className="text-sm font-medium text-gray-800">Tool Settings</span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">User input</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Manual entry</span>
          </div>
          <button
            onClick={() => updateSetting('userInput', !settings.userInput)}
            className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
              settings.userInput ? 'bg-blue-600 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 top-0.5 ${
                settings.userInput ? 'translate-x-5 shadow-lg' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">AI citations</span>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Auto sources</span>
          </div>
          <button
            onClick={() => updateSetting('aiCitations', !settings.aiCitations)}
            className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
              settings.aiCitations ? 'bg-blue-600 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
            }`}
          >
            <div
              className={`absolute w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 top-0.5 ${
                settings.aiCitations ? 'translate-x-5 shadow-lg' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>
      </div>

      <Separator />

      {/* Quick Actions */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-purple-500 rounded-full" />
          <span className="text-sm font-medium text-gray-800">Quick Actions</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handleSortToggle('asc')}
            className={`group flex items-center gap-2 px-3 py-3 text-sm rounded-lg border-2 transition-all duration-200 hover:shadow-md transform hover:scale-105 ${
              settings.sortOrder === 'asc'
                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-lg scale-105'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <ArrowUp className={`h-3 w-3 transition-transform duration-200 ${
              settings.sortOrder === 'asc' ? 'text-blue-600' : 'group-hover:scale-110'
            }`} />
            <span className="font-medium">Sort up</span>
          </button>
          
          <button
            onClick={() => handleSortToggle('desc')}
            className={`group flex items-center gap-2 px-3 py-3 text-sm rounded-lg border-2 transition-all duration-200 hover:shadow-md transform hover:scale-105 ${
              settings.sortOrder === 'desc'
                ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-lg scale-105'
                : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
            }`}
          >
            <ArrowDown className={`h-3 w-3 transition-transform duration-200 ${
              settings.sortOrder === 'desc' ? 'text-blue-600' : 'group-hover:scale-110'
            }`} />
            <span className="font-medium">Sort down</span>
          </button>
        </div>

        <button
          onClick={() => updateSetting('isPinned', !settings.isPinned)}
          className={`group flex items-center gap-2 px-3 py-3 text-sm rounded-lg border-2 transition-all duration-200 hover:shadow-md transform hover:scale-105 w-full ${
            settings.isPinned
              ? 'bg-blue-50 border-blue-300 text-blue-700 shadow-lg scale-105'
              : 'border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
          }`}
        >
          <Pin className={`h-3 w-3 transition-transform duration-200 ${
            settings.isPinned ? 'text-blue-600' : 'group-hover:scale-110'
          }`} />
          <span className="font-medium">{settings.isPinned ? 'Unpin column' : 'Pin column'}</span>
        </button>
      </div>

      {/* More Settings */}
      <button
        onClick={() => setShowMoreSettings(!showMoreSettings)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors w-full"
      >
        <MoreHorizontal className="h-3 w-3" />
        More settings
      </button>

      {showMoreSettings && (
        <div className="space-y-2 pt-2 border-t border-gray-200">
          <button
            onClick={() => updateSetting('isHidden', !settings.isHidden)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors w-full"
          >
            {settings.isHidden ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {settings.isHidden ? 'Show in view' : 'Hide from view'}
          </button>

          {onDelete && !isNewColumn && (
            <button
              onClick={onDelete}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded border border-red-200 text-red-600 hover:bg-red-50 transition-colors w-full"
            >
              <Trash2 className="h-3 w-3" />
              Delete Property
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4 border-t border-gray-200">
        <Button 
          onClick={onSave} 
          size="sm" 
          className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          <span className="flex items-center gap-2">
            {isNewColumn ? (
              <>
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                Add Column
              </>
            ) : (
              <>
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                Save Changes
              </>
            )}
          </span>
        </Button>
        <Button 
          onClick={onCancel} 
          variant="outline" 
          size="sm" 
          className="flex-1 h-10 border-2 border-gray-300 text-gray-700 font-medium rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}