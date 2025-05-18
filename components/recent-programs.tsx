"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

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
]

export function RecentPrograms() {
  const [programs, setPrograms] = useState(mockPrograms)
  const [programToDelete, setProgramToDelete] = useState<number | null>(null)

  const handleDeleteProgram = () => {
    if (programToDelete !== null) {
      setPrograms(programs.filter((program) => program.id !== programToDelete))
      setProgramToDelete(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Programs</CardTitle>
            <CardDescription>Manage your educational programs</CardDescription>
          </div>
          <Link href="/programs">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead>Modules</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">
                  <Link href={`/programs/${program.id}`} className="hover:underline">
                    {program.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-1">{program.description}</p>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      program.status === "active" ? "default" : program.status === "draft" ? "secondary" : "outline"
                    }
                  >
                    {program.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">
                      {new Date(program.startDate).toLocaleDateString()} -{" "}
                      {new Date(program.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{program.moduleCount}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/programs/${program.id}/edit`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={() => setProgramToDelete(program.id)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <DeleteConfirmDialog
          open={programToDelete !== null}
          onOpenChange={() => setProgramToDelete(null)}
          onConfirm={handleDeleteProgram}
          title="Delete Program"
          description="Are you sure you want to delete this program? This action cannot be undone and will also delete all associated modules and curriculum items."
        />
      </CardContent>
    </Card>
  )
}
