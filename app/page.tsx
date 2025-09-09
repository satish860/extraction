"use client"

import { useState } from "react"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, File, Bot } from "lucide-react"

type DataRow = {
  id: string
  file: string
  ai: string
}

const data: DataRow[] = [
  {
    id: "1",
    file: "File",
    ai: "Waiting for configuration...",
  },
  {
    id: "2", 
    file: "File",
    ai: "Waiting for configuration...",
  },
  {
    id: "3",
    file: "File", 
    ai: "Waiting for configuration...",
  },
]

const columns: ColumnDef<DataRow>[] = [
  {
    accessorKey: "file",
    header: () => (
      <div className="flex items-center gap-2">
        <File className="h-4 w-4" />
        File
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-muted-foreground">
        <File className="h-4 w-4" />
        {row.getValue("file")}
      </div>
    ),
  },
  {
    accessorKey: "ai",
    header: () => (
      <div className="flex items-center gap-2">
        <Bot className="h-4 w-4" />
        AI
      </div>
    ),
    cell: ({ row }) => (
      <div className="text-muted-foreground">
        {row.getValue("ai")}
      </div>
    ),
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState("main")

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-4">
          <TabsContent value="main" className="flex-1 mt-0">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="font-medium">
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
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="newview" className="flex-1 mt-0">
            <div className="rounded-md border h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Plus className="h-8 w-8 mx-auto mb-2 opacity-50" />
                New view content would go here
              </div>
            </div>
          </TabsContent>
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-muted-foreground">
              <Plus className="h-4 w-4 mr-2" />
              New entity
            </Button>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                Sort and Filter
              </Button>
              <TabsList className="grid w-auto grid-cols-2">
                <TabsTrigger value="main">Main</TabsTrigger>
                <TabsTrigger value="newview">New view</TabsTrigger>
              </TabsList>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  )
}