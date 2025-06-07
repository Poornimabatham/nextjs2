import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  message: z.string().min(1, "Message is required"),
});
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const result = ContactSchema.safeParse(body)

  if (!result.success) {
    const errorMessages = result.error.errors.map(e => e.message)
    return NextResponse.json({ message: errorMessages.join(', ') }, { status: 400 })
  }

  await prisma.user.create({ data: result.data })

  return NextResponse.json({ message: 'Form submitted successfully' }, { status: 200 })
}

