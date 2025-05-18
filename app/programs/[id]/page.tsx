import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, Layers, FileText, Award } from "lucide-react"
import { ProgramModules } from "@/components/program-modules"
import { ProgramAchievements } from "@/components/program-achievements"

// This would be fetched from an API in a real implementation
const mockProgram = {
  id: 1,
  name: "Web Development Fundamentals",
  description:
    "Learn the basics of web development with HTML, CSS, and JavaScript. This comprehensive program covers everything from basic HTML tags to advanced JavaScript concepts, preparing students for a career in web development.",
  startDate: "2025-06-01",
  endDate: "2025-08-30",
  moduleCount: 4,
  status: "active",
}

export default function ProgramDetailPage({ params }: { params: { id: string } }) {
  const programId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the program data based on the ID
  const program = mockProgram

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{program.name}</h1>
            <Badge
              variant={program.status === "active" ? "default" : program.status === "draft" ? "secondary" : "outline"}
            >
              {program.status}
            </Badge>
          </div>
          <p className="text-muted-foreground">{program.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/programs/${programId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Program
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/modules/new?programId=${programId}`}>
              <Layers className="mr-2 h-4 w-4" />
              Add Module
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Date Range</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>
                {new Date(program.startDate).toLocaleDateString()} - {new Date(program.endDate).toLocaleDateString()}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Modules</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{program.moduleCount} Modules</span>
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
              <span>12 Items</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules">
        <TabsList className="w-full">
          <TabsTrigger value="modules" className="flex-1">
            <Layers className="mr-2 h-4 w-4" />
            <span className="sm:inline">Modules</span>
            <span className="inline sm:hidden">Mod</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="flex-1">
            <Award className="mr-2 h-4 w-4" />
            <span className="sm:inline">Achievements</span>
            <span className="inline sm:hidden">Achiev</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="modules" className="mt-6">
          <ProgramModules programId={programId} />
        </TabsContent>
        <TabsContent value="achievements" className="mt-6">
          <ProgramAchievements programId={programId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
