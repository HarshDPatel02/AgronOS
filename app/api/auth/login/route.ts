/**
 * @file route.ts
 * @path /app/api/auth/login/route.ts
 * @description Backend login endpoint verifying hashed credentials against Neon DB.
 */

import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "@/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = body.workEmail || body.email;
    const password = body.password;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Fetch user from Neon database
    const userResult = await query(
      "SELECT id, full_name, work_email, password_hash FROM users WHERE LOWER(work_email) = $1 LIMIT 1",
      [normalizedEmail]
    );

    if (userResult.rows.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const user = userResult.rows[0];

    // 2. Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    // 3. Generate JWT Token
    const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
    const token = jwt.sign(
      { userId: user.id, email: user.work_email },
      jwtSecret,
      { expiresIn: "1d" }
    );

    // 4. Return success response
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user.id,
          fullName: user.full_name,
          workEmail: user.work_email,
        },
      },
      { status: 200 }
    );

    // Store auth token in HTTP-only cookie
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 86400, // 1 day
    });

    return response;
  } catch (error: any) {
    console.error("Login error details:", error);
    return NextResponse.json(
      { error: "Internal server error during login." },
      { status: 500 }
    );
  }
}