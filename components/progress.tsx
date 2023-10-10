"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

interface ProgressProps {
  onValueChange: (value: string) => void;
  defaultValue: string;
}

interface ProgressList {
  id: number;
  label: string;
}

export default function Progress({
  onValueChange,
  defaultValue,
}: ProgressProps) {
  const { data: sessionData } = useSession();

  const [progressList, setProgressList] = useState<ProgressList[]>([]);

  const fetchProgressList = async () => {
    const { data } = await axios.get("http://localhost:3001/issue/progress", {
      headers: {
        authorization: `Bearer ${sessionData?.user?.accessToken}`,
      },
    });
    setProgressList(data);
  };

  useEffect(() => {
    fetchProgressList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Progress" />
      </SelectTrigger>
      <SelectContent>
        {progressList.length
          ? progressList.map((item) => (
              <SelectItem value={item.id.toString()} key={item.id}>
                {item.label}
              </SelectItem>
            ))
          : null}
      </SelectContent>
    </Select>
  );
}
