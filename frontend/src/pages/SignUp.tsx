import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormData } from "../schemas/auth.schema";
import { Link } from "react-router-dom";
import { useSignup } from "../hooks/useUserAuth";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const signupMutation = useSignup();

  const onSubmit = (data: SignupFormData) => {
    signupMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-canvas">
      <div className="w-full max-w-md bg-surface p-8 rounded-xl shadow-soft border border-border">
        <h2 className="text-2xl font-semibold text-text-primary mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Name */}
          <div>
            <input
              placeholder="Full Name"
              {...register("name")}
              className="w-full p-3 rounded-xl bg-canvas border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.name && (
              <p className="text-danger text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full p-3 rounded-xl bg-canvas border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.email && (
              <p className="text-danger text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register("password")}
              className="w-full p-3 rounded-xl bg-canvas border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.password && (
              <p className="text-danger text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              placeholder="Phone (10 digits)"
              {...register("phone")}
              className="w-full p-3 rounded-xl bg-canvas border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.phone && (
              <p className="text-danger text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <input
              placeholder="City"
              {...register("city")}
              className="w-full p-3 rounded-xl bg-canvas border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.city && (
              <p className="text-danger text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div>
            <input
              placeholder="State"
              {...register("state")}
              className="w-full p-3 rounded-xl bg-canvas border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
            {errors.state && (
              <p className="text-danger text-sm mt-1">{errors.state.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <select
              defaultValue=""
              {...register("gender")}
              className="w-full p-3 rounded-xl bg-canvas border border-border text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {errors.gender && (
              <p className="text-danger text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={signupMutation.isPending}
            className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-black font-medium"
          >
            {signupMutation.isPending ? "Creating account..." : "Sign Up"}
          </button>

          {signupMutation.isError && (
            <p className="text-danger text-sm text-center">
              Failed to register user
            </p>
          )}
        </form>

        <p className="text-text-secondary text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
