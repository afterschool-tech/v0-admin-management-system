import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRound, Edit, Mail, Phone, BookOpen } from "lucide-react"
import { OrganizationStudents } from "@/components/organization-students"
import { OrganizationPrograms } from "@/components/organization-programs"

// This would be fetched from an API in a real implementation
const mockOrganization = {
  id: 1,
  fullName: "Tech Academy",
  email: "info@techacademy.com",
  contactPerson: "John Davis",
  contactPhone: "555-123-4567",
  studentCount: 85,
  programCount: 6,
}

export default function OrganizationDetailPage({ params }: { params: { id: string } }) {
  const organizationId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the organization data based on the ID
  const organization = mockOrganization

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{organization.fullName}</h1>
          <p className="text-muted-foreground">
            <a href={`mailto:${organization.email}`} className="hover:underline">
              {organization.email}
            </a>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/organizations/${organizationId}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Organization
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contact Person</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="font-medium">{organization.contactPerson}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Contact Phone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
              <a href={`tel:${organization.contactPhone}`} className="hover:underline">
                {organization.contactPhone}
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
              <a href={`mailto:${organization.email}`} className="hover:underline">
                {organization.email}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students">
            <UserRound className="mr-2 h-4 w-4" />
            Students
          </TabsTrigger>
          <TabsTrigger value="programs">
            <BookOpen className="mr-2 h-4 w-4" />
            Programs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="students" className="mt-6">
          <OrganizationStudents organizationId={organizationId} />
        </TabsContent>
        <TabsContent value="programs" className="mt-6">
          <OrganizationPrograms organizationId={organizationId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
