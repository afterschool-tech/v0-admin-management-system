"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, Building, Trash2 } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

// Mock data - would be fetched from an API in a real implementation
const mockParentStudents = [
  {
    studentId: 1,
    parentId: 1,
    fullName: "John Smith",
    email: "john.smith@example.com",
    birthDate: "2010-05-15",
    level: 3,
    organizationId: 1,
    organizationName: "Tech Academy",
  },
  {
    studentId: 8,
    parentId: 1,
    fullName: "Sarah Smith",
    email: "sarah.smith@example.com",
    birthDate: "2012-08-10",
    level: 2,
    organizationId: 1,
    organizationName: "Tech Academy",
  },
]

interface ParentStudentsProps {
  parentId: number
}

export function ParentStudents({ parentId }: ParentStudentsProps) {
  const [students, setStudents] = useState(mockParentStudents.filter((student) => student.parentId === parentId))
  const [studentToRemove, setStudentToRemove] = useState<number | null>(null)

  const handleRemoveStudent = () => {
    if (studentToRemove !== null) {
      setStudents(students.filter((student) => student.studentId !== studentToRemove))
      setStudentToRemove(null)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Birth Date</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.studentId}>
              <TableCell className="font-medium">
                <Link href={`/students/${student.studentId}`} className="hover:underline">
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
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/students/${student.studentId}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setStudentToRemove(student.studentId)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {students.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No students associated with this parent.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DeleteConfirmDialog
        open={studentToRemove !== null}
        onOpenChange={() => setStudentToRemove(null)}
        onConfirm={handleRemoveStudent}
        title="Remove Student"
        description="Are you sure you want to remove this student from the parent? This will not delete the student account."
      />
    </div>
  )
}
