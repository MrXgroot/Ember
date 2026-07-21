import React from "react";
import { cn } from "@/shared/integrations/cn";
import { GoogleLogin } from "@react-oauth/google";
export function GoogleButton({ onSuccess, isPending, className }) {
  return (
    <GoogleLogin
      onSuccess={(response) => onSuccess(response.credential)}
      onError={() => {
        console.error("Google Login Failed");
      }}
    />
  );
}
// <button
//   type="button"
//   disabled={isPending}
//   onClick={onContinue}
//   className={cn(
//     "w-full h-10 px-4 rounded-app-md text-xs font-semibold flex items-center justify-center gap-3 transition-all border border-app-border active:scale-[0.99]",
//     "bg-app-bg text-content-primary hover:bg-app-surface hover:border-zinc-700/60",
//     "disabled:opacity-50 disabled:pointer-events-none disabled:transform-none",
//     className,
//   )}
// >
//   {/* Embedded flat SVG Google Icon */}
//   <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
//     <path
//       fill="#EA4335"
//       d="M5.266 9.765A7.077 7.077 0 0112 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115z"
//     />
//     <path
//       fill="#4285F4"
//       d="M16.04 15.345c-1.077.736-2.427 1.164-4.04 1.164-2.955 0-5.464-1.99-6.355-4.673L1.605 14.96C3.577 18.877 7.63 21.545 12 21.545c3.155 0 5.99-1.055 8.127-2.873l-4.086-3.327z"
//     />
//     <path
//       fill="#FBBC05"
//       d="M5.645 11.836A7.012 7.012 0 015.645 9.71L1.62 6.59A11.96 11.96 0 000 12c0 1.92.455 3.737 1.255 5.355l4.39-3.518z"
//     />
//     <path
//       fill="#34A853"
//       d="M23.545 12.291c0-.818-.073-1.609-.209-2.373H12v4.51h6.473a5.54 5.54 0 01-2.409 3.636l4.086 3.327c2.39-2.2 3.773-5.445 3.773-9.1z"
//     />
//   </svg>
//   <span>{isPending ? "Connecting..." : "Continue with Google"}</span>
// </button>
