"use client"

import { FC, useEffect, useState } from "react"
import { MoonIcon, SunIcon } from "lucide-react"

import { Button } from "../ui/button"

interface DarkModeProps {
  className?: string
}

export const DarkMode: FC<DarkModeProps> = ({ className }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    setIsDarkMode(getDefaultDarkMode())
  }, [])

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark")
    setIsDarkMode((v) => !v)
  }

  return (
    <Button
      className={className}
      onClick={() => toggleDarkMode()}
      variant="ghost"
      size="icon"
    >
      {isDarkMode ? <SunIcon /> : <MoonIcon />}
      <span className="sr-only">
        {isDarkMode ? "Disable dark mode" : "Enable dark mode"}
      </span>
    </Button>
  )
}

const getDefaultDarkMode = () => {
  return (
    document.documentElement.classList.contains("dark") ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
}
