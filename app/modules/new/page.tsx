"use client"

import { ModuleForm } from "@/components/module-form"
import { addModule } from "@/components/module-list"
import { useEffect } from "react"

export default function NewModulePage() {
  // Register the addModule function with the window object
  // This is a workaround for the lack of a proper state management solution
  useEffect(() => {
    // @ts-ignore
    window.addModule = addModule
  }, [])

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create New Module</h1>
      <ModuleForm />
    </div>
  )
}
