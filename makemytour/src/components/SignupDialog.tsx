import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { login, signup } from "../api";
import { setUser } from "@/store";
import { useDispatch } from "react-redux";

const SignupDialog = () => {
  const [issignup, setissigunup] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setopen] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // Error message state

  const dispatch = useDispatch();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (issignup) {
      try {
        const signin = await signup(
          firstname,
          lastname,
          email,
          phoneNumber,
          password
        );
        dispatch(setUser(signin));
        setopen(false);
        clearform();
      } catch (error: any) {
        const msg = error?.message || "Signup failed";
        setErrorMsg(msg); // Show signup error
      }
    } else {
      try {
        const data = await login(email, password);
        dispatch(setUser(data));
        setopen(false);
        clearform();
      } catch (error: any) {
        const msg = error?.message || "Login failed";
        setErrorMsg(msg); // Show login error
      }
    }
  };

  const clearform = () => {
    setFirstname("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
    setErrorMsg(""); // Clear error after successful auth
  };

  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Button className="border text-white" variant="default">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white">
        <DialogHeader>
          <DialogTitle>
            {issignup ? "Create Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription>
            {issignup
              ? "Join us to start booking your travels"
              : "Enter your credentials to access your account"}
          </DialogDescription>
        </DialogHeader>

        {/* Show error message */}
        {errorMsg && (
          <div className="text-red-500 text-sm mb-2 text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleAuth}>
          {issignup && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstname">First Name</Label>
                <Input
                  type="text"
                  id="firstname"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastname">Last Name</Label>
                <Input
                  id="lastname"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="mt-3">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="mt-3">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {issignup && (
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="mt-3">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white mt-4"
            variant="outline"
          >
            {issignup ? "Sign Up" : "Login"}
          </Button>
        </form>

        <div className="text-center text-sm">
          {issignup ? (
            <>
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-blue-500"
                onClick={() => setissigunup(false)}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 text-blue-500"
                onClick={() => setissigunup(true)}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
