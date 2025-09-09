"use client"

import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useMemo, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table"
import { z } from "zod"

const configurationSchema = z.object({
  id: z.string(),
  file: z.string(),
  ai: z.string(),
  dynamicColumns: z.record(z.string(), z.string()).optional(),
})

type Configuration = z.infer<typeof configurationSchema>

type DynamicColumn = {
  id: string
  name: string
  type: 'text' | 'number' | 'date'
}

export default function Home() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [dynamicColumns, setDynamicColumns] = useState<DynamicColumn[]>([])
  const [isAddColumnOpen, setIsAddColumnOpen] = useState(false)
  const [newColumnName, setNewColumnName] = useState("")

  const data: Configuration[] = useMemo(() => {
    const baseData = [
      { id: "1", file: "Waiting for configuration...", ai: "Waiting for configuration..." },
      { id: "2", file: "Waiting for configuration...", ai: "Waiting for configuration..." },
      { id: "3", file: "Waiting for configuration...", ai: "Waiting for configuration..." },
    ]
    
    // Add dynamic column data
    return baseData.map(row => ({
      ...row,
      dynamicColumns: dynamicColumns.reduce((acc, col) => ({
        ...acc,
        [col.id]: "Waiting for configuration..."
      }), {} as Record<string, string>)
    }))
  }, [dynamicColumns])

  const addColumn = () => {
    if (newColumnName.trim()) {
      const newColumn: DynamicColumn = {
        id: `col_${Date.now()}`,
        name: newColumnName.trim(),
        type: 'text'
      }
      setDynamicColumns(prev => [...prev, newColumn])
      setNewColumnName("")
      setIsAddColumnOpen(false)
    }
  }

  const columns: ColumnDef<Configuration>[] = useMemo(() => {
    const baseColumns: ColumnDef<Configuration>[] = [
      {
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={table.getIsAllPageRowsSelected()}
              onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              onChange={(e) => row.toggleSelected(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "file",
        header: () => (
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">File</span>
          </div>
        ),
        cell: ({ getValue }) => (
          <div className="text-gray-500 text-sm font-medium">
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "ai",
        header: () => (
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold">AI</span>
          </div>
        ),
        cell: ({ getValue }) => (
          <div className="text-gray-500 text-sm font-medium">
            {getValue() as string}
          </div>
        ),
      },
    ]

    // Add dynamic columns
    const dynamicColumnDefs: ColumnDef<Configuration>[] = dynamicColumns.map(col => ({
      id: col.id,
      header: () => (
        <div className="flex items-center gap-1">
          <span className="text-sm font-semibold">{col.name}</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-gray-500 text-sm font-medium">
          {row.original.dynamicColumns?.[col.id] || "Waiting for configuration..."}
        </div>
      ),
    }))

    // Add column button
    const addColumnDef: ColumnDef<Configuration> = {
      id: "add-column",
      header: () => (
        <PopoverTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 border-dashed border-2 border-gray-300 hover:border-gray-400 rounded"
          >
            <span className="text-base text-gray-500">+</span>
          </Button>
        </PopoverTrigger>
      ),
      cell: () => <div className="w-12"></div>,
      enableSorting: false,
      enableHiding: false,
    }

    return [...baseColumns, ...dynamicColumnDefs, addColumnDef]
  }, [dynamicColumns])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  })

  return (
    <div>
      <TabsContent value="build">
        <div>
          {/* Table wrapped in Popover */}
          <Popover open={isAddColumnOpen} onOpenChange={setIsAddColumnOpen}>
            <div className="bg-white">
            <Table className="border-collapse">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b border-gray-200 bg-gray-50">
                    {headerGroup.headers.map((header) => (
                      <TableHead 
                        key={header.id} 
                        className={`
                          ${header.id === "select" ? "w-12" : ""} 
                          ${header.id === "add-column" ? "w-16" : ""} 
                          border-r border-gray-200 last:border-r-0 
                          bg-gray-50 font-semibold text-gray-700 
                          px-4 py-3 text-left text-sm
                          hover:bg-gray-100 transition-colors
                        `}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="border-b border-gray-200 hover:bg-blue-50/50 transition-colors data-[state=selected]:bg-blue-50"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell 
                          key={cell.id}
                          className="border-r border-gray-200 last:border-r-0 px-4 py-3 text-sm focus-within:bg-blue-50 transition-colors"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell 
                      colSpan={columns.length} 
                      className="h-24 text-center border-r border-gray-200 text-muted-foreground"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            </div>
            
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Add Column</h4>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Column Name</label>
                  <input
                    type="text"
                    value={newColumnName}
                    onChange={(e) => setNewColumnName(e.target.value)}
                    placeholder="Enter column name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addColumn()
                      }
                    }}
                    autoFocus
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addColumn} size="sm" className="flex-1">
                    Add Column
                  </Button>
                  <Button 
                    onClick={() => {
                      setIsAddColumnOpen(false)
                      setNewColumnName("")
                    }} 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </TabsContent>
      <TabsContent value="review">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Review</h1>
          <p>Review content goes here</p>
        </div>
      </TabsContent>
      <TabsContent value="automate">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Automate</h1>
          <p>Automate content goes here</p>
        </div>
      </TabsContent>
    </div>
  )
}
