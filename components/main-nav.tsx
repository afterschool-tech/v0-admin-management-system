"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserRound, Building, Users, BookOpen, Layers, FileText, Award, Menu, Home } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: Home,
    },
    {
      name: "Students",
      href: "/students",
      icon: UserRound,
    },
    {
      name: "Organizations",
      href: "/organizations",
      icon: Building,
    },
    {
      name: "Parents",
      href: "/parents",
      icon: Users,
    },
    {
      name: "Programs",
      href: "/programs",
      icon: BookOpen,
    },
    {
      name: "Modules",
      href: "/modules",
      icon: Layers,
    },
    {
      name: "Curriculum",
      href: "/curriculum",
      icon: FileText,
    },
    {
      name: "Achievements",
      href: "/achievements",
      icon: Award,
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">AfterSchool Tech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            const Icon = item.icon

            return (
              <Button
                key={item.href}
                asChild
                variant={isActive ? "default" : "ghost"}
                size="sm"
                className={cn("h-9", isActive && "bg-primary text-primary-foreground")}
              >
                <Link href={item.href} className="flex items-center">
                  {Icon && <Icon className="mr-2 h-4 w-4" />}
                  {item.name}
                </Link>
              </Button>
            )
          })}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[250px] sm:w-[300px]">
            <div className="flex flex-col gap-6 py-4">
              <Link href="/" className="flex items-center space-x-2 px-2" onClick={() => setOpen(false)}>
                <span className="font-bold text-xl">AfterSchool Tech</span>
              </Link>
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
                  const Icon = item.icon

                  return (
                    <Button
                      key={item.href}
                      asChild
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn("justify-start h-10 px-4", isActive && "bg-primary text-primary-foreground")}
                      onClick={() => setOpen(false)}
                    >
                      <Link href={item.href} className="flex items-center">
                        {Icon && <Icon className="mr-3 h-5 w-5" />}
                        {item.name}
                      </Link>
                    </Button>
                  )
                })}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
