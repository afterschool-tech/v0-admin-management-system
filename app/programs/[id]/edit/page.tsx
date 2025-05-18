import { ProgramForm } from "@/components/program-form"

// This would be fetched from an API in a real implementation
const mockProgram = {
  id: 1,
  name: "Web Development Fundamentals",
  description: "Learn the basics of web development with HTML, CSS, and JavaScript",
  startDate: new Date("2025-06-01"),
  endDate: new Date("2025-08-30"),
}

export default function EditProgramPage({ params }: { params: { id: string } }) {
  const programId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the program data based on the ID
  const program = mockProgram

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Program</h1>
      <ProgramForm initialData={program} />
    </div>
  )
}
