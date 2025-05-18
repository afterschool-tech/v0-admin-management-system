import { ModuleForm } from "@/components/module-form"

// This would be fetched from an API in a real implementation
const mockModule = {
  id: 1,
  name: "HTML Fundamentals",
  description: "Learn the basics of HTML including tags, attributes, and document structure",
  programId: 1,
  startDate: new Date("2025-06-01"),
  endDate: new Date("2025-06-30"),
  status: "active" as const,
}

export default function EditModulePage({ params }: { params: { id: string } }) {
  const moduleId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the module data based on the ID
  const module = mockModule

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Module</h1>
      <ModuleForm initialData={module} />
    </div>
  )
}
