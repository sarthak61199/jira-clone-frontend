"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useModalStore } from "@/hooks/useModalStore";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CreateIssueButton() {
  const pathname = usePathname();
  const { status } = useSession();
  const { onOpen } = useModalStore();

  const isDashboard = pathname.includes("dashboard");

  if (!isDashboard || status === "unauthenticated") {
    return null;
  }

  return (
    <Button onClick={() => onOpen("createIssue")}>
      <Plus className="mr-2" />
      Create an Issue
    </Button>
  );
}
