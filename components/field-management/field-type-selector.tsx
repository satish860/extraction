"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { FIELD_TYPES, type FieldType } from './field-types'

interface FieldTypeSelectorProps {
  onSelect: (fieldType: FieldType) => void
  trigger?: React.ReactNode
}

export function FieldTypeSelector({ onSelect }: { onSelect: (fieldType: FieldType) => void }) {
  return (
    <div className="space-y-1 animate-in fade-in-0 slide-in-from-top-2 duration-200">
      <div className="px-2 py-1.5">
        <input
          type="text"
          placeholder="Search field types..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
        />
      </div>
      <div className="max-h-64 overflow-y-auto">
        {FIELD_TYPES.map((fieldType, index) => {
          const Icon = fieldType.icon
          return (
            <Tooltip key={fieldType.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onSelect(fieldType.id)}
                  className="w-full flex items-start gap-3 p-3 text-left rounded-lg hover:bg-gray-50 hover:shadow-sm active:bg-gray-100 transition-all duration-200 transform hover:scale-[1.01] group"
                  style={{ 
                    animationDelay: `${index * 20}ms`,
                    animation: `fadeInUp 0.3s ease-out forwards ${index * 20}ms`
                  }}
                >
                  <div className="flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110">
                    <Icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-gray-900 group-hover:text-gray-800 transition-colors">
                        {fieldType.name}
                      </span>
                      {fieldType.isNew && (
                        <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full font-medium animate-pulse">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 leading-tight group-hover:text-gray-600 transition-colors">
                      {fieldType.description}
                    </p>
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium text-white">{fieldType.name}</p>
                  <p className="text-xs text-gray-200">{fieldType.description}</p>
                  {fieldType.isNew && (
                    <p className="text-xs text-blue-200 font-medium">✨ Recently added</p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </div>
  )
}