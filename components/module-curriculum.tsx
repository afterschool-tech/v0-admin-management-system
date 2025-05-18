"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileText, Edit, Trash2, PlusCircle, MoveUp, MoveDown, Users, User, Eye } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data - would be fetched from an API in a real implementation
const mockCurriculumItems = [
  {
    id: 1,
    moduleId: 1,
    title: "Introduction to HTML",
    description: "Learn about the history and purpose of HTML in web development",
    itemType: "lesson",
    position: 1,
    deliveryMode: "solo",
    contentUrl: "/curriculum/html-intro.pdf",
  },
  {
    id: 2,
    moduleId: 1,
    title: "HTML Tags and Elements",
    description: "Explore the most common HTML tags and how to use them properly",
    itemType: "lesson",
    position: 2,
    deliveryMode: "solo",
    contentUrl: "/curriculum/html-tags.pdf",
  },
  {
    id: 3,
    moduleId: 1,
    title: "HTML Forms",
    description: "Learn to create interactive forms using HTML form elements",
    itemType: "lesson",
    position: 3,
    deliveryMode: "solo",
    contentUrl: "/curriculum/html-forms.pdf",
  },
  {
    id: 4,
    moduleId: 1,
    title: "HTML Project: Create a Personal Webpage",
    description: "Apply your HTML knowledge by creating a personal webpage from scratch",
    itemType: "project",
    position: 4,
    deliveryMode: "group",
    contentUrl: "/curriculum/html-project.pdf",
  },
  {
    id: 5,
    moduleId: 1,
    title: "HTML Assessment",
    description: "Test your knowledge of HTML concepts and practices",
    itemType: "evaluation",
    position: 5,
    deliveryMode: "solo",
    contentUrl: "/curriculum/html-assessment.pdf",
  },
]

interface ModuleCurriculumProps {
  moduleId: number
}

export function ModuleCurriculum({ moduleId }: ModuleCurriculumProps) {
  const [curriculumItems, setCurriculumItems] = useState(
    mockCurriculumItems.filter((item) => item.moduleId === moduleId).sort((a, b) => a.position - b.position),
  )
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)

  const handleDeleteItem = () => {
    if (itemToDelete !== null) {
      setCurriculumItems(curriculumItems.filter((item) => item.id !== itemToDelete))
      setItemToDelete(null)
    }
  }

  const moveItem = (id: number, direction: "up" | "down") => {
    const index = curriculumItems.findIndex((item) => item.id === id)
    if ((direction === "up" && index === 0) || (direction === "down" && index === curriculumItems.length - 1)) {
      return
    }

    const newItems = [...curriculumItems]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    // Swap positions
    const tempPosition = newItems[index].position
    newItems[index].position = newItems[targetIndex].position
    newItems[targetIndex].position = tempPosition

    // Swap items in array
    const temp = newItems[index]
    newItems[index] = newItems[targetIndex]
    newItems[targetIndex] = temp

    setCurriculumItems(newItems)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Curriculum Items</h2>
        <Button asChild>
          <Link href={`/modules/${moduleId}/curriculum/new`}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Curriculum Item
          </Link>
        </Button>
      </div>

      {/* Desktop view - Table */}
      <div className="rounded-md border hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]">Position</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Delivery</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {curriculumItems.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.position}</TableCell>
                <TableCell>
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
                  <Badge
                    variant={
                      item.itemType === "lesson" ? "default" : item.itemType === "project" ? "secondary" : "outline"
                    }
                  >
                    {item.itemType}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    {item.deliveryMode === "solo" ? (
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    {item.deliveryMode}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" disabled={index === 0} onClick={() => moveItem(item.id, "up")}>
                      <MoveUp className="h-4 w-4" />
                      <span className="sr-only">Move Up</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={index === curriculumItems.length - 1}
                      onClick={() => moveItem(item.id, "down")}
                    >
                      <MoveDown className="h-4 w-4" />
                      <span className="sr-only">Move Down</span>
                    </Button>
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
            {curriculumItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No curriculum items added to this module yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view - Cards */}
      <div className="space-y-4 md:hidden">
        {curriculumItems.map((item, index) => (
          <Card key={item.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  <div className="bg-muted rounded-full w-6 h-6 flex items-center justify-center mr-2 text-xs font-medium">
                    {item.position}
                  </div>
                  <Badge
                    variant={
                      item.itemType === "lesson" ? "default" : item.itemType === "project" ? "secondary" : "outline"
                    }
                  >
                    {item.itemType}
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                    <Link href={`/curriculum/${item.id}`}>
                      <Eye className="h-3 w-3" />
                      <span className="sr-only">View</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                    <Link href={`/curriculum/${item.id}/edit`}>
                      <Edit className="h-3 w-3" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setItemToDelete(item.id)}>
                    <Trash2 className="h-3 w-3" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </div>
              </div>
              <CardTitle className="text-base mt-2">
                <Link href={`/curriculum/${item.id}`} className="hover:underline flex items-center">
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  {item.title}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-2 space-y-2">
              <p className="text-xs text-muted-foreground">{item.description}</p>

              <div className="flex items-center text-xs">
                {item.deliveryMode === "solo" ? (
                  <User className="mr-2 h-3 w-3 text-muted-foreground" />
                ) : (
                  <Users className="mr-2 h-3 w-3 text-muted-foreground" />
                )}
                <span className="capitalize">{item.deliveryMode} Delivery</span>
              </div>

              <div className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  disabled={index === 0}
                  onClick={() => moveItem(item.id, "up")}
                >
                  <MoveUp className="mr-1 h-3 w-3" />
                  Move Up
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs"
                  disabled={index === curriculumItems.length - 1}
                  onClick={() => moveItem(item.id, "down")}
                >
                  Move Down
                  <MoveDown className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {curriculumItems.length === 0 && (
          <div className="text-center py-8 px-4 border rounded-md">
            <p className="text-muted-foreground">No curriculum items added to this module yet.</p>
          </div>
        )}
      </div>

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
