"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Award } from "lucide-react"
import { DialogFooter } from "@/components/ui/dialog"

// Mock data - would be fetched from an API in a real implementation
const mockAchievements = [
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
  {
    id: 11,
    name: "Web Performance Optimizer",
    type: "badge",
    description: "Optimized web applications for performance",
  },
  {
    id: 12,
    name: "Full Stack Explorer",
    type: "achievement",
    description: "Explored both frontend and backend technologies",
  },
]

interface AchievementSelectorProps {
  onAdd: (selectedAchievements: any[]) => void
  onCancel: () => void
}

export function AchievementSelector({ onAdd, onCancel }: AchievementSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedAchievements, setSelectedAchievements] = useState<number[]>([])

  const filteredAchievements = mockAchievements.filter(
    (achievement) =>
      achievement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleToggleSelection = (id: number) => {
    setSelectedAchievements((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleAddSelected = () => {
    const achievementsToAdd = mockAchievements.filter((achievement) => selectedAchievements.includes(achievement.id))
    onAdd(achievementsToAdd)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search achievements..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          {filteredAchievements.map((achievement) => (
            <div key={achievement.id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted">
              <Checkbox
                id={`achievement-${achievement.id}`}
                checked={selectedAchievements.includes(achievement.id)}
                onCheckedChange={() => handleToggleSelection(achievement.id)}
              />
              <div className="space-y-1">
                <div className="flex items-center">
                  <label htmlFor={`achievement-${achievement.id}`} className="font-medium cursor-pointer">
                    <div className="flex items-center">
                      <Award className="mr-2 h-4 w-4 text-muted-foreground" />
                      {achievement.name}
                    </div>
                  </label>
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
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
          {filteredAchievements.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">No achievements found matching your search.</div>
          )}
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleAddSelected} disabled={selectedAchievements.length === 0}>
          Add Selected ({selectedAchievements.length})
        </Button>
      </DialogFooter>
    </div>
  )
}
