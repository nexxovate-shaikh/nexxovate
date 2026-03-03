import { NextResponse } from "next/server";
import crypto from "crypto";
import { getDB } from "@/lib/db";
import { sendEmail } from "../../../../lib/email";

export async function POST(req:Request){

  const {email}=await req.json()

  const db=await getDB()

  const user=
    await db.collection("users")
    .findOne({email})

  if(!user)
    return NextResponse.json({
      message:"If email exists, reset link sent"
    })

  const token=
    crypto.randomBytes(32).toString("hex")

  await db.collection("users").updateOne(
    {email},
    {
      $set:{
        resetToken:token,
        resetExpires:Date.now()+3600000
      }
    }
  )

  const link=
    `${process.env.NEXT_PUBLIC_SITE_URL}/admin/reset?token=${token}`

  await sendEmail(
    email,
    "Reset your Nexxovate password",
    `Click to reset password:\n${link}`
  )

  return NextResponse.json({
    message:"Reset link sent"
  })

}