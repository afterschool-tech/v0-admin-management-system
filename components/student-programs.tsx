"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, Layers, Trash2, ChevronRight } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

// Mock data - would be fetched from an API in a real implementation
const mockStudentPrograms = [
  {
    id: 1,
    studentId: 1,
    programId: 1,
    programName: "Web Development Fundamentals",
    registrationDate: "2025-01-15T10:30:00Z",
    startDate: "2025-02-01",
    endDate: "2025-04-30",
    moduleCount: 4,
    status: "active",
    progress: 65,
  },
  {
    id: 2,
    studentId: 1,
    programId: 3,
    programName: "Mobile App Development",
    registrationDate: "2025-03-10T14:45:00Z",
    startDate: "2025-04-01",
    endDate: "2025-06-30",
    moduleCount: 5,
    status: "upcoming",
    progress: 0,
  },
]

interface StudentProgramsProps {
  studentId: number
}

export function StudentPrograms({ studentId }: StudentProgramsProps) {
  const [programs, setPrograms] = useState(mockStudentPrograms.filter((program) => program.studentId === studentId))
  const [programToDelete, setProgramToDelete] = useState<number | null>(null)

  const handleDeleteProgram = () => {
    if (programToDelete !== null) {
      setPrograms(programs.filter((program) => program.id !== programToDelete))
      setProgramToDelete(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Enrolled Programs</h2>
        <Button asChild>
          <Link href={`/students/${studentId}/programs/register`}>
            <BookOpen className="mr-2 h-4 w-4" />
            Register for Program
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date Range</TableHead>
              <TableHead className="hidden md:table-cell">Modules</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Link href={`/programs/${program.programId}`} className="hover:underline">
                      {program.programName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      program.status === "active" ? "default" : program.status === "completed" ? "secondary" : "outline"
                    }
                  >
                    {program.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">
                      {new Date(program.startDate).toLocaleDateString()} -{" "}
                      {new Date(program.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{program.moduleCount}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: `${program.progress}%` }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 text-center">{program.progress}%</div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/students/${studentId}/programs/${program.programId}`}>
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">View</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setProgramToDelete(program.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {programs.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No programs enrolled. Register for a program to get started.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmDialog
        open={programToDelete !== null}
        onOpenChange={() => setProgramToDelete(null)}
        onConfirm={handleDeleteProgram}
        title="Unenroll from Program"
        description="Are you sure you want to unenroll this student from the program? This action cannot be undone and will remove all progress data."
      />
    </div>
  )
}
