"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2, BookOpen, FileText } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data - would be fetched from an API in a real implementation
const mockModules = [
  {
    id: 1,
    name: "HTML Fundamentals",
    description: "Learn the basics of HTML including tags, attributes, and document structure",
    programId: 1,
    programName: "Web Development Fundamentals",
    startDate: "2025-06-01",
    endDate: "2025-06-30",
    itemCount: 5,
    status: "active",
  },
  {
    id: 2,
    name: "CSS Styling",
    description: "Master CSS styling techniques including selectors, properties, and responsive design",
    programId: 1,
    programName: "Web Development Fundamentals",
    startDate: "2025-07-01",
    endDate: "2025-07-31",
    itemCount: 4,
    status: "upcoming",
  },
  {
    id: 3,
    name: "JavaScript Basics",
    description: "Introduction to JavaScript programming including variables, functions, and DOM manipulation",
    programId: 1,
    programName: "Web Development Fundamentals",
    startDate: "2025-08-01",
    endDate: "2025-08-30",
    itemCount: 6,
    status: "upcoming",
  },
  {
    id: 4,
    name: "React Native Introduction",
    description: "Introduction to React Native framework and mobile app development concepts",
    programId: 2,
    programName: "Mobile App Development",
    startDate: "2025-07-15",
    endDate: "2025-08-15",
    itemCount: 5,
    status: "upcoming",
  },
  {
    id: 5,
    name: "Data Analysis with Python",
    description: "Learn to analyze data using Python libraries like Pandas and NumPy",
    programId: 3,
    programName: "Data Science for Beginners",
    startDate: "2025-09-01",
    endDate: "2025-09-30",
    itemCount: 4,
    status: "draft",
  },
]

// Create a global variable to store modules (simulating a database)
// In a real app, this would be managed by a state management solution like Context or Redux
let globalModules = [...mockModules]

export function ModuleList() {
  const [modules, setModules] = useState(globalModules)
  const [moduleToDelete, setModuleToDelete] = useState<number | null>(null)

  // Listen for changes to the global modules list
  // In a real app, this would be handled by a state management solution
  useState(() => {
    // This effect runs once on component mount
    // In a real app, we would subscribe to changes in our data store
    setModules(globalModules)
  })

  const handleDeleteModule = () => {
    if (moduleToDelete !== null) {
      const updatedModules = modules.filter((module) => module.id !== moduleToDelete)
      setModules(updatedModules)
      globalModules = updatedModules // Update the global variable
      setModuleToDelete(null)
    }
  }

  return (
    <div className="rounded-md border">
      {/* Desktop view - Table */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Date Range</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {modules.map((module) => (
              <TableRow key={module.id}>
                <TableCell className="font-medium">
                  <Link href={`/modules/${module.id}`} className="hover:underline">
                    {module.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{module.description}</p>
                </TableCell>
                <TableCell>
                  <Link href={`/programs/${module.programId}`} className="hover:underline flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="line-clamp-1">{module.programName}</span>
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      module.status === "active" ? "default" : module.status === "draft" ? "secondary" : "outline"
                    }
                  >
                    {module.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">
                      {new Date(module.startDate).toLocaleDateString()} -{" "}
                      {new Date(module.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{module.itemCount}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view - Cards */}
      <div className="space-y-4 md:hidden">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <Badge
                    variant={
                      module.status === "active" ? "default" : module.status === "draft" ? "secondary" : "outline"
                    }
                    className="mb-2"
                  >
                    {module.status}
                  </Badge>
                  <CardTitle className="text-lg">
                    <Link href={`/modules/${module.id}`} className="hover:underline">
                      {module.name}
                    </Link>
                  </CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <Link href={`/modules/${module.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setModuleToDelete(module.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2 space-y-2">
              <p className="text-sm text-muted-foreground">{module.description}</p>

              <div className="flex items-center text-sm">
                <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                <Link href={`/programs/${module.programId}`} className="hover:underline">
                  {module.programName}
                </Link>
              </div>

              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>
                  {new Date(module.startDate).toLocaleDateString()} - {new Date(module.endDate).toLocaleDateString()}
                </span>
              </div>

              <div className="flex items-center text-sm">
                <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{module.itemCount} Curriculum Items</span>
              </div>
            </CardContent>
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

// Export a function to add a new module (simulating an API)
export function addModule(module: any) {
  const newModule = {
    ...module,
    id: Math.max(...globalModules.map((m) => m.id)) + 1,
    itemCount: 0,
  }
  globalModules = [...globalModules, newModule]
  return newModule
}

// Export a function to update a module (simulating an API)
export function updateModule(module: any) {
  globalModules = globalModules.map((m) => (m.id === module.id ? { ...m, ...module } : m))
  return module
}
