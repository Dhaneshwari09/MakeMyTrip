import React, { useEffect, useState } from "react";
import SignupDialog from "./SignupDialog";
import { LogOut, Plane, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux"; // ✅ useDispatch was missing
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { clearUser } from "@/store"; // ✅ Make sure this action is exported correctly
import { useRouter } from "next/router"; // ✅ Fix: useRouter, not "userRouter"

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter(); // ✅ Corrected hook name

  // ✅ Optional: client-only rendering to prevent hydration issues
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const logout = () => {
    dispatch(clearUser());
    router.push("/"); // redirect after logout
  };

  return (
    <header className="bg-black/20 backdrop-blur-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-white">
          <Plane className="ml-10 w-8 h-8 text-red-500" />
          <span className="text-2xl font-bold text-white">MakeMyTour</span>
        </div>
        <div className="mr-10 flex items-center space-x-4">
          {!isClient ? null : user ? (
            <>
              {user.role === "ADMIN" && <Button variant="default" onClick={() => router.push("/admin")}>ADMIN</Button>}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Avatar>
                      <AvatarFallback className="text-black">
                        {typeof user?.firstname === "string" &&
                        user.firstname.length > 0
                          ? user.firstname.charAt(0).toUpperCase()
                          : "?"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div>
                      <p>{user.firstname}</p>
                      <p>{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>LogOut</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <SignupDialog />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
