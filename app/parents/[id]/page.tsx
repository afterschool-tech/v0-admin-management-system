import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRound, Edit, Mail, Phone } from "lucide-react"
import { ParentStudents } from "@/components/parent-students"

// This would be fetched from an API in a real implementation
const mockParent = {
  id: 1,
  fullName: "Robert Smith",
  email: "robert.smith@example.com",
  phoneNumber: "555-123-4567",
  studentCount: 2,
}

export default function ParentDetailPage({ params }: { params: { id: string } }) {
  const parentId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the parent data based on the ID
  const parent = mockParent

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{parent.fullName}</h1>
          <p className="text-muted-foreground">
            <a href={`mailto:${parent.email}`} className="hover:underline">
              {parent.email}
            </a>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/parents/${parentId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Parent
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Phone Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
              <a href={`tel:${parent.phoneNumber}`} className="hover:underline">
                {parent.phoneNumber}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Email</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
              <a href={`mailto:${parent.email}`} className="hover:underline">
                {parent.email}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold tracking-tight">Students</h2>
          <Button asChild>
            <Link href={`/parents/${parentId}/add-student`}>
              <UserRound className="mr-2 h-4 w-4" />
              Add Student
            </Link>
          </Button>
        </div>

        <ParentStudents parentId={parentId} />
      </div>
    </div>
  )
}
