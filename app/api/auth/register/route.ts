import { NextResponse } from "next/server";
import { sendSESEmail } from "lib/aws/ses";
import { sendSNSNotification } from "lib/aws/sns";
import { otpService } from "services/auth/otp.service";
import studentService from "services/student.service";
import userService from "services/user.service";


export async function POST(req: Request) {
  try {
    const { email, phone, name, address, doB, country, studentName } = await req.json() as { email: string, phone: string, name: string, address: string, doB: string, country: string, studentName: string };
    const user = await userService.create(email, phone, name);
    const student = await studentService.create(studentName, address,doB , country, user.id);
    const code = await otpService.create(user.id);
    
    console.log("code", code);
    console.log("user", user);
    console.log("student", student);
    
    sendSESEmail(
      `Your verification code is ${code}`,
      user.email,
      "Verify your account"
    );

    sendSNSNotification(
      `Your verification code is ${code}`,
      user.phone,
    );
    
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
}

