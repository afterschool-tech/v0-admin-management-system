import { StudentForm } from "@/components/student-form"

export default function NewStudentPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Add New Student</h1>
      <StudentForm />
    </div>
  )
}
