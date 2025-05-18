import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Edit, BookOpen, Layers, User, Users, Award } from "lucide-react"
import { CurriculumContent } from "@/components/curriculum-content"
import { CurriculumAchievements } from "@/components/curriculum-achievements"

// This would be fetched from an API in a real implementation
const mockCurriculumItem = {
  id: 1,
  moduleId: 1,
  moduleName: "HTML Fundamentals",
  programId: 1,
  programName: "Web Development Fundamentals",
  title: "Introduction to HTML",
  description:
    "Learn about the history and purpose of HTML in web development. This lesson covers the evolution of HTML from its inception to HTML5, the role of HTML in the web ecosystem, and how it works with CSS and JavaScript to create modern web applications.",
  itemType: "lesson",
  position: 1,
  deliveryMode: "solo",
  contentUrl: "/curriculum/html-intro.pdf",
  contentType: "application/pdf",
}

export default function CurriculumItemDetailPage({ params }: { params: { id: string } }) {
  const curriculumItemId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the curriculum item data based on the ID
  const curriculumItem = mockCurriculumItem

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/programs/${curriculumItem.programId}`}
              className="text-sm text-muted-foreground hover:underline"
            >
              {curriculumItem.programName}
            </Link>
            <span className="text-sm text-muted-foreground">/</span>
            <Link
              href={`/modules/${curriculumItem.moduleId}`}
              className="text-sm text-muted-foreground hover:underline"
            >
              {curriculumItem.moduleName}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold tracking-tight">{curriculumItem.title}</h1>
            <Badge
              variant={
                curriculumItem.itemType === "lesson"
                  ? "default"
                  : curriculumItem.itemType === "project"
                    ? "secondary"
                    : "outline"
              }
            >
              {curriculumItem.itemType}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2">{curriculumItem.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/curriculum/${curriculumItemId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Item
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Module</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Layers className="mr-2 h-4 w-4 text-muted-foreground" />
              <Link href={`/modules/${curriculumItem.moduleId}`} className="hover:underline">
                {curriculumItem.moduleName}
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Program</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
              <Link href={`/programs/${curriculumItem.programId}`} className="hover:underline">
                {curriculumItem.programName}
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Delivery Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              {curriculumItem.deliveryMode === "solo" ? (
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
              ) : (
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              )}
              <span className="capitalize">{curriculumItem.deliveryMode}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="md:col-span-2 order-2 md:order-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CurriculumContent contentUrl={curriculumItem.contentUrl} contentType={curriculumItem.contentType} />
            </CardContent>
          </Card>
        </div>

        <div className="order-1 md:order-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CurriculumAchievements curriculumItemId={curriculumItemId} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
