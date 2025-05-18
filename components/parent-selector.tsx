"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Users, Phone, Mail } from "lucide-react"
import { DialogFooter } from "@/components/ui/dialog"

// Mock data - would be fetched from an API in a real implementation
const mockParents = [
  {
    id: 3,
    fullName: "David Johnson",
    email: "david.johnson@example.com",
    phoneNumber: "555-111-2222",
  },
  {
    id: 4,
    fullName: "Maria Garcia",
    email: "maria.garcia@example.com",
    phoneNumber: "555-333-4444",
  },
  {
    id: 5,
    fullName: "James Wilson",
    email: "james.wilson@example.com",
    phoneNumber: "555-555-6666",
  },
  {
    id: 6,
    fullName: "Patricia Brown",
    email: "patricia.brown@example.com",
    phoneNumber: "555-777-8888",
  },
  {
    id: 7,
    fullName: "Michael Davis",
    email: "michael.davis@example.com",
    phoneNumber: "555-999-0000",
  },
]

interface ParentSelectorProps {
  onAdd: (selectedParents: any[]) => void
  onCancel: () => void
}

export function ParentSelector({ onAdd, onCancel }: ParentSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedParents, setSelectedParents] = useState<number[]>([])

  const filteredParents = mockParents.filter(
    (parent) =>
      parent.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleToggleSelection = (id: number) => {
    setSelectedParents((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleAddSelected = () => {
    const parentsToAdd = mockParents.filter((parent) => selectedParents.includes(parent.id))
    onAdd(parentsToAdd)
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search parents..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[300px] rounded-md border p-4">
        <div className="space-y-4">
          {filteredParents.map((parent) => (
            <div key={parent.id} className="flex items-start space-x-3 p-2 rounded-md hover:bg-muted">
              <Checkbox
                id={`parent-${parent.id}`}
                checked={selectedParents.includes(parent.id)}
                onCheckedChange={() => handleToggleSelection(parent.id)}
              />
              <div className="space-y-1 w-full">
                <label htmlFor={`parent-${parent.id}`} className="font-medium cursor-pointer">
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    {parent.fullName}
                  </div>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    {parent.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2 h-4 w-4" />
                    {parent.phoneNumber}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filteredParents.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">No parents found matching your search.</div>
          )}
        </div>
      </ScrollArea>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleAddSelected} disabled={selectedParents.length === 0}>
          Add Selected ({selectedParents.length})
        </Button>
      </DialogFooter>
    </div>
  )
}
