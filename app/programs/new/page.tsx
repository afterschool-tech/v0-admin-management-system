"use client"

import { ProgramForm } from "@/components/program-form"
import { addProgram } from "@/components/program-list"
import { useEffect } from "react"

export default function NewProgramPage() {
  // Register the addProgram function with the window object
  // This is a workaround for the lack of a proper state management solution
  useEffect(() => {
    // @ts-ignore
    window.addProgram = addProgram
  }, [])

  return (
    <div className="container mx-auto py-6 space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Create New Program</h1>
      <ProgramForm />
    </div>
  )
}
