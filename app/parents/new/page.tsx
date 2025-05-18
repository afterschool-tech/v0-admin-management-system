import { ParentForm } from "@/components/parent-form"

export default function NewParentPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Add New Parent</h1>
      <ParentForm />
    </div>
  )
}
