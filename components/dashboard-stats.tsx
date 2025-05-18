import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRound, Building, Users, BookOpen } from "lucide-react"

export function DashboardStats() {
  // These would be fetched from an API in a real implementation
  const stats = [
    { title: "Total Students", value: 248, icon: UserRound, change: "+12 this month" },
    { title: "Organizations", value: 15, icon: Building, change: "+2 this month" },
    { title: "Parents", value: 186, icon: Users, change: "+8 this month" },
    { title: "Programs", value: 24, icon: BookOpen, change: "+3 this month" },
  ]

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
