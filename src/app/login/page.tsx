"use client";

import Image from "next/image";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "../../style/login.css";
import { decodeToken, loginUser, registerUser } from "@/services/authService";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const { setUser, setIsLoading } = useUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      if (signState === "Sign In") {
        const res = await loginUser(data);
        if (res.success) {
          toast.success(res.message || "Login successful");

          const decodedToken: any = await decodeToken(res.data.accessToken);
          await setUser(decodedToken);
          router.push("/");
        } else {
          toast.error(res.message || "Login failed");
        }
      } else {
        const res = await registerUser(data);
        if (res.success) {
          toast.success(res.message || "Registration successful");
          const decodedToken: any = await decodeToken(res.data.accessToken);
          await setUser(decodedToken);
          router.push("/");
          reset();
        } else {
          toast.error(res.message || "Registration failed");
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <Image
        src={logo}
        alt="login"
        width={100}
        height={10}
        className="login-logo"
      />

      <div className="login-form">
        <h1>{signState}</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          {signState === "Sign up" && (
            <input
              type="text"
              placeholder="your name"
              {...register("name", {
                required: signState === "Sign up" ? "Name is required" : "",
              })}
            />
          )}
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.name.message as string}
            </p>
          )}
          <input
            type="email"
            placeholder="your email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
          <input
            type="password"
            placeholder="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message as string}
            </p>
          )}
          <button type="submit">
            {signState === "Sign In" ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="form-switch">
          {signState === "Sign In" ? (
            <div>
              <Link href="/forgot-password" className="forgot-password">
                Forgot Password?{" "}
              </Link>
              <p>
                New Here?{" "}
                <span onClick={() => setSignState("Sign up")}>Sign Up</span>
              </p>
            </div>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => setSignState("Sign In")}>Sign In</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
