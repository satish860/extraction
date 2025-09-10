"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { FIELD_TYPES, type FieldType } from './field-types'

interface FieldTypeSelectorProps {
  onSelect: (fieldType: FieldType) => void
  trigger?: React.ReactNode
}

export function FieldTypeSelector({ onSelect, trigger }: FieldTypeSelectorProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (fieldType: FieldType) => {
    onSelect(fieldType)
    setOpen(false)
  }

  const defaultTrigger = (
    <Button 
      variant="ghost" 
      size="icon" 
      className="h-8 w-8 border-dashed border-2 border-gray-300 hover:border-gray-400 rounded"
    >
      <span className="text-base text-gray-500">+</span>
    </Button>
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {trigger || defaultTrigger}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="start">
        <div className="space-y-1">
          <div className="px-2 py-1.5">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="max-h-64 overflow-y-auto">
            {FIELD_TYPES.map((fieldType) => {
              const Icon = fieldType.icon
              return (
                <button
                  key={fieldType.id}
                  onClick={() => handleSelect(fieldType.id)}
                  className="w-full flex items-start gap-3 p-3 text-left rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-900">
                        {fieldType.name}
                      </span>
                      {fieldType.isNew && (
                        <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded font-medium">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight">
                      {fieldType.description}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}