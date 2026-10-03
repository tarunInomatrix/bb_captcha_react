"use client";

import React, { useState } from "react";

declare global {
  interface Window {
    onBotbusterSuccess?: () => void;
    initBotbusterSDK?: (email: string, options: unknown, flag: boolean) => void;
  }
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const dataApiKey =
    process.env.NEXT_PUBLIC_BOTBUSTER_API_KEY ||
    "3ee57ddd-2946-449a-9908-8a28d7ce3960";
  const dataActionId = "user-auth-login-div";
  const dataEmailElement = "auth-email";
  const currentURL = typeof window !== "undefined" ? window.location.href : "";

  const injectCdnScript = (userEmail: string, submitCallback: () => void) => {
    if (typeof window === "undefined") return;

    // 1. Assign the callback to global window so script can invoke it
    window.onBotbusterSuccess = submitCallback;

    const existingScript = document.getElementById("botbuster-script") as HTMLScriptElement;

    if (existingScript) {
      // 2. Script already injected! Update data attribute and trigger manual init
      existingScript.setAttribute("data-email", userEmail);
      if (typeof window.initBotbusterSDK === "function") {
        window.initBotbusterSDK(userEmail, null, true);
      }
      return;
    }

    // 3. Inject script for the first time
    const script = document.createElement("script");
    script.id = "botbuster-script";
    script.src =
      "https://botbuste.b-cdn.net/prod/quick-check-inject-prod.js";
    script.async = true;
    script.setAttribute("data-api-key", dataApiKey);
    script.setAttribute("data-email", userEmail);
    script.setAttribute("data-loaded-captcha-url", currentURL);
    script.setAttribute("data-action-id", dataActionId);
    script.setAttribute("data-email-element", dataEmailElement);
    script.setAttribute("data-web-url", currentURL);

    document.body.appendChild(script);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsVerifying(true);
    setIsSuccess(false);

    injectCdnScript(email, () => {
      setIsVerifying(false);
      setIsSuccess(true);
      console.log("Botbuster verification successful for:", email);
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f9fafc] px-4 py-12 selection:bg-blue-100 selection:text-blue-900">
      <div className="w-full max-w-[440px]">
        {/* Header */}
        <div className="mb-7 text-center">
          <h1 className="text-[28px] sm:text-[32px] font-bold tracking-[-0.02em] text-[#111827]">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm text-[#4b5563]">
            Don&apos;t have an account?{" "}
            <a
              href="#signup"
              className="font-medium text-[#155dfb] hover:text-[#1d4ed8] hover:underline transition-colors"
            >
              Sign up
            </a>
          </p>
        </div>

        {/* Card */}
        <div className="w-full rounded-2xl bg-white p-7 sm:p-8 shadow-[0_10px_35px_-5px_rgba(0,0,0,0.06),0_2px_8px_-2px_rgba(0,0,0,0.03)] border border-slate-100/80">
          {isSuccess && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200/80 px-3.5 py-2.5 text-xs sm:text-sm font-medium text-emerald-800 animate-in fade-in slide-in-from-top-1">
              <svg className="h-4 w-4 shrink-0 text-emerald-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span>Botbuster verified successfully! Signing in...</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="auth-email"
                className="block text-sm font-semibold text-[#111827] mb-1.5"
              >
                Email address
              </label>
              <div className="relative flex items-center">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
                  <svg
                    className="h-5 w-5 text-[#9ca3af]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <input
                  id="auth-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-11 rounded-lg border border-[#e5e7eb] bg-white pl-11 pr-3.5 text-sm text-[#111827] placeholder-[#9ca3af] transition-colors focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="!mt-5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-[#111827] mb-1.5"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full h-11 rounded-lg border border-[#e5e7eb] bg-white pl-11 pr-3.5 text-sm text-[#111827] placeholder-[#9ca3af] transition-colors focus:border-[#2563eb] focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20"
                />
              </div>
            </div>

            {/* Sign in Button */}
            <div className="!mt-6">
              <button
                id="user-auth-login-div"
                type="submit"
                disabled={isVerifying}
                className="w-full h-11 rounded-lg bg-[#18181b] text-sm font-medium text-white shadow-sm transition-all hover:bg-[#27272a] active:scale-[0.99] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Verifying...</span>
                  </>
                ) : (
                  <span>Sign in</span>
                )}
              </button>
            </div>

            {/* Botbuster Captcha Container */}
            <div id="botbuster-container" className="empty:hidden" />
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-[#e5e7eb]" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-[#6c7485] font-normal text-sm">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="space-y-3">
            {/* Google */}
            <button
              type="button"
              className="w-full h-11 flex items-center justify-center gap-3 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#111827] transition-all hover:bg-slate-50/80 hover:border-[#d1d5db] active:scale-[0.99] cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              className="w-full h-11 flex items-center justify-center gap-3 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#111827] transition-all hover:bg-slate-50/80 hover:border-[#d1d5db] active:scale-[0.99] cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="12" fill="#1877F2" />
                <path
                  fill="#FFFFFF"
                  d="M14.5 12h-2v7h-3v-7h-1.5v-2.5h1.5v-1.6c0-2.1 1.2-3.4 3.3-3.4.9 0 1.7.1 2 .1v2.3h-1.2c-1 0-1.1.5-1.1 1.2v1.4h2.4l-.4 2.5z"
                />
              </svg>
              <span>Continue with Facebook</span>
            </button>

            {/* Instagram */}
            <button
              type="button"
              className="w-full h-11 flex items-center justify-center gap-3 rounded-lg border border-[#e5e7eb] bg-white text-sm font-medium text-[#111827] transition-all hover:bg-slate-50/80 hover:border-[#d1d5db] active:scale-[0.99] cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433" />
                    <stop offset="30%" stopColor="#e6683c" />
                    <stop offset="60%" stopColor="#dc2743" />
                    <stop offset="85%" stopColor="#cc2366" />
                    <stop offset="100%" stopColor="#bc1888" />
                  </linearGradient>
                </defs>
                <rect
                  x="2.5"
                  y="2.5"
                  width="19"
                  height="19"
                  rx="5.5"
                  stroke="url(#ig-grad)"
                  strokeWidth="1.8"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="4.2"
                  stroke="url(#ig-grad)"
                  strokeWidth="1.8"
                />
                <circle cx="17.2" cy="6.8" r="1.1" fill="url(#ig-grad)" />
              </svg>
              <span>Continue with Instagram</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
