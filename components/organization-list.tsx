"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserRound, Phone, Mail, Edit, Trash2 } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

// Mock data - would be fetched from an API in a real implementation
const mockOrganizations = [
  {
    id: 1,
    fullName: "Tech Academy",
    email: "info@techacademy.com",
    contactPerson: "John Davis",
    contactPhone: "555-123-4567",
    studentCount: 85,
  },
  {
    id: 2,
    fullName: "Code School",
    email: "contact@codeschool.com",
    contactPerson: "Sarah Wilson",
    contactPhone: "555-987-6543",
    studentCount: 62,
  },
  {
    id: 3,
    fullName: "STEM Center",
    email: "info@stemcenter.org",
    contactPerson: "Michael Johnson",
    contactPhone: "555-456-7890",
    studentCount: 74,
  },
  {
    id: 4,
    fullName: "Digital Learning Hub",
    email: "admin@digitallearninghub.com",
    contactPerson: "Emily Brown",
    contactPhone: "555-789-0123",
    studentCount: 48,
  },
  {
    id: 5,
    fullName: "Future Coders",
    email: "hello@futurecoders.edu",
    contactPerson: "David Martinez",
    contactPhone: "555-234-5678",
    studentCount: 56,
  },
]

export function OrganizationList() {
  const [organizations, setOrganizations] = useState(mockOrganizations)
  const [organizationToDelete, setOrganizationToDelete] = useState<number | null>(null)

  const handleDeleteOrganization = () => {
    if (organizationToDelete !== null) {
      setOrganizations(organizations.filter((org) => org.id !== organizationToDelete))
      setOrganizationToDelete(null)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="hidden md:table-cell">Contact Person</TableHead>
            <TableHead className="hidden lg:table-cell">Phone</TableHead>
            <TableHead>Students</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {organizations.map((org) => (
            <TableRow key={org.id}>
              <TableCell className="font-medium">
                <Link href={`/organizations/${org.id}`} className="hover:underline">
                  {org.fullName}
                </Link>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <a href={`mailto:${org.email}`} className="hover:underline">
                    {org.email}
                  </a>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{org.contactPerson}</TableCell>
              <TableCell className="hidden lg:table-cell">
                <div className="flex items-center">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${org.contactPhone}`} className="hover:underline">
                    {org.contactPhone}
                  </a>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <UserRound className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{org.studentCount}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/organizations/${org.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setOrganizationToDelete(org.id)}>
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
        open={organizationToDelete !== null}
        onOpenChange={() => setOrganizationToDelete(null)}
        onConfirm={handleDeleteOrganization}
        title="Delete Organization"
        description="Are you sure you want to delete this organization? This action cannot be undone and will affect all associated students."
      />
    </div>
  )
}
