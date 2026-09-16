/**
 * @file route.ts
 * @path /app/api/auth/signup/route.ts
 * @description Backend signup endpoint using standard SQL queries.
 */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "@/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Accept workEmail (from frontend form) or email
    const fullName = body.fullName;
    const email = body.workEmail || body.email; 
    const password = body.password;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { error: "Full name, work email, and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Standard SQL Check for Existing Email
    const existingUserResult = await query(
      "SELECT id FROM users WHERE LOWER(work_email) = $1 LIMIT 1",
      [normalizedEmail]
    );

    if (existingUserResult.rows.length > 0) {
      return NextResponse.json(
        { error: "An account with this work email already exists." },
        { status: 409 }
      );
    }

    // 2. Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Standard SQL Insert Query
    const insertResult = await query(
      `INSERT INTO users (full_name, work_email, password_hash)
       VALUES ($1, $2, $3)
       RETURNING id, full_name, work_email, created_at`,
      [fullName.trim(), normalizedEmail, hashedPassword]
    );

    const newUser = insertResult.rows[0];

    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Signup error details:", error);
    return NextResponse.json(
      { error: "Internal server error during account creation." },
      { status: 500 }
    );
  }
}