"use client";

import Image from "next/image";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import "../../style/login.css";
import { loginUser, registerUser } from "@/services/authService";
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
    if (signState === "Sign In") {
      try {
        const res = await loginUser(data);
        console.log(res);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.message);
          router.push("/");
          setUser(res.data);
          setIsLoading(false);
          reset();
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.data.message || "Something went wrong");
      }
    } else {
      try {
        const res = await registerUser(data);
        console.log(res);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success(res.message);
          reset();
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.data.message || "Something went wrong");
      }
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
