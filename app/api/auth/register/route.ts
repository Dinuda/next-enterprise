import { NextResponse } from "next/server"
import { sendSESEmail } from "lib/aws/ses"
import { sendSNSNotification } from "lib/aws/sns"
import { otpService } from "services/auth/otp.service"
import studentService from "services/student.service"
import userService from "services/user.service"

export async function POST(req: Request) {
  try {
    const { email, phone, name, address, doB, country, studentName } = (await req.json()) as {
      email: string
      phone: string
      name: string
      address: string
      doB: string
      country: string
      studentName: string
    }

    // Create the user
    const user = await userService.create(email, phone, name)

    // Use Promise.all to handle both student creation and OTP generation
    const [, otpResult] = await Promise.all([
      studentService.create(studentName, address, doB, country, user.id),
      otpService.create(user.id),
    ])

    // Extract the OTP code from the otpResult
    const code = otpResult.code // Assuming otpResult has a property 'code'

    sendSESEmail(`Your verification code is ${code}`, user.email, "Verify your account")

    // sendSNSNotification(`Your verification code is ${code}`, user.phone)
    return NextResponse.json({ message: "User created" }, { status: 201 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "User already exists" }, { status: 400 })
  }
}
