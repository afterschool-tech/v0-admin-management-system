import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Search, Filter } from "lucide-react"
import { AchievementLibrary } from "@/components/achievement-library"

export default function AchievementsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Achievement Library</h1>
        <Link href="/achievements/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Achievement
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search achievements..." className="pl-8 w-full" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="badge">Badges</SelectItem>
              <SelectItem value="certificate">Certificates</SelectItem>
              <SelectItem value="achievement">Achievements</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <AchievementLibrary />
    </div>
  )
}
