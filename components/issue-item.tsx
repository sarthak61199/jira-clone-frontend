"use client";

import { useModalStore } from "@/hooks/useModalStore";
import dayjs from "dayjs";

interface IssueItemProps {
  id: number;
  title: string;
  description: string;
  progressId: number;
  priorityId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  priority: {
    id: number;
    label: string;
  };
  progress: {
    id: number;
    label: string;
  };
  user: {
    id: number;
    name: string;
  };
}

export default function IssueItem({
  id,
  title,
  createdAt,
  updatedAt,
  priority,
  progress,
  user,
  description,
  progressId,
  userId,
  priorityId,
}: IssueItemProps) {
  const { onOpen } = useModalStore();

  return (
    <div
      onClick={() =>
        onOpen("editIssue", {
          id,
          title,
          createdAt,
          updatedAt,
          priority,
          progress,
          user,
          progressId,
          userId,
          priorityId,
          description,
        })
      }
      className="bg-slate-900 py-3 px-6 rounded-sm flex justify-between items-center cursor-pointer hover:bg-slate-900/60 transition-all"
    >
      <div className="space-y-2">
        <h4 className="text-2xl">{title}</h4>
        <p className="text-sm">{user.name}</p>
      </div>
      <p>{progress.label}</p>
      <p>{priority.label}</p>
      <div className="flex flex-col text-sm text-gray-400">
        <span>{dayjs(createdAt).format("DD/MM/YYYY, HH:mm:ss")}</span>
        <span>{dayjs(updatedAt).format("DD/MM/YYYY, HH:mm:ss")}</span>
      </div>
    </div>
  );
}
