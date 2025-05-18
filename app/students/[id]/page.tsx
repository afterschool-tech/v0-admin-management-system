import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, Building, BookOpen, Award, Users } from "lucide-react"
import { StudentPrograms } from "@/components/student-programs"
import { StudentAchievements } from "@/components/student-achievements"
import { StudentParents } from "@/components/student-parents"

// This would be fetched from an API in a real implementation
const mockStudent = {
  id: 1,
  fullName: "John Smith",
  email: "john.smith@example.com",
  birthDate: "2010-05-15",
  level: 3,
  organizationId: 1,
  organizationName: "Tech Academy",
  programCount: 2,
  achievementCount: 5,
  parentCount: 2,
}

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const studentId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the student data based on the ID
  const student = mockStudent

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{student.fullName}</h1>
          <p className="text-muted-foreground">{student.email}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/students/${studentId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Student
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/students/${studentId}/programs/register`}>
              <BookOpen className="mr-2 h-4 w-4" />
              Register for Program
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Birth Date</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{new Date(student.birthDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Level</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="outline" className="text-base">
              Level {student.level}
            </Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Organization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Building className="mr-2 h-4 w-4 text-muted-foreground" />
              <Link href={`/organizations/${student.organizationId}`} className="hover:underline">
                {student.organizationName}
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Parents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{student.parentCount} Parents</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="programs">
        <TabsList>
          <TabsTrigger value="programs">
            <BookOpen className="mr-2 h-4 w-4" />
            Programs
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Award className="mr-2 h-4 w-4" />
            Achievements
          </TabsTrigger>
          <TabsTrigger value="parents">
            <Users className="mr-2 h-4 w-4" />
            Parents
          </TabsTrigger>
        </TabsList>
        <TabsContent value="programs" className="mt-6">
          <StudentPrograms studentId={studentId} />
        </TabsContent>
        <TabsContent value="achievements" className="mt-6">
          <StudentAchievements studentId={studentId} />
        </TabsContent>
        <TabsContent value="parents" className="mt-6">
          <StudentParents studentId={studentId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
