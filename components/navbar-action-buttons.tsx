"use client";

import { useModalStore } from "@/hooks/useModalStore";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Loader2, Settings, LogOut } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function NavbarActionButtons() {
  const pathname = usePathname();
  const { data, status } = useSession();
  const { onOpen } = useModalStore();

  if (status === "loading") {
    return <Loader2 className="animate-spin" />;
  }

  const isDashboard = pathname.includes("dashboard");

  const nameArr = data?.user?.name?.split(" ");
  const initials = nameArr && nameArr[0][0] + nameArr[0][1];

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
    toast.success("Successfully Logged out.");
  };

  return (
    <>
      {isDashboard && status === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarFallback>{initials?.toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href="/dashboard/settings">
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2" />
                Settings
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 text-rose-500" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="space-x-6">
          <Button onClick={() => onOpen("login")}>Log In</Button>
          <Button variant="secondary" onClick={() => onOpen("register")}>
            Sign Up
          </Button>
        </div>
      )}
    </>
  );
}
