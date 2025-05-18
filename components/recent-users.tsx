"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UserRound, Building, Users, Calendar, Edit } from "lucide-react"

// Mock data - would be fetched from an API in a real implementation
const mockUsers = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    accountType: "student",
    createdAt: "2025-04-15T10:30:00Z",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    accountType: "parent",
    createdAt: "2025-04-16T14:45:00Z",
  },
  {
    id: 3,
    name: "Tech Academy",
    email: "info@techacademy.com",
    accountType: "organization",
    createdAt: "2025-04-17T09:15:00Z",
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael.brown@example.com",
    accountType: "student",
    createdAt: "2025-04-18T11:20:00Z",
  },
  {
    id: 5,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    accountType: "parent",
    createdAt: "2025-04-19T16:30:00Z",
  },
]

export function RecentUsers() {
  const [users] = useState(mockUsers)

  const getAccountTypeIcon = (type: string) => {
    switch (type) {
      case "student":
        return <UserRound className="h-4 w-4" />
      case "parent":
        return <Users className="h-4 w-4" />
      case "organization":
        return <Building className="h-4 w-4" />
      default:
        return <UserRound className="h-4 w-4" />
    }
  }

  const getAccountTypeRoute = (type: string) => {
    switch (type) {
      case "student":
        return "/students"
      case "parent":
        return "/parents"
      case "organization":
        return "/organizations"
      default:
        return "/"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Recently added users across all account types</CardDescription>
          </div>
          <Link href="/users">
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
              <TableHead>Account Type</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.accountType === "student"
                        ? "default"
                        : user.accountType === "parent"
                          ? "secondary"
                          : "outline"
                    }
                    className="flex w-fit items-center gap-1"
                  >
                    {getAccountTypeIcon(user.accountType)}
                    <span className="capitalize">{user.accountType}</span>
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">{new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`${getAccountTypeRoute(user.accountType)}/${user.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
