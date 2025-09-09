"use client"

import { TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table"
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
})

type Configuration = z.infer<typeof configurationSchema>

export default function Home() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const data: Configuration[] = useMemo(
    () => [
      { id: "1", file: "Waiting for configuration...", ai: "Waiting for configuration..." },
      { id: "2", file: "Waiting for configuration...", ai: "Waiting for configuration..." },
      { id: "3", file: "Waiting for configuration...", ai: "Waiting for configuration..." },
    ],
    []
  )

  const columns: ColumnDef<Configuration>[] = useMemo(
    () => [
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
            <span className="text-sm">📄</span>
            <span className="text-sm font-medium">File</span>
          </div>
        ),
        cell: ({ getValue }) => (
          <div className="text-muted-foreground">
            {getValue() as string}
          </div>
        ),
      },
      {
        accessorKey: "ai",
        header: () => (
          <div className="flex items-center gap-1">
            <span className="text-sm">🤖</span>
            <span className="text-sm font-medium">AI</span>
          </div>
        ),
        cell: ({ getValue }) => (
          <div className="text-muted-foreground">
            {getValue() as string}
          </div>
        ),
      },
    ],
    []
  )

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
    <div className="space-y-4">
      <TabsContent value="build">
        <div className="space-y-4">
          <div className="flex items-center justify-end gap-2 mb-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <span className="text-base">+</span>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <span className="text-base">⋯</span>
            </Button>
          </div>
          <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <Table className="border-collapse">
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id} className="border-b border-gray-200 bg-gray-50">
                    {headerGroup.headers.map((header) => (
                      <TableHead 
                        key={header.id} 
                        className={`
                          ${header.id === "select" ? "w-12" : ""} 
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
