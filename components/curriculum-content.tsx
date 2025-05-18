"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileDown, ExternalLink, FileText, FileImage, FileVideo, File } from "lucide-react"

interface CurriculumContentProps {
  contentUrl: string
  contentType?: string
}

export function CurriculumContent({ contentUrl, contentType }: CurriculumContentProps) {
  const [isLoading, setIsLoading] = useState(true)

  // Determine content type from URL or provided contentType
  const isVideo =
    contentType?.startsWith("video/") ||
    contentUrl.match(/\.(mp4|webm|ogg)$/i) ||
    contentUrl.includes("youtube.com") ||
    contentUrl.includes("vimeo.com")
  const isPDF = contentType === "application/pdf" || contentUrl.match(/\.pdf$/i)
  const isImage = contentType?.startsWith("image/") || contentUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)
  const isDoc = contentUrl.match(/\.(doc|docx)$/i)
  const isPpt = contentUrl.match(/\.(ppt|pptx)$/i)
  const isExcel = contentUrl.match(/\.(xls|xlsx)$/i)
  const isExternalLink = contentUrl.startsWith("http") && !isPDF && !isImage && !isVideo

  const handleLoad = () => {
    setIsLoading(false)
  }

  const getContentIcon = () => {
    if (isPDF) return <FileText className="h-12 w-12 text-orange-500" />
    if (isImage) return <FileImage className="h-12 w-12 text-blue-500" />
    if (isVideo) return <FileVideo className="h-12 w-12 text-red-500" />
    if (isDoc) return <FileText className="h-12 w-12 text-blue-700" />
    if (isPpt) return <FileText className="h-12 w-12 text-orange-600" />
    if (isExcel) return <FileText className="h-12 w-12 text-green-600" />
    return <File className="h-12 w-12 text-muted-foreground" />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {isVideo && "Video Content"}
          {isPDF && "PDF Document"}
          {isImage && "Image Content"}
          {isDoc && "Word Document"}
          {isPpt && "PowerPoint Presentation"}
          {isExcel && "Excel Spreadsheet"}
          {isExternalLink && "External Resource"}
          {!isVideo && !isPDF && !isImage && !isDoc && !isPpt && !isExcel && !isExternalLink && "Document"}
        </div>
        <div className="flex gap-2">
          {!isExternalLink && (
            <Button variant="outline" size="sm" asChild>
              <a href={contentUrl} download>
                <FileDown className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          )}
          {isExternalLink && (
            <Button variant="outline" size="sm" asChild>
              <a href={contentUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open Link
              </a>
            </Button>
          )}
        </div>
      </div>

      <div className="border rounded-md overflow-hidden bg-muted/30 min-h-[250px] sm:min-h-[400px] flex items-center justify-center">
        {isLoading && <div className="text-muted-foreground">Loading content...</div>}

        {isPDF && (
          <iframe
            src={`${contentUrl}#toolbar=0&navpanes=0`}
            className="w-full h-[300px] sm:h-[450px] md:h-[600px]"
            onLoad={handleLoad}
            title="PDF Document"
          />
        )}

        {isVideo && contentUrl.match(/\.(mp4|webm|ogg)$/i) && (
          <video
            controls
            className="w-full max-h-[300px] sm:max-h-[450px] md:max-h-[600px]"
            onLoadedData={handleLoad}
            poster="/placeholder.svg?height=600&width=800"
          >
            <source src={contentUrl} />
            Your browser does not support the video tag.
          </video>
        )}

        {isVideo && (contentUrl.includes("youtube.com") || contentUrl.includes("youtu.be")) && (
          <iframe
            src={contentUrl.replace("watch?v=", "embed/")}
            className="w-full h-[300px] sm:h-[450px] md:h-[600px]"
            onLoad={handleLoad}
            title="YouTube Video"
            allowFullScreen
          />
        )}

        {isVideo && contentUrl.includes("vimeo.com") && (
          <iframe
            src={`https://player.vimeo.com/video/${contentUrl.split("/").pop()}`}
            className="w-full h-[300px] sm:h-[450px] md:h-[600px]"
            onLoad={handleLoad}
            title="Vimeo Video"
            allowFullScreen
          />
        )}

        {isImage && (
          <img
            src={contentUrl || "/placeholder.svg"}
            alt="Content"
            className="max-w-full max-h-[300px] sm:max-h-[450px] md:max-h-[600px]"
            onLoad={handleLoad}
          />
        )}

        {(isDoc || isPpt || isExcel) && (
          <div className="text-center p-8">
            <div className="flex flex-col items-center mb-4">
              {getContentIcon()}
              <h3 className="text-lg font-medium mt-4">Document Preview</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              This document type cannot be previewed directly. Please download the file to view its contents.
            </p>
            <Button asChild>
              <a href={contentUrl} download>
                <FileDown className="mr-2 h-4 w-4" />
                Download File
              </a>
            </Button>
          </div>
        )}

        {isExternalLink && (
          <div className="text-center p-8">
            <h3 className="text-lg font-medium mb-4">External Content</h3>
            <p className="text-muted-foreground mb-4">
              This content is hosted on an external website. Click the button below to access it.
            </p>
            <Button asChild>
              <a href={contentUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open External Content
              </a>
            </Button>
          </div>
        )}

        {!isPDF && !isVideo && !isImage && !isDoc && !isPpt && !isExcel && !isExternalLink && (
          <div className="text-center p-8">
            <p className="text-muted-foreground">
              Preview not available. Please download the file to view its contents.
            </p>
            <Button className="mt-4" asChild>
              <a href={contentUrl} download>
                <FileDown className="mr-2 h-4 w-4" />
                Download File
              </a>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
