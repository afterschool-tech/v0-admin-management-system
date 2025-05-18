import { ParentForm } from "@/components/parent-form"

// This would be fetched from an API in a real implementation
const mockParent = {
  id: 1,
  fullName: "Robert Smith",
  email: "robert.smith@example.com",
  phoneNumber: "555-123-4567",
}

export default function EditParentPage({ params }: { params: { id: string } }) {
  const parentId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the parent data based on the ID
  const parent = mockParent

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Parent</h1>
      <ParentForm initialData={parent} />
    </div>
  )
}
