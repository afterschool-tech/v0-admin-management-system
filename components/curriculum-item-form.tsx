"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { FileUp, LinkIcon, File, FileText, FileImage, FileVideo, FilePlus, X, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CurriculumItemFormProps {
  moduleId: number
  initialData?: {
    id?: number
    title: string
    description: string
    itemType: "lesson" | "evaluation" | "project"
    deliveryMode: "solo" | "group"
    position: number
    contentUrl?: string
    contentType?: string
  }
}

export function CurriculumItemForm({ moduleId, initialData }: CurriculumItemFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    itemType: initialData?.itemType || "lesson",
    deliveryMode: initialData?.deliveryMode || "solo",
    position: initialData?.position || 1,
    contentUrl: initialData?.contentUrl || "",
    contentType: initialData?.contentType || "",
  })

  const [file, setFile] = useState<File | null>(null)
  const [uploadTab, setUploadTab] = useState<string>("file")
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [previewUrl, setPreviewUrl] = useState<string>(initialData?.contentUrl || "")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.title.trim()) {
      setErrorMessage("Title is required")
      return
    }

    if (uploadTab === "file" && !file && !previewUrl) {
      setErrorMessage("Please upload a file or provide a URL")
      return
    }

    if (uploadTab === "url" && !formData.contentUrl) {
      setErrorMessage("Please provide a content URL")
      return
    }

    setErrorMessage("")

    // Here you would typically send the data to your API
    console.log("Form submitted:", {
      moduleId,
      ...formData,
      file,
      contentUrl: uploadTab === "file" ? previewUrl : formData.contentUrl,
    })

    // Navigate back to module page
    router.push(`/modules/${moduleId}`)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage("")
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create a preview URL for the file
      const fileUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(fileUrl)

      // Set content type based on file type
      const fileType = selectedFile.type
      setFormData({
        ...formData,
        contentType: fileType,
      })

      // Simulate file upload
      simulateFileUpload(selectedFile)
    }
  }

  const simulateFileUpload = (file: File) => {
    setUploadStatus("uploading")
    setUploadProgress(0)

    // Simulate upload progress
    const totalSize = file.size
    let loadedSize = 0
    const chunkSize = totalSize / 10

    const interval = setInterval(() => {
      loadedSize += chunkSize
      const progress = Math.min(Math.round((loadedSize / totalSize) * 100), 100)
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setUploadStatus("success")
      }
    }, 300)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreviewUrl("")
    setUploadStatus("idle")
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getFileIcon = () => {
    if (!file) return <File className="h-12 w-12 text-muted-foreground" />

    const fileType = file.type

    if (fileType.startsWith("image/")) {
      return <FileImage className="h-12 w-12 text-blue-500" />
    } else if (fileType.startsWith("video/")) {
      return <FileVideo className="h-12 w-12 text-red-500" />
    } else if (fileType === "application/pdf") {
      return <FileText className="h-12 w-12 text-orange-500" />
    } else {
      return <File className="h-12 w-12 text-muted-foreground" />
    }
  }

  const getFilePreview = () => {
    if (!previewUrl) return null

    if (file?.type.startsWith("image/")) {
      return (
        <div className="mt-4 relative">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="max-h-[300px] max-w-full rounded-md border object-contain"
          />
        </div>
      )
    } else if (file?.type.startsWith("video/")) {
      return (
        <div className="mt-4">
          <video src={previewUrl} controls className="max-h-[300px] max-w-full rounded-md border" />
        </div>
      )
    } else if (file?.type === "application/pdf") {
      return (
        <div className="mt-4 border rounded-md p-4 bg-muted/30 flex items-center justify-center">
          <FileText className="h-8 w-8 text-orange-500 mr-2" />
          <span>PDF Document: {file.name}</span>
        </div>
      )
    }

    return null
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter curriculum item title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter curriculum item description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Item Type</Label>
              <RadioGroup
                value={formData.itemType}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    itemType: value as "lesson" | "evaluation" | "project",
                  })
                }
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lesson" id="lesson" />
                  <Label htmlFor="lesson" className="cursor-pointer">
                    Lesson
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="evaluation" id="evaluation" />
                  <Label htmlFor="evaluation" className="cursor-pointer">
                    Evaluation
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="project" id="project" />
                  <Label htmlFor="project" className="cursor-pointer">
                    Project
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Delivery Mode</Label>
              <RadioGroup
                value={formData.deliveryMode}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    deliveryMode: value as "solo" | "group",
                  })
                }
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="solo" id="solo" />
                  <Label htmlFor="solo" className="cursor-pointer">
                    Solo
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="group" id="group" />
                  <Label htmlFor="group" className="cursor-pointer">
                    Group
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                type="number"
                min="1"
                placeholder="Enter position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: Number.parseInt(e.target.value) })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Tabs value={uploadTab} onValueChange={setUploadTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="file" className="flex items-center text-xs sm:text-sm">
                    <FileUp className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                    <span className="sm:inline">Upload File</span>
                    <span className="inline sm:hidden">Upload</span>
                  </TabsTrigger>
                  <TabsTrigger value="url" className="flex items-center text-xs sm:text-sm">
                    <LinkIcon className="mr-1 sm:mr-2 h-3 sm:h-4 w-3 sm:w-4" />
                    <span className="sm:inline">External URL</span>
                    <span className="inline sm:hidden">URL</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="file" className="space-y-4">
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors",
                      file ? "border-primary/50" : "border-muted-foreground/25",
                    )}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*,video/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                    />

                    {!file ? (
                      <div className="flex flex-col items-center">
                        <FilePlus className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mb-2" />
                        <p className="text-xs sm:text-sm font-medium mb-1">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground hidden sm:block">
                          PDF, DOC, PPT, XLS, Images, Videos (max 100MB)
                        </p>
                        <p className="text-xs text-muted-foreground sm:hidden">PDF, Images, Videos, etc.</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        {getFileIcon()}
                        <p className="text-xs sm:text-sm font-medium mt-2 mb-1 truncate max-w-full">{file.name}</p>
                        <p className="text-xs text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    )}
                  </div>

                  {uploadStatus === "uploading" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Uploading...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} className="h-2" />
                    </div>
                  )}

                  {uploadStatus === "success" && (
                    <div className="flex items-center text-sm text-green-600">
                      <Check className="h-4 w-4 mr-2" />
                      <span>Upload complete</span>
                    </div>
                  )}

                  {file && (
                    <div className="flex justify-end">
                      <Button type="button" variant="outline" size="sm" onClick={handleRemoveFile}>
                        <X className="h-4 w-4 mr-2" />
                        Remove File
                      </Button>
                    </div>
                  )}

                  {getFilePreview()}
                </TabsContent>

                <TabsContent value="url" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="contentUrl">Content URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="contentUrl"
                        placeholder="Enter URL to external content (e.g., YouTube, Google Docs)"
                        value={formData.contentUrl}
                        onChange={(e) => setFormData({ ...formData, contentUrl: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Enter a URL to external content like YouTube videos, Google Docs, or other web resources.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {errorMessage && (
              <div className="bg-destructive/10 text-destructive rounded-md p-3 flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{errorMessage}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push(`/modules/${moduleId}`)}>
          Cancel
        </Button>
        <Button type="submit">{initialData?.id ? "Update Item" : "Create Item"}</Button>
      </div>
    </form>
  )
}
