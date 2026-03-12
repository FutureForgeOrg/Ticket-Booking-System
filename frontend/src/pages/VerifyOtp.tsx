import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OtpFormData } from "../schemas/auth.schema";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useVerifyOtp, useResendOtp } from "../hooks/useUserAuth";
import { useState, useEffect } from "react";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const pendingEmail = useAuthStore((s) => s.pendingEmail);
  const [resendTimer, setResendTimer] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const verifyOtpMutation = useVerifyOtp();
  const resendOtpMutation = useResendOtp();

  // redirect if no pending email (user navigated directly without signup)
  useEffect(() => {
    if (!pendingEmail) {
      navigate("/signup", { replace: true });
    }
  }, [pendingEmail, navigate]);

  // redirect after successful OTP verification
  useEffect(() => {
    if (verifyOtpMutation.isSuccess) {
      navigate("/dashboard", { replace: true });
    }
  }, [verifyOtpMutation.isSuccess, navigate]);

  // won't render if no pending email or if OTP verification is successful
  if (!pendingEmail || verifyOtpMutation.isSuccess) {
    return null;
  }

  const onSubmit = (data: OtpFormData) => {
    verifyOtpMutation.mutate({
      email: pendingEmail,
      otp: data.otp,
    });
  };

  const handleResendOtp = async () => {
    try {
      await resendOtpMutation.mutateAsync({ email: pendingEmail });
      setResendSuccess(true);
      setResendTimer(60);

      const interval = setInterval(() => {
        setResendTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setTimeout(() => setResendSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="w-full max-w-md bg-surface p-8 rounded-xl shadow-soft border border-border">
        <h2 className="text-2xl font-semibold text-text-primary mb-2 text-center">
          Verify Your Email
        </h2>
        <p className="text-text-secondary text-center mb-6 text-sm">
          We've sent a 6-digit OTP to <br />
          <span className="font-medium text-text-primary">{pendingEmail}</span>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* OTP Input */}
          <div>
            <label className="block text-text-primary text-sm font-medium mb-2">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="000000"
              maxLength={6}
              {...register("otp")}
              className="w-full p-3 rounded-xl bg-canvas border border-border text-text-primary text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
            {errors.otp && (
              <p className="text-danger text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          {/* Error Message */}
          {verifyOtpMutation.isError && (
            <p className="text-danger text-sm text-center bg-danger/10 p-3 rounded-lg">
              {(verifyOtpMutation.error as any)?.response?.data?.message ||
                "Failed to verify OTP"}
            </p>
          )}

          {/* Success Message */}
          {resendSuccess && (
            <p className="text-success text-sm text-center bg-success/10 p-3 rounded-lg">
              OTP resent successfully!
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={verifyOtpMutation.isPending}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-black font-medium disabled:opacity-50"
          >
            {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm mb-3">
            Didn't receive the code?
          </p>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendTimer > 0 || resendOtpMutation.isPending}
            className="text-primary hover:text-primary-hover font-medium disabled:text-text-secondary disabled:cursor-not-allowed"
          >
            {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend OTP"}
          </button>

          {resendOtpMutation.isError && (
            <p className="text-danger text-sm mt-2">
              Failed to resend OTP. Please try again.
            </p>
          )}
        </div>

        {/* Back to Signup */}
        <div className="text-center mt-6 pt-6 border-t border-border">
          <button
            type="button"
            onClick={() => navigate("/signup")}
            className="text-text-secondary hover:text-text-primary text-sm"
          >
            Back to Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
