"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, BookOpen, Layers, ChevronRight } from "lucide-react"

// Mock data - would be fetched from an API in a real implementation
const mockOrganizationPrograms = [
  {
    id: 1,
    name: "Web Development Fundamentals",
    description: "Learn the basics of web development with HTML, CSS, and JavaScript",
    startDate: "2025-06-01",
    endDate: "2025-08-30",
    moduleCount: 4,
    status: "active",
    studentCount: 28,
  },
  {
    id: 3,
    name: "Mobile App Development",
    description: "Create mobile applications using React Native",
    startDate: "2025-07-15",
    endDate: "2025-10-15",
    moduleCount: 5,
    status: "upcoming",
    studentCount: 15,
  },
  {
    id: 5,
    name: "Data Science for Beginners",
    description: "Introduction to data analysis and visualization",
    startDate: "2025-09-01",
    endDate: "2025-12-15",
    moduleCount: 6,
    status: "draft",
    studentCount: 0,
  },
]

interface OrganizationProgramsProps {
  organizationId: number
}

export function OrganizationPrograms({ organizationId }: OrganizationProgramsProps) {
  const [programs] = useState(mockOrganizationPrograms)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Programs</h2>
        <Button asChild>
          <Link href="/programs/new">
            <BookOpen className="mr-2 h-4 w-4" />
            Create Program
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
              <TableHead>Students</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Link href={`/programs/${program.id}`} className="hover:underline">
                      {program.name}
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{program.description}</p>
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
                <TableCell>{program.studentCount}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/programs/${program.id}`}>
                      <ChevronRight className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {programs.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No programs available for this organization.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
