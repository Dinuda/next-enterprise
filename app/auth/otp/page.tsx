"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { useAuthStore } from "lib/state/auth.store"
import { OTPForm } from "./otp-form"

export default function Otp() {
  const { email, phone } = useAuthStore()

  return (
<div className="flex justify-center items-center p-8 rounded-lg">
    <div className="lg:w-4/12 grid items-center justify-center gap-6">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">OTP Verification</CardTitle>
              <CardDescription>
                We have sent you an OTP as a SMS to {phone} and an email to {email}. Please enter it below to proceed.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <OTPForm />
            </CardContent>
          </Card>
        </div>
    </div>
  )
}
