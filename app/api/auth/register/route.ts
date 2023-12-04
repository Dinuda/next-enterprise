import { NextResponse } from "next/server";
import { sendSESEmail } from "lib/aws/ses";
import { sendSNSNotification } from "lib/aws/sns";
import { otpService } from "services/auth/otp.service";
import { create } from "services/parentuser.service";


export async function POST(req: Request) {
  try {
    const { email, phone, name } = await req.json() as { email: string, phone: string, name: string };
    const user = await create(email, phone, name);

    const code = await otpService.create(user.id);
    
    sendSESEmail(
      `Your verification code is ${code}`,
      user.email,
      "Verify your account"
    );

    sendSNSNotification(
      `Your verification code is ${code}`,
      user.phone,
    );
    
    return NextResponse.redirect("/auth/verify");
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
}

