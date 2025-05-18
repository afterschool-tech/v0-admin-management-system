"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar } from "lucide-react"

// Mock data - would be fetched from an API in a real implementation
const mockStudentAchievements = [
  {
    id: 1,
    studentId: 1,
    achievementId: 1,
    name: "Web Developer Beginner",
    type: "badge",
    description: "Completed the basic web development curriculum",
    earnedAt: "2025-02-15T10:30:00Z",
  },
  {
    id: 2,
    studentId: 1,
    achievementId: 2,
    name: "HTML Master",
    type: "achievement",
    description: "Demonstrated proficiency in HTML",
    earnedAt: "2025-03-01T14:45:00Z",
  },
  {
    id: 3,
    studentId: 1,
    achievementId: 3,
    name: "CSS Stylist",
    type: "achievement",
    description: "Created responsive designs with CSS",
    earnedAt: "2025-03-15T09:15:00Z",
  },
  {
    id: 4,
    studentId: 1,
    achievementId: 4,
    name: "JavaScript Coder",
    type: "achievement",
    description: "Successfully implemented JavaScript functionality",
    earnedAt: "2025-04-05T11:20:00Z",
  },
  {
    id: 5,
    studentId: 1,
    achievementId: 5,
    name: "Web Development Certificate",
    type: "certificate",
    description: "Completed the entire web development program",
    earnedAt: "2025-04-30T16:30:00Z",
  },
]

interface StudentAchievementsProps {
  studentId: number
}

export function StudentAchievements({ studentId }: StudentAchievementsProps) {
  const [achievements] = useState(mockStudentAchievements.filter((achievement) => achievement.studentId === studentId))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold tracking-tight">Earned Achievements</h2>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Achievement</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead>Earned Date</TableHead>
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
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>{new Date(achievement.earnedAt).toLocaleDateString()}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {achievements.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  No achievements earned yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
