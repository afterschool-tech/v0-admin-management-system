"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, Phone, Mail, Trash2, PlusCircle } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ParentSelector } from "@/components/parent-selector"

// Mock data - would be fetched from an API in a real implementation
const mockStudentParents = [
  {
    studentId: 1,
    parentId: 1,
    parentName: "Robert Smith",
    email: "robert.smith@example.com",
    phoneNumber: "555-123-4567",
  },
  {
    studentId: 1,
    parentId: 2,
    parentName: "Jennifer Smith",
    email: "jennifer.smith@example.com",
    phoneNumber: "555-987-6543",
  },
]

interface StudentParentsProps {
  studentId: number
}

export function StudentParents({ studentId }: StudentParentsProps) {
  const [parents, setParents] = useState(mockStudentParents.filter((parent) => parent.studentId === studentId))
  const [parentToDelete, setParentToDelete] = useState<number | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleDeleteParent = () => {
    if (parentToDelete !== null) {
      setParents(parents.filter((parent) => parent.parentId !== parentToDelete))
      setParentToDelete(null)
    }
  }

  const handleAddParent = (selectedParents: any[]) => {
    // In a real implementation, you would send this to your API
    console.log("Adding parents:", selectedParents)

    // For demo purposes, we'll just add them to our local state
    const newParents = selectedParents.map((parent) => ({
      studentId,
      parentId: parent.id,
      parentName: parent.fullName,
      email: parent.email,
      phoneNumber: parent.phoneNumber,
    }))

    setParents([...parents, ...newParents])
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Parents</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Parent
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Parent</DialogTitle>
              <DialogDescription>Select a parent to associate with this student.</DialogDescription>
            </DialogHeader>
            <ParentSelector onAdd={handleAddParent} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parents.map((parent) => (
              <TableRow key={parent.parentId}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Link href={`/parents/${parent.parentId}`} className="hover:underline">
                      {parent.parentName}
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${parent.email}`} className="hover:underline">
                      {parent.email}
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${parent.phoneNumber}`} className="hover:underline">
                      {parent.phoneNumber}
                    </a>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => setParentToDelete(parent.parentId)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {parents.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No parents associated with this student.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmDialog
        open={parentToDelete !== null}
        onOpenChange={() => setParentToDelete(null)}
        onConfirm={handleDeleteParent}
        title="Remove Parent"
        description="Are you sure you want to remove this parent from the student? This will not delete the parent account."
      />
    </div>
  )
}
