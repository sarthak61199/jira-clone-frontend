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

interface PriorityProps {
  onValueChange: () => void;
  defaultValue: string;
}

interface PriorityList {
  id: number;
  label: string;
}

export default function Priority({
  onValueChange,
  defaultValue,
}: PriorityProps) {
  const { data: sessionData } = useSession();

  const [priorityList, setPriorityList] = useState<PriorityList[]>([]);

  const fetchPriorityList = async () => {
    const { data } = await axios.get("http://localhost:3001/issue/priority", {
      headers: {
        authorization: `Bearer ${sessionData?.user?.accessToken}`,
      },
    });
    setPriorityList(data);
  };

  useEffect(() => {
    fetchPriorityList();
  }, []);

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        {priorityList.length
          ? priorityList.map((item) => (
              <SelectItem value={item.id.toString()} key={item.id}>
                {item.label}
              </SelectItem>
            ))
          : null}
      </SelectContent>
    </Select>
  );
}
