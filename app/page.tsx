import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRound, Building, Users, BookOpen, Award } from "lucide-react"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentUsers } from "@/components/recent-users"

export default function Dashboard() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">AfterSchool Tech Dashboard</h1>
      </div>

      <DashboardStats />

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Students</CardTitle>
            <CardDescription>Manage student accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-20">
              <UserRound className="h-10 w-10 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/students" className="w-full">
              <Button variant="outline" className="w-full">
                Manage Students
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Organizations</CardTitle>
            <CardDescription>Manage organization accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-20">
              <Building className="h-10 w-10 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/organizations" className="w-full">
              <Button variant="outline" className="w-full">
                Manage Organizations
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Parents</CardTitle>
            <CardDescription>Manage parent accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-20">
              <Users className="h-10 w-10 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/parents" className="w-full">
              <Button variant="outline" className="w-full">
                Manage Parents
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
        <Card className="sm:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg font-medium">Programs</CardTitle>
                <CardDescription>Manage educational programs</CardDescription>
              </div>
              <Link href="/programs">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-20">
              <BookOpen className="h-10 w-10 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/programs/new" className="w-full">
              <Button className="w-full">Create New Program</Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Achievements</CardTitle>
            <CardDescription>Manage achievements and badges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-20">
              <Award className="h-10 w-10 text-muted-foreground" />
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/achievements" className="w-full">
              <Button variant="outline" className="w-full">
                View Achievement Library
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <RecentUsers />
    </div>
  )
}
