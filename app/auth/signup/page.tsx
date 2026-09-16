/**
 * @file page.tsx
 * @path /app/auth/signup/page.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Enterprise account registration view with red warning text inside empty fields on error.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Tracks if input fields currently contain active error messages
  const [isFullNameError, setIsFullNameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Full Name validation
    if (!fullName.trim() || isFullNameError) {
      setFullName("Please enter your full name");
      setIsFullNameError(true);
      hasError = true;
    }

    // Email validation
    if (!email.trim() || isEmailError) {
      setEmail("Please enter your email");
      setIsEmailError(true);
      hasError = true;
    } else if (!email.includes("@")) {
      setEmail("Please enter a valid email");
      setIsEmailError(true);
      hasError = true;
    }

    // Password validation
    if (!password || isPasswordError) {
      setPassword("Please enter your password");
      setIsPasswordError(true);
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      // Connect to Next.js backend API
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          workEmail: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setEmail("Email already exists");
          setIsEmailError(true);
        } else {
          alert(data.error || "An error occurred during sign up.");
        }
        setIsSubmitting(false);
        return;
      }

      // Redirect to main home page upon successful registration
      router.push("/");
    } catch (err) {
      console.error("Signup network error:", err);
      alert("Network error. Please check your server connection.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-100 text-slate-900 font-sans">
      <div className="w-full max-w-md border rounded-3xl p-8 shadow-xl bg-white border-slate-300">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <div className="bg-emerald-600 text-white p-2.5 rounded-2xl shadow-md">
              <Sprout className="w-6 h-6" />
            </div>
            <span className="text-2xl font-black tracking-wide text-slate-900">
              Agron<span className="text-emerald-600">OS</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-slate-900">Create Producer Account</h1>
          <p className="text-xs font-bold text-slate-600 mt-1">
            Setup multi-field management & AI yield modeling
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5" noValidate>
          {/* Full Name Field */}
          <div className="space-y-1.5 text-left">
            <Input
              label="Full Name"
              type="text"
              placeholder="Robert Smith"
              value={fullName}
              onFocus={() => {
                if (isFullNameError) {
                  setFullName("");
                  setIsFullNameError(false);
                }
              }}
              onChange={(e) => {
                setFullName(e.target.value);
                if (isFullNameError) setIsFullNameError(false);
              }}
              className={`font-bold transition-all ${
                isFullNameError
                  ? "border-2 border-red-500 text-red-600 bg-red-50 focus:border-red-600 focus:ring-red-600"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-emerald-600 focus:ring-emerald-600"
              }`}
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5 text-left">
            <Input
              label="Work Email"
              type={isEmailError ? "text" : "email"}
              placeholder="robert.smith@agronos.com"
              value={email}
              onFocus={() => {
                if (isEmailError) {
                  setEmail("");
                  setIsEmailError(false);
                }
              }}
              onChange={(e) => {
                setEmail(e.target.value);
                if (isEmailError) setIsEmailError(false);
              }}
              className={`font-bold transition-all ${
                isEmailError
                  ? "border-2 border-red-500 text-red-600 bg-red-50 focus:border-red-600 focus:ring-red-600"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-emerald-600 focus:ring-emerald-600"
              }`}
            />
          </div>

          {/* Password Field */}
          <div className="space-y-1.5 text-left">
            <Input
              label="Password"
              type={isPasswordError ? "text" : "password"}
              placeholder="••••••••••••"
              value={password}
              onFocus={() => {
                if (isPasswordError) {
                  setPassword("");
                  setIsPasswordError(false);
                }
              }}
              onChange={(e) => {
                setPassword(e.target.value);
                if (isPasswordError) setIsPasswordError(false);
              }}
              className={`font-bold transition-all ${
                isPasswordError
                  ? "border-2 border-red-500 text-red-600 bg-red-50 focus:border-red-600 focus:ring-red-600"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-emerald-600 focus:ring-emerald-600"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer mt-2"
          >
            {isSubmitting ? "Creating Account..." : "Create AgronOS Account"}
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </form>

        <p className="text-center text-xs font-bold text-slate-700 mt-8 border-t border-slate-200 pt-6">
          Already registered?{" "}
          <Link href="/auth/login" className="font-black text-emerald-700 hover:text-emerald-800 hover:underline ml-1">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}