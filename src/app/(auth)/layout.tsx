// src/app/(auth)/layout.tsx
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="w-screen h-screen bg-white">
      {children}
    </div>
  )
}
