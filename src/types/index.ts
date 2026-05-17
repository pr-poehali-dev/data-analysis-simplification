import type { ReactNode } from "react"

export interface Section {
  id: string
  title: ReactNode
  subtitle?: ReactNode
  content?: string
  extra?: ReactNode
  showButton?: boolean
  buttonText?: string
}

export interface SectionProps extends Section {
  isActive: boolean
}