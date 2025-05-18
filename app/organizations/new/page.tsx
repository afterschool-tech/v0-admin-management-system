import { OrganizationForm } from "@/components/organization-form"

export default function NewOrganizationPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Add New Organization</h1>
      <OrganizationForm />
    </div>
  )
}
