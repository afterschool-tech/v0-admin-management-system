import { AchievementForm } from "@/components/achievement-form"

export default function NewAchievementPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create New Achievement</h1>
      <AchievementForm />
    </div>
  )
}
