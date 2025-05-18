"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Award, Plus, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { AchievementSelector } from "@/components/achievement-selector"

// Mock data - would be fetched from an API in a real implementation
const mockProgramAchievements = [
  {
    id: 1,
    programId: 1,
    achievementId: 1,
    name: "Web Developer Beginner",
    type: "badge",
    description: "Completed the basic web development curriculum",
    isDefault: true,
  },
  {
    id: 2,
    programId: 1,
    achievementId: 2,
    name: "HTML Master",
    type: "achievement",
    description: "Demonstrated proficiency in HTML",
    isDefault: false,
  },
  {
    id: 3,
    programId: 1,
    achievementId: 3,
    name: "CSS Stylist",
    type: "achievement",
    description: "Created responsive designs with CSS",
    isDefault: false,
  },
  {
    id: 4,
    programId: 1,
    achievementId: 4,
    name: "JavaScript Coder",
    type: "achievement",
    description: "Successfully implemented JavaScript functionality",
    isDefault: true,
  },
  {
    id: 5,
    programId: 1,
    achievementId: 5,
    name: "Web Development Certificate",
    type: "certificate",
    description: "Completed the entire web development program",
    isDefault: true,
  },
]

interface ProgramAchievementsProps {
  programId: number
}

export function ProgramAchievements({ programId }: ProgramAchievementsProps) {
  const [achievements, setAchievements] = useState(
    mockProgramAchievements.filter((achievement) => achievement.programId === programId),
  )
  const [achievementToDelete, setAchievementToDelete] = useState<number | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleDeleteAchievement = () => {
    if (achievementToDelete !== null) {
      setAchievements(achievements.filter((achievement) => achievement.id !== achievementToDelete))
      setAchievementToDelete(null)
    }
  }

  const handleAddAchievement = (selectedAchievements: any[]) => {
    // In a real implementation, you would send this to your API
    console.log("Adding achievements:", selectedAchievements)

    // For demo purposes, we'll just add them to our local state
    const newAchievements = selectedAchievements.map((achievement, index) => ({
      id: achievements.length + index + 1,
      programId,
      achievementId: achievement.id,
      name: achievement.name,
      type: achievement.type,
      description: achievement.description,
      isDefault: false,
    }))

    setAchievements([...achievements, ...newAchievements])
    setIsAddDialogOpen(false)
  }

  const toggleDefaultStatus = (id: number) => {
    setAchievements(
      achievements.map((achievement) =>
        achievement.id === id ? { ...achievement, isDefault: !achievement.isDefault } : achievement,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Program Achievements</h2>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Achievement
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Achievements</DialogTitle>
              <DialogDescription>Select achievements from the library to add to this program.</DialogDescription>
            </DialogHeader>
            <AchievementSelector onAdd={handleAddAchievement} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Default</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {achievements.map((achievement) => (
              <TableRow key={achievement.id}>
                <TableCell>
                  <Checkbox
                    checked={achievement.isDefault}
                    onCheckedChange={() => toggleDefaultStatus(achievement.id)}
                  />
                </TableCell>
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
                <TableCell>
                  <Button variant="ghost" size="icon" onClick={() => setAchievementToDelete(achievement.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {achievements.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No achievements added to this program yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DeleteConfirmDialog
        open={achievementToDelete !== null}
        onOpenChange={() => setAchievementToDelete(null)}
        onConfirm={handleDeleteAchievement}
        title="Remove Achievement"
        description="Are you sure you want to remove this achievement from the program? This will not delete the achievement from the library."
      />
    </div>
  )
}
