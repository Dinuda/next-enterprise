"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { OTPForm } from "./otp-form"

export default function OTP(hiddenEmail: string, hiddenPhone: string) {
  return (
    <div className="hidden items-start justify-center gap-6 rounded-lg p-8 md:grid">
      <div className="col-span-2 grid items-start gap-6 lg:col-span-1">
        <div className="flex items-center justify-center [&>div]:w-full">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">OTP Verification</CardTitle>
              <CardDescription>
                {/* We have sent you an OTP as a SMS to {hiddenPhone} and an email to {hiddenEmail}. Please enter it below to proceed. */}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <OTPForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
