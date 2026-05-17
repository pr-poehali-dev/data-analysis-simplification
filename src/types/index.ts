import type { ReactNode } from "react"

export interface Section {
  id: string
  title: ReactNode
  subtitle?: ReactNode
  content?: string
  extra?: ReactNode
  centered?: boolean
  showButton?: boolean
  buttonText?: string
}

export interface SectionProps extends Section {
  isActive: boolean
}