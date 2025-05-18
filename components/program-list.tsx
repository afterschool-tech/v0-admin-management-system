"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, Trash2, Layers, ChevronRight } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { useRouter } from "next/navigation"

// Mock data - would be fetched from an API in a real implementation
const mockPrograms = [
  {
    id: 1,
    name: "Web Development Fundamentals",
    description: "Learn the basics of web development with HTML, CSS, and JavaScript",
    startDate: "2025-06-01",
    endDate: "2025-08-30",
    moduleCount: 4,
    status: "active",
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Create mobile applications using React Native",
    startDate: "2025-07-15",
    endDate: "2025-10-15",
    moduleCount: 5,
    status: "draft",
  },
  {
    id: 3,
    name: "Data Science for Beginners",
    description: "Introduction to data analysis and visualization",
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    moduleCount: 6,
    status: "active",
  },
  {
    id: 4,
    name: "Game Development with Unity",
    description: "Learn to create 2D and 3D games with Unity",
    startDate: "2025-08-10",
    endDate: "2025-11-30",
    moduleCount: 8,
    status: "upcoming",
  },
  {
    id: 5,
    name: "Cybersecurity Essentials",
    description: "Learn the fundamentals of cybersecurity and network protection",
    startDate: "2025-10-01",
    endDate: "2026-01-15",
    moduleCount: 7,
    status: "draft",
  },
  {
    id: 6,
    name: "Artificial Intelligence Basics",
    description: "Introduction to AI concepts and machine learning",
    startDate: "2025-11-15",
    endDate: "2026-02-28",
    moduleCount: 5,
    status: "upcoming",
  },
]

// Create a global variable to store programs (simulating a database)
// In a real app, this would be managed by a state management solution like Context or Redux
let globalPrograms = [...mockPrograms]

export function ProgramList() {
  const router = useRouter()
  const [programs, setPrograms] = useState(globalPrograms)
  const [programToDelete, setProgramToDelete] = useState<number | null>(null)

  // Listen for changes to the global programs list
  // In a real app, this would be handled by a state management solution
  useState(() => {
    // This effect runs once on component mount
    // In a real app, we would subscribe to changes in our data store
    setPrograms(globalPrograms)
  })

  const handleDeleteProgram = () => {
    if (programToDelete !== null) {
      const updatedPrograms = programs.filter((program) => program.id !== programToDelete)
      setPrograms(updatedPrograms)
      globalPrograms = updatedPrograms // Update the global variable
      setProgramToDelete(null)
    }
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {programs.map((program) => (
        <Card key={program.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <Badge
                variant={
                  program.status === "active"
                    ? "default"
                    : program.status === "draft"
                      ? "secondary"
                      : program.status === "upcoming"
                        ? "outline"
                        : "destructive"
                }
              >
                {program.status}
              </Badge>
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                  <Link href={`/programs/${program.id}/edit`}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setProgramToDelete(program.id)}>
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
            <CardTitle className="text-xl mt-2">{program.name}</CardTitle>
            <CardDescription className="line-clamp-2">{program.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Calendar className="mr-2 h-4 w-4" />
              <span>
                {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Layers className="mr-2 h-4 w-4" />
              <span>{program.moduleCount} Modules</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href={`/programs/${program.id}`}>
                View Program
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}

      <DeleteConfirmDialog
        open={programToDelete !== null}
        onOpenChange={() => setProgramToDelete(null)}
        onConfirm={handleDeleteProgram}
        title="Delete Program"
        description="Are you sure you want to delete this program? This action cannot be undone and will also delete all associated modules and curriculum items."
      />
    </div>
  )
}

// Export a function to add a new program (simulating an API)
export function addProgram(program: any) {
  const newProgram = {
    ...program,
    id: Math.max(...globalPrograms.map((p) => p.id)) + 1,
    moduleCount: 0,
  }
  globalPrograms = [...globalPrograms, newProgram]
  return newProgram
}

// Export a function to update a program (simulating an API)
export function updateProgram(program: any) {
  globalPrograms = globalPrograms.map((p) => (p.id === program.id ? { ...p, ...program } : p))
  return program
}
