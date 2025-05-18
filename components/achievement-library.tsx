"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Award, Edit, Trash2 } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

// Mock data - would be fetched from an API in a real implementation
const mockAchievements = [
  {
    id: 1,
    name: "Web Developer Beginner",
    type: "badge",
    description: "Completed the basic web development curriculum",
  },
  {
    id: 2,
    name: "HTML Master",
    type: "achievement",
    description: "Demonstrated proficiency in HTML",
  },
  {
    id: 3,
    name: "CSS Stylist",
    type: "achievement",
    description: "Created responsive designs with CSS",
  },
  {
    id: 4,
    name: "JavaScript Coder",
    type: "achievement",
    description: "Successfully implemented JavaScript functionality",
  },
  {
    id: 5,
    name: "Web Development Certificate",
    type: "certificate",
    description: "Completed the entire web development program",
  },
  {
    id: 6,
    name: "JavaScript Expert",
    type: "badge",
    description: "Demonstrated advanced JavaScript skills",
  },
  {
    id: 7,
    name: "Responsive Design Master",
    type: "achievement",
    description: "Created fully responsive web layouts",
  },
  {
    id: 8,
    name: "Web Accessibility Champion",
    type: "badge",
    description: "Implemented accessible web features",
  },
  {
    id: 9,
    name: "Frontend Developer Certificate",
    type: "certificate",
    description: "Completed all frontend development requirements",
  },
  {
    id: 10,
    name: "Code Quality Guardian",
    type: "achievement",
    description: "Maintained high code quality standards",
  },
]

export function AchievementLibrary() {
  const [achievements, setAchievements] = useState(mockAchievements)
  const [achievementToDelete, setAchievementToDelete] = useState<number | null>(null)

  const handleDeleteAchievement = () => {
    if (achievementToDelete !== null) {
      setAchievements(achievements.filter((achievement) => achievement.id !== achievementToDelete))
      setAchievementToDelete(null)
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {achievements.map((achievement) => (
            <TableRow key={achievement.id}>
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                  {achievement.name}
                </div>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    achievement.type === "badge"
                      ? "default"
                      : achievement.type === "certificate"
                        ? "secondary"
                        : "outline"
                  }
                >
                  {achievement.type}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{achievement.description}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/achievements/${achievement.id}/edit`}>
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => setAchievementToDelete(achievement.id)}>
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
        open={achievementToDelete !== null}
        onOpenChange={() => setAchievementToDelete(null)}
        onConfirm={handleDeleteAchievement}
        title="Delete Achievement"
        description="Are you sure you want to delete this achievement? This action cannot be undone and will remove this achievement from all programs, modules, and curriculum items."
      />
    </div>
  )
}
