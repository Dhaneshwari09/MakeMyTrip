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
import { error } from "console";

const SignupDialog = () => {
  const [issignup, setissigunup] = useState(true);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (issignup) {
      try {
        const signin = await signup(
          firstname,
          lastname,
          email,
          phoneNumber,
          password,
          
        );
        dispatch(setUser(signin));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        //console.log(email, password);
        const data = await login(email, password);
        dispatch(setUser(data));
        setopen(false);
        clearform();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearform = () => {
    setFirstname("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        <Button className="border text-white" variant="default">
          Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-black">
        <DialogHeader>
          <DialogTitle>
            {issignup ? "Create Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription>
            {issignup
              ? "Join us to start booking your travles"
              : "Enter your credentials to access your account"}
          </DialogDescription>
        </DialogHeader>
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
            <Label htmlFor="email" className=" mt-3">
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
            <Label htmlFor="password" className=" mt-3">
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
              <Label htmlFor="phonNumber" className=" mt-3">
                Phone Number
              </Label>
              <Input
                id="phonNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white mt-3"
            variant="outline"
          >
            {issignup ? "Sign Up" : "Login"}
          </Button>
        </form>
        <div className="text-center text-sm ">
          {issignup ? (
            <>
              Already hav an account?
              <Button
                variant="link"
                className="p-0 text-blue-600"
                onClick={() => setissigunup(false)}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              Don't have an account?
              <Button
                variant="link"
                className="p-0 text-blue-600"
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
