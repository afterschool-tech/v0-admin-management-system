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
const mockModuleAchievements = [
  {
    id: 1,
    moduleId: 1,
    achievementId: 8,
    name: "HTML Structure Master",
    type: "badge",
    description: "Demonstrated understanding of HTML document structure",
    isDefault: true,
  },
  {
    id: 2,
    moduleId: 1,
    achievementId: 9,
    name: "Form Builder",
    type: "achievement",
    description: "Successfully created complex HTML forms",
    isDefault: false,
  },
  {
    id: 3,
    moduleId: 1,
    achievementId: 10,
    name: "HTML5 Expert",
    type: "achievement",
    description: "Mastered HTML5 features and semantics",
    isDefault: true,
  },
]

interface ModuleAchievementsProps {
  moduleId: number
}

export function ModuleAchievements({ moduleId }: ModuleAchievementsProps) {
  const [achievements, setAchievements] = useState(
    mockModuleAchievements.filter((achievement) => achievement.moduleId === moduleId),
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
      moduleId,
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
        <h2 className="text-2xl font-bold tracking-tight">Module Achievements</h2>
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
              <DialogDescription>Select achievements from the library to add to this module.</DialogDescription>
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
                  No achievements added to this module yet.
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
        description="Are you sure you want to remove this achievement from the module? This will not delete the achievement from the library."
      />
    </div>
  )
}
