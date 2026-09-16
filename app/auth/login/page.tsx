/**
 * @file page.tsx
 * @path /app/auth/login/page.tsx
 * @project AgronOS - Precision Agriculture Platform
 * @description Secure authentication endpoint with full backend API alignment.
 * @author AgronOS Engineering Team
 * @copyright © 2026 AgronOS Technologies Inc. All rights reserved.
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sprout, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  // Clean form input state values
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Field and global error state messaging
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset previous errors
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    let hasError = false;

    // Client-side validations
    if (!email.trim()) {
      setEmailError("Please enter your email");
      hasError = true;
    } else if (!email.includes("@")) {
      setEmailError("Please enter a valid email address");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Please enter your password");
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      // Connect to Next.js API endpoint
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handles 401 Unauthorized or other HTTP error responses
        setGeneralError(data.error || "Invalid email or password");
        setIsSubmitting(false);
        return;
      }

      // Route user to main dashboard on success
      router.push("/dashboard/main");
    } catch (err) {
      console.error("Login network error:", err);
      setGeneralError("Network error. Please check your server connection.");
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
          <h1 className="text-2xl font-black text-slate-900">Welcome Back</h1>
          <p className="text-xs font-bold text-slate-600 mt-1">
            Access your regional farm telemetry & crop analytics
          </p>
        </div>

        {/* Global Error Banner */}
        {generalError && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-bold text-center">
            {generalError}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          {/* Email Field Container */}
          <div className="space-y-1.5 text-left">
            <Input
              label="Email Address"
              type="email"
              placeholder="robert.smith@agronos.com"
              value={email}
              onFocus={() => {
                if (emailError) setEmailError("");
                if (generalError) setGeneralError("");
              }}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError("");
                if (generalError) setGeneralError("");
              }}
              className={`font-bold transition-all ${
                emailError || generalError
                  ? "border-2 border-red-500 text-red-600 bg-red-50 focus:border-red-600 focus:ring-red-600"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-emerald-600 focus:ring-emerald-600"
              }`}
            />
            {emailError && (
              <p className="text-xs font-bold text-red-600 pl-1">{emailError}</p>
            )}
          </div>

          {/* Password Field Container */}
          <div className="space-y-1.5 text-left">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••••••"
              value={password}
              onFocus={() => {
                if (passwordError) setPasswordError("");
                if (generalError) setGeneralError("");
              }}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) setPasswordError("");
                if (generalError) setGeneralError("");
              }}
              className={`font-bold transition-all ${
                passwordError || generalError
                  ? "border-2 border-red-500 text-red-600 bg-red-50 focus:border-red-600 focus:ring-red-600"
                  : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-500 focus:border-emerald-600 focus:ring-emerald-600"
              }`}
            />
            {passwordError && (
              <p className="text-xs font-bold text-red-600 pl-1">{passwordError}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
              <input
                type="checkbox"
                className="rounded border-slate-400 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              Remember device
            </label>
            <a href="#" className="font-extrabold text-emerald-700 hover:text-emerald-800 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer mt-2"
          >
            {isSubmitting ? "Authenticating..." : "Sign In to Dashboard"}
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </button>
        </form>

        <p className="text-center text-xs font-bold text-slate-700 mt-8 border-t border-slate-200 pt-6">
          Don&apos;t have an enterprise account?{" "}
          <Link href="/auth/signup" className="font-black text-emerald-700 hover:text-emerald-800 hover:underline ml-1">
            Register Farm
          </Link>
        </p>
      </div>
    </div>
  );
}