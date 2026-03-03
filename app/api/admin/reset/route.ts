import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getDB } from "@/lib/db";

export async function POST(req:Request){

  const {token,password}=await req.json()

  const db=await getDB()

  const user=
    await db.collection("users")
    .findOne({
      resetToken:token,
      resetExpires:{ $gt:Date.now() }
    })

  if(!user)
    return NextResponse.json({
      message:"Invalid or expired"
    })

  const hash=
    await bcrypt.hash(password,10)

  await db.collection("users")
    .updateOne(
      {_id:user._id},
      {
        $set:{password:hash},
        $unset:{
          resetToken:"",
          resetExpires:""
        }
      }
    )

  return NextResponse.json({
    message:"Password updated"
  })

}