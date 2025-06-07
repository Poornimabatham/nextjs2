import { NextRequest, NextResponse } from "next/server";
// These are used to handle HTTP requests/responses in a Next.js API route

import { PrismaClient } from "../../../lib/generated/prisma"; 
// Importing the Prisma Client generated in a custom path (not the default @prisma/client path)

import { z } from "zod";
// Zod is a schema validation library for validating and parsing data


const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),       
  // Validates that name is a string with at least 1 character

  email: z.string().email("Invalid email"),           
  // Validates that email is a valid email format (e.g., someone@example.com)

  message: z.string().min(1, "Message is required"),  
  // Validates that message is a non-empty string (minimum 1 character)
});


const prisma = new PrismaClient();
// Creates a Prisma client instance to interact with your database

export async function POST(req: NextRequest) {
  // Parse JSON from request body
  const body = await req.json();

  // Validates the parsed JSON data using Zod's safeParse method
  const result = ContactSchema.safeParse(body);

  // If validation fails, return 400 with error messages
  if (!result.success) {
    const errorMessages = result.error.errors.map(e => e.message);
    return NextResponse.json({ message: errorMessages.join(", ") }, { status: 400 });
  }

  // Insert validated data into the correct table
  // CHANGE THIS: Use 'contact' (or your actual table) instead of 'user'
  await prisma.contact.create({ data: result.data });

  // Return success response
  return NextResponse.json({ message: "Form submitted successfully" }, { status: 200 });
}
