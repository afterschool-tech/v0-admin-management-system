import { StudentForm } from "@/components/student-form"

// This would be fetched from an API in a real implementation
const mockStudent = {
  id: 1,
  fullName: "John Smith",
  email: "john.smith@example.com",
  birthDate: new Date("2010-05-15"),
  level: 3,
  organizationId: 1,
}

export default function EditStudentPage({ params }: { params: { id: string } }) {
  const studentId = Number.parseInt(params.id)

  // In a real implementation, you would fetch the student data based on the ID
  const student = mockStudent

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Edit Student</h1>
      <StudentForm initialData={student} />
    </div>
  )
}
