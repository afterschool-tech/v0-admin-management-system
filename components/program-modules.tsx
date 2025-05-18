"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Edit, Trash2, PlusCircle, ChevronRight } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

// Mock data - would be fetched from an API in a real implementation
const mockModules = [
  {
    id: 1,
    programId: 1,
    name: "HTML Fundamentals",
    description: "Learn the basics of HTML including tags, attributes, and document structure",
    itemCount: 5,
  },
  {
    id: 2,
    programId: 1,
    name: "CSS Styling",
    description: "Master CSS styling techniques including selectors, properties, and responsive design",
    itemCount: 4,
  },
  {
    id: 3,
    programId: 1,
    name: "JavaScript Basics",
    description: "Introduction to JavaScript programming including variables, functions, and DOM manipulation",
    itemCount: 6,
  },
  {
    id: 4,
    programId: 1,
    name: "Web Projects",
    description: "Apply your skills by building complete web projects from scratch",
    itemCount: 3,
  },
]

interface ProgramModulesProps {
  programId: number
}

export function ProgramModules({ programId }: ProgramModulesProps) {
  const [modules, setModules] = useState(mockModules.filter((module) => module.programId === programId))
  const [moduleToDelete, setModuleToDelete] = useState<number | null>(null)

  const handleDeleteModule = () => {
    if (moduleToDelete !== null) {
      setModules(modules.filter((module) => module.id !== moduleToDelete))
      setModuleToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Program Modules</h2>
        <Button asChild>
          <Link href={`/modules/new?programId=${programId}`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Module
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">{module.name}</CardTitle>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/modules/${module.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setModuleToDelete(module.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              <CardDescription className="line-clamp-2">{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <FileText className="mr-2 h-4 w-4" />
                <span>{module.itemCount} Curriculum Items</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/modules/${module.id}`}>
                  View Module
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/modules/${module.id}/curriculum/new`}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Item
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <DeleteConfirmDialog
        open={moduleToDelete !== null}
        onOpenChange={() => setModuleToDelete(null)}
        onConfirm={handleDeleteModule}
        title="Delete Module"
        description="Are you sure you want to delete this module? This action cannot be undone and will also delete all associated curriculum items."
      />
    </div>
  )
}
