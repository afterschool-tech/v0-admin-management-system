"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface AchievementFormProps {
  initialData?: {
    id?: number
    name: string
    type: "badge" | "certificate" | "achievement"
    description: string
    criteria: string
  }
}

export function AchievementForm({ initialData }: AchievementFormProps = {}) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    type: initialData?.type || "badge",
    description: initialData?.description || "",
    criteria: initialData?.criteria || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log("Form submitted:", formData)

    // Navigate back to achievements list
    router.push("/achievements")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Achievement Name</Label>
              <Input
                id="name"
                placeholder="Enter achievement name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Achievement Type</Label>
              <RadioGroup
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    type: value as "badge" | "certificate" | "achievement",
                  })
                }
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="badge" id="badge" />
                  <Label htmlFor="badge" className="cursor-pointer">
                    Badge
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="certificate" id="certificate" />
                  <Label htmlFor="certificate" className="cursor-pointer">
                    Certificate
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="achievement" id="achievement" />
                  <Label htmlFor="achievement" className="cursor-pointer">
                    Achievement
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter achievement description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="criteria">Criteria</Label>
              <Textarea
                id="criteria"
                placeholder="Enter achievement criteria"
                value={formData.criteria}
                onChange={(e) => setFormData({ ...formData, criteria: e.target.value })}
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/achievements")}>
          Cancel
        </Button>
        <Button type="submit">{initialData?.id ? "Update Achievement" : "Create Achievement"}</Button>
      </div>
    </form>
  )
}
