import { CurriculumItemForm } from "@/components/curriculum-item-form"

export default function NewCurriculumItemPage({ params }: { params: { id: string } }) {
  const moduleId = Number.parseInt(params.id)

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Add Curriculum Item</h1>
      <CurriculumItemForm moduleId={moduleId} />
    </div>
  )
}
