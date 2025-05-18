"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"

interface ModuleFormProps {
  initialData?: {
    id?: number
    name: string
    description: string
    programId: number
    startDate: Date
    endDate: Date
    status: "draft" | "upcoming" | "active" | "completed"
  }
}

// Mock programs - would be fetched from an API in a real implementation
const programs = [
  { id: 1, name: "Web Development Fundamentals" },
  { id: 2, name: "Mobile App Development" },
  { id: 3, name: "Data Science for Beginners" },
]

export function ModuleForm({ initialData }: ModuleFormProps = {}) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    programId: initialData?.programId || 0,
    startDate: initialData?.startDate || new Date(),
    endDate: initialData?.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    status: initialData?.status || "draft",
  })

  // Get programId from query parameters if available
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const programIdParam = params.get("programId")

    if (programIdParam && !initialData?.programId) {
      setFormData((prev) => ({
        ...prev,
        programId: Number.parseInt(programIdParam, 10),
      }))
    }
  }, [initialData?.programId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Module name is required",
        variant: "destructive",
      })
      return
    }

    if (!formData.programId) {
      toast({
        title: "Error",
        description: "Please select a program",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // In a real application, this would be an API call
      // For now, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Generate a new ID for the module (in a real app, the backend would do this)
      const newModuleId = Math.floor(Math.random() * 1000) + 10

      // Find the program name
      const program = programs.find((p) => p.id === formData.programId)

      // Create the new module object
      const newModule = {
        id: initialData?.id || newModuleId,
        name: formData.name,
        description: formData.description,
        programId: formData.programId,
        programName: program?.name || "Unknown Program",
        startDate: formData.startDate.toISOString().split("T")[0],
        endDate: formData.endDate.toISOString().split("T")[0],
        itemCount: 0,
        status: formData.status,
      }

      // In a real application, we would update our global state or context here
      console.log("Module created/updated:", newModule)

      toast({
        title: initialData?.id ? "Module Updated" : "Module Created",
        description: `${formData.name} has been ${initialData?.id ? "updated" : "created"} successfully.`,
      })

      // Navigate back to modules list or to the program page if coming from there
      if (formData.programId && !initialData?.id) {
        router.push(`/programs/${formData.programId}`)
      } else {
        router.push("/modules")
      }
      router.refresh()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "There was a problem saving the module. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Module Name</Label>
              <Input
                id="name"
                placeholder="Enter module name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter module description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">Program</Label>
              <Select
                value={formData.programId ? formData.programId.toString() : ""}
                onValueChange={(value) => setFormData({ ...formData, programId: Number.parseInt(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  {programs.map((program) => (
                    <SelectItem key={program.id} value={program.id.toString()}>
                      {program.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => date && setFormData({ ...formData, startDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => date && setFormData({ ...formData, endDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <RadioGroup
                value={formData.status}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    status: value as "draft" | "upcoming" | "active" | "completed",
                  })
                }
                className="flex flex-wrap gap-4 pt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="draft" id="draft" />
                  <Label htmlFor="draft" className="cursor-pointer">
                    Draft
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upcoming" id="upcoming" />
                  <Label htmlFor="upcoming" className="cursor-pointer">
                    Upcoming
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active" className="cursor-pointer">
                    Active
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="completed" id="completed" />
                  <Label htmlFor="completed" className="cursor-pointer">
                    Completed
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/modules")}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="animate-spin mr-2">◌</span>
              {initialData?.id ? "Updating..." : "Creating..."}
            </>
          ) : initialData?.id ? (
            "Update Module"
          ) : (
            "Create Module"
          )}
        </Button>
      </div>
    </form>
  )
}
