"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Trash2, Building, BookOpen, Award, Mail } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data - would be fetched from an API in a real implementation
const mockStudents = [
  {
    id: 1,
    fullName: "John Smith",
    email: "john.smith@example.com",
    birthDate: "2010-05-15",
    level: 3,
    organizationId: 1,
    organizationName: "Tech Academy",
    programCount: 2,
    achievementCount: 5,
  },
  {
    id: 2,
    fullName: "Emma Johnson",
    email: "emma.johnson@example.com",
    birthDate: "2009-08-22",
    level: 4,
    organizationId: 1,
    organizationName: "Tech Academy",
    programCount: 3,
    achievementCount: 8,
  },
  {
    id: 3,
    fullName: "Michael Brown",
    email: "michael.brown@example.com",
    birthDate: "2011-03-10",
    level: 2,
    organizationId: 2,
    organizationName: "Code School",
    programCount: 1,
    achievementCount: 3,
  },
  {
    id: 4,
    fullName: "Sophia Davis",
    email: "sophia.davis@example.com",
    birthDate: "2010-11-28",
    level: 3,
    organizationId: 3,
    organizationName: "STEM Center",
    programCount: 2,
    achievementCount: 6,
  },
  {
    id: 5,
    fullName: "William Wilson",
    email: "william.wilson@example.com",
    birthDate: "2009-07-14",
    level: 5,
    organizationId: 2,
    organizationName: "Code School",
    programCount: 4,
    achievementCount: 12,
  },
  {
    id: 6,
    fullName: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    birthDate: "2011-09-03",
    level: 2,
    organizationId: 1,
    organizationName: "Tech Academy",
    programCount: 1,
    achievementCount: 4,
  },
  {
    id: 7,
    fullName: "James Taylor",
    email: "james.taylor@example.com",
    birthDate: "2010-02-19",
    level: 3,
    organizationId: 3,
    organizationName: "STEM Center",
    programCount: 2,
    achievementCount: 7,
  },
]

export function StudentList() {
  const [students, setStudents] = useState(mockStudents)
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null)

  const handleDeleteStudent = () => {
    if (studentToDelete !== null) {
      setStudents(students.filter((student) => student.id !== studentToDelete))
      setStudentToDelete(null)
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
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Birth Date</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Organization</TableHead>
              <TableHead className="hidden lg:table-cell">Programs</TableHead>
              <TableHead className="hidden lg:table-cell">Achievements</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">
                  <Link href={`/students/${student.id}`} className="hover:underline">
                    {student.fullName}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{new Date(student.birthDate).toLocaleDateString()}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Level {student.level}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Link href={`/organizations/${student.organizationId}`} className="hover:underline">
                      {student.organizationName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{student.programCount}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center">
                    <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{student.achievementCount}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/students/${student.id}/edit`}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Link>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => setStudentToDelete(student.id)}>
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
        {students.map((student) => (
          <Card key={student.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">
                    <Link href={`/students/${student.id}`} className="hover:underline">
                      {student.fullName}
                    </Link>
                  </CardTitle>
                  <Badge variant="outline" className="mt-1">
                    Level {student.level}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                    <Link href={`/students/${student.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setStudentToDelete(student.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2 space-y-2">
              <div className="flex items-center text-sm">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="truncate">{student.email}</span>
              </div>

              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{new Date(student.birthDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center text-sm">
                <Building className="mr-2 h-4 w-4 text-muted-foreground" />
                <Link href={`/organizations/${student.organizationId}`} className="hover:underline">
                  {student.organizationName}
                </Link>
              </div>

              <div className="flex justify-between text-sm">
                <div className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{student.programCount} Programs</span>
                </div>
                <div className="flex items-center">
                  <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{student.achievementCount} Achievements</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteConfirmDialog
        open={studentToDelete !== null}
        onOpenChange={() => setStudentToDelete(null)}
        onConfirm={handleDeleteStudent}
        title="Delete Student"
        description="Are you sure you want to delete this student? This action cannot be undone and will remove all associated data."
      />
    </div>
  )
}
