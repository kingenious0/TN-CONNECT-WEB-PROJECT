"use client";

import { useEffect, useState } from "react";

export default function SessionTimeoutModal({ isOpen, onExtend, onSignOut, countdownSeconds = 60 }) {
  const [secondsLeft, setSecondsLeft] = useState(countdownSeconds);

  useEffect(() => {
    if (!isOpen) {
      setSecondsLeft(countdownSeconds);
      return;
    }

    if (secondsLeft <= 0) {
      onSignOut();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, secondsLeft, onSignOut, countdownSeconds]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop blur */}
      <div 
        className="absolute inset-0 bg-navy/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onExtend}
      />

      {/* Modal Card */}
      <div className="bg-surface-container-lowest border border-surface-border rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl relative z-10 animate-scale-in">
        <div className="text-center space-y-6">
          {/* Warning Icon */}
          <span className="material-symbols-outlined text-6xl text-secondary animate-float">
            pending_actions
          </span>

          <div className="space-y-2">
            <h3 className="font-headline-lg text-2xl text-on-surface">Session Inactivity Alert</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Your session will expire soon due to inactivity. You will be automatically signed out to protect your account security.
            </p>
          </div>

          {/* Time Remaining Indicator */}
          <div className="bg-surface-container-low border border-surface-border p-4 rounded-xl inline-block w-full">
            <p className="text-sm font-label-bold">
              Automatic sign out in:{" "}
              <span className="text-primary font-bold text-lg">
                {secondsLeft} seconds
              </span>
            </p>
            {/* Progress bar representing countdown */}
            <div className="w-full bg-surface-border h-1.5 rounded-full mt-3 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-1000 ease-linear shadow-[0_0_8px_rgba(188,1,0,0.3)]"
                style={{ width: `${(secondsLeft / countdownSeconds) * 100}%` }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              type="button"
              onClick={onSignOut}
              className="btn-secondary w-full justify-center order-2 sm:order-1"
            >
              Sign Out
            </button>
            <button
              type="button"
              onClick={onExtend}
              className="btn-primary w-full justify-center order-1 sm:order-2"
            >
              <span className="material-symbols-outlined">verified_user</span>
              Keep Me Signed In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
