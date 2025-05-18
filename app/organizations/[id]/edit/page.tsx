import { OrganizationForm } from "@/components/organization-form"

// This would be fetched from an API in a real implementation
const mockOrganization = {
  id: 1,
  fullName: "Tech Academy",
  email: "info@techacademy.com",
  contactPerson: "John Davis",
  contactPhone: "555-123-4567",
}

export default function EditOrganizationPage({ params }: { params: { id: string } }) {
  const organizationId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the organization data based on the ID
  const organization = mockOrganization

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Organization</h1>
      <OrganizationForm initialData={organization} />
    </div>
  )
}
