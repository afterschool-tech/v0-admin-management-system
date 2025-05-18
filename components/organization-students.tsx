"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Edit, BookOpen, Award } from "lucide-react"
import { PlusCircle } from "lucide-react"

// Mock data - would be fetched from an API in a real implementation
const mockOrganizationStudents = [
  {
    id: 1,
    fullName: "John Smith",
    email: "john.smith@example.com",
    birthDate: "2010-05-15",
    level: 3,
    organizationId: 1,
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
    programCount: 3,
    achievementCount: 8,
  },
  {
    id: 6,
    fullName: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    birthDate: "2011-09-03",
    level: 2,
    organizationId: 1,
    programCount: 1,
    achievementCount: 4,
  },
]

interface OrganizationStudentsProps {
  organizationId: number
}

export function OrganizationStudents({ organizationId }: OrganizationStudentsProps) {
  const [students] = useState(mockOrganizationStudents.filter((student) => student.organizationId === organizationId))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Students</h2>
        <Button asChild>
          <Link href={`/students/new?organizationId=${organizationId}`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Student
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Birth Date</TableHead>
              <TableHead>Level</TableHead>
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
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/students/${student.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {students.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No students in this organization yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
