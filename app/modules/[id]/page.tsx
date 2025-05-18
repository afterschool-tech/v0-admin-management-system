import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, BookOpen, FileText, Award, PlusCircle } from "lucide-react"
import { ModuleCurriculum } from "@/components/module-curriculum"
import { ModuleAchievements } from "@/components/module-achievements"

// This would be fetched from an API in a real implementation
const mockModule = {
  id: 1,
  name: "HTML Fundamentals",
  description:
    "Learn the basics of HTML including tags, attributes, and document structure. This module covers everything you need to know to create well-structured web pages using HTML5.",
  programId: 1,
  programName: "Web Development Fundamentals",
  startDate: "2025-06-01",
  endDate: "2025-06-30",
  itemCount: 5,
  status: "active",
}

export default function ModuleDetailPage({ params }: { params: { id: string } }) {
  const moduleId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the module data based on the ID
  const module = mockModule

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href={`/programs/${module.programId}`} className="text-sm text-muted-foreground hover:underline">
              {module.programName}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{module.name}</h1>
            <Badge
              variant={module.status === "active" ? "default" : module.status === "draft" ? "secondary" : "outline"}
            >
              {module.status}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2">{module.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/modules/${moduleId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Module
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/modules/${moduleId}/curriculum/new`}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Curriculum Item
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              <Link href={`/programs/${module.programId}`} className="hover:underline">
                {module.programName}
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(module.startDate).toLocaleDateString()} - {new Date(module.endDate).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Curriculum Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{module.itemCount} Items</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="curriculum">
        <TabsList className="w-full">
          <TabsTrigger value="curriculum" className="flex-1">
            <FileText className="mr-2 h-4 w-4" />
            <span className="sm:inline">Curriculum</span>
            <span className="inline sm:hidden">Curr</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex-1">
            <Award className="mr-2 h-4 w-4" />
            <span className="sm:inline">Achievements</span>
            <span className="inline sm:hidden">Achiev</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="curriculum" className="mt-6">
          <ModuleCurriculum moduleId={moduleId} />
        </TabsContent>
        <TabsContent value="achievements" className="mt-6">
          <ModuleAchievements moduleId={moduleId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
