"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserRound, Phone, Mail, Edit, Trash2 } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

// Mock data - would be fetched from an API in a real implementation
const mockParents = [
  {
    id: 1,
    fullName: "Robert Smith",
    email: "robert.smith@example.com",
    phoneNumber: "555-123-4567",
    studentCount: 2,
  },
  {
    id: 2,
    fullName: "Jennifer Smith",
    email: "jennifer.smith@example.com",
    phoneNumber: "555-987-6543",
    studentCount: 2,
  },
  {
    id: 3,
    fullName: "David Johnson",
    email: "david.johnson@example.com",
    phoneNumber: "555-111-2222",
    studentCount: 1,
  },
  {
    id: 4,
    fullName: "Maria Garcia",
    email: "maria.garcia@example.com",
    phoneNumber: "555-333-4444",
    studentCount: 3,
  },
  {
    id: 5,
    fullName: "James Wilson",
    email: "james.wilson@example.com",
    phoneNumber: "555-555-6666",
    studentCount: 1,
  },
  {
    id: 6,
    fullName: "Patricia Brown",
    email: "patricia.brown@example.com",
    phoneNumber: "555-777-8888",
    studentCount: 2,
  },
  {
    id: 7,
    fullName: "Michael Davis",
    email: "michael.davis@example.com",
    phoneNumber: "555-999-0000",
    studentCount: 1,
  },
]

export function ParentList() {
  const [parents, setParents] = useState(mockParents)
  const [parentToDelete, setParentToDelete] = useState<number | null>(null)

  const handleDeleteParent = () => {
    if (parentToDelete !== null) {
      setParents(parents.filter((parent) => parent.id !== parentToDelete))
      setParentToDelete(null)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead>Students</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parents.map((parent) => (
            <TableRow key={parent.id}>
              <TableCell className="font-medium">
                <Link href={`/parents/${parent.id}`} className="hover:underline">
                  {parent.fullName}
                </Link>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${parent.email}`} className="hover:underline">
                    {parent.email}
                  </a>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${parent.phoneNumber}`} className="hover:underline">
                    {parent.phoneNumber}
                  </a>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <UserRound className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{parent.studentCount}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/parents/${parent.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setParentToDelete(parent.id)}>
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
        open={parentToDelete !== null}
        onOpenChange={() => setParentToDelete(null)}
        onConfirm={handleDeleteParent}
        title="Delete Parent"
        description="Are you sure you want to delete this parent? This action cannot be undone and will remove all associations with students."
      />
    </div>
  )
}
