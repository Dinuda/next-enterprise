"use client"

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { LoginForm } from "./login-form"

export default function Otp() {
  return (
    <div className="grid gap-6 p-16 md:grid-cols-1">
      <Card className="mx-auto w-full md:w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  )
}
