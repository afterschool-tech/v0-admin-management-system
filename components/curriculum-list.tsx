"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Edit, Trash2, Layers, Eye, User, Users } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

// Mock data - would be fetched from an API in a real implementation
const mockCurriculumItems = [
  {
    id: 1,
    moduleId: 1,
    moduleName: "HTML Fundamentals",
    title: "Introduction to HTML",
    description: "Learn about the history and purpose of HTML in web development",
    itemType: "lesson",
    position: 1,
    deliveryMode: "solo",
  },
  {
    id: 2,
    moduleId: 1,
    moduleName: "HTML Fundamentals",
    title: "HTML Tags and Elements",
    description: "Explore the most common HTML tags and how to use them properly",
    itemType: "lesson",
    position: 2,
    deliveryMode: "solo",
  },
  {
    id: 3,
    moduleId: 1,
    moduleName: "HTML Fundamentals",
    title: "HTML Forms",
    description: "Learn to create interactive forms using HTML form elements",
    itemType: "lesson",
    position: 3,
    deliveryMode: "solo",
  },
  {
    id: 4,
    moduleId: 1,
    moduleName: "HTML Fundamentals",
    title: "HTML Project: Create a Personal Webpage",
    description: "Apply your HTML knowledge by creating a personal webpage from scratch",
    itemType: "project",
    position: 4,
    deliveryMode: "group",
  },
  {
    id: 5,
    moduleId: 1,
    moduleName: "HTML Fundamentals",
    title: "HTML Assessment",
    description: "Test your knowledge of HTML concepts and practices",
    itemType: "evaluation",
    position: 5,
    deliveryMode: "solo",
  },
  {
    id: 6,
    moduleId: 2,
    moduleName: "CSS Styling",
    title: "Introduction to CSS",
    description: "Learn the basics of CSS and how it works with HTML",
    itemType: "lesson",
    position: 1,
    deliveryMode: "solo",
  },
  {
    id: 7,
    moduleId: 2,
    moduleName: "CSS Styling",
    title: "CSS Selectors",
    description: "Master different types of CSS selectors for precise styling",
    itemType: "lesson",
    position: 2,
    deliveryMode: "solo",
  },
]

export function CurriculumList() {
  const [curriculumItems, setCurriculumItems] = useState(mockCurriculumItems)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)

  const handleDeleteItem = () => {
    if (itemToDelete !== null) {
      setCurriculumItems(curriculumItems.filter((item) => item.id !== itemToDelete))
      setItemToDelete(null)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Delivery</TableHead>
            <TableHead className="hidden md:table-cell">Position</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {curriculumItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Link href={`/curriculum/${item.id}`} className="hover:underline font-medium">
                      {item.title}
                    </Link>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{item.description}</p>
                </div>
              </TableCell>
              <TableCell>
                <Link href={`/modules/${item.moduleId}`} className="hover:underline flex items-center">
                  <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span className="line-clamp-1">{item.moduleName}</span>
                </Link>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    item.itemType === "lesson" ? "default" : item.itemType === "project" ? "secondary" : "outline"
                  }
                >
                  {item.itemType}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center">
                  {item.deliveryMode === "solo" ? (
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                  )}
                  {item.deliveryMode}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{item.position}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/curriculum/${item.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/curriculum/${item.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setItemToDelete(item.id)}>
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
        open={itemToDelete !== null}
        onOpenChange={() => setItemToDelete(null)}
        onConfirm={handleDeleteItem}
        title="Delete Curriculum Item"
        description="Are you sure you want to delete this curriculum item? This action cannot be undone and will also delete all associated content and student submissions."
      />
    </div>
  )
}
