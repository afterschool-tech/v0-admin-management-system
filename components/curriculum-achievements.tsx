"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AchievementSelector } from "@/components/achievement-selector"

// Mock data - would be fetched from an API in a real implementation
const mockCurriculumAchievements = [
  {
    id: 1,
    curriculumItemId: 1,
    achievementId: 8,
    name: "HTML Structure Master",
    type: "badge",
    description: "Demonstrated understanding of HTML document structure",
  },
  {
    id: 2,
    curriculumItemId: 1,
    achievementId: 10,
    name: "Web Foundations",
    type: "achievement",
    description: "Completed the introduction to web development",
  },
]

interface CurriculumAchievementsProps {
  curriculumItemId: number
}

export function CurriculumAchievements({ curriculumItemId }: CurriculumAchievementsProps) {
  const [achievements, setAchievements] = useState(
    mockCurriculumAchievements.filter((achievement) => achievement.curriculumItemId === curriculumItemId),
  )
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const handleAddAchievement = (selectedAchievements: any[]) => {
    // In a real implementation, you would send this to your API
    console.log("Adding achievements:", selectedAchievements)

    // For demo purposes, we'll just add them to our local state
    const newAchievements = selectedAchievements.map((achievement, index) => ({
      id: achievements.length + index + 1,
      curriculumItemId,
      achievementId: achievement.id,
      name: achievement.name,
      type: achievement.type,
      description: achievement.description,
    }))

    setAchievements([...achievements, ...newAchievements])
    setIsAddDialogOpen(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Associated Achievements</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-3 w-3" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Achievements</DialogTitle>
              <DialogDescription>Select achievements to associate with this curriculum item.</DialogDescription>
            </DialogHeader>
            <AchievementSelector onAdd={handleAddAchievement} onCancel={() => setIsAddDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="flex items-start space-x-3 p-2 rounded-md border">
            <Award className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium flex items-center gap-2">
                  {achievement.name}
                  <Badge
                    variant={
                      achievement.type === "badge"
                        ? "default"
                        : achievement.type === "certificate"
                          ? "secondary"
                          : "outline"
                    }
                    className="ml-2"
                  >
                    {achievement.type}
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{achievement.description}</p>
            </div>
          </div>
        ))}

        {achievements.length === 0 && (
          <div className="text-center py-4 text-muted-foreground border rounded-md">
            No achievements associated with this curriculum item.
          </div>
        )}
      </div>

      <div className="pt-2">
        <Link href="/achievements" className="text-xs text-primary hover:underline">
          Manage all achievements
        </Link>
      </div>
    </div>
  )
}
