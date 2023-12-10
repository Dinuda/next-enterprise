"use client"

import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card"
import { LoginForm } from "./login-form"

export default function Otp() {

  return (
<div className="flex justify-center items-center p-8 rounded-lg">
    <div className="grid items-center justify-center gap-6">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Login</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <LoginForm />
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
