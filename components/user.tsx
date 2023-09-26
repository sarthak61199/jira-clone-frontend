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

interface UserProps {
  onValueChange: () => void;
  defaultValue: string;
}

interface UserList {
  id: number;
  name: string;
}

export default function User({ onValueChange, defaultValue }: UserProps) {
  const { data: sessionData } = useSession();

  const [userList, setUserList] = useState<UserList[]>([]);

  const fetchUserList = async () => {
    const { data } = await axios.get("http://localhost:3001/user", {
      headers: {
        authorization: `Bearer ${sessionData?.user?.accessToken}`,
      },
    });
    setUserList(data);
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="Assignee" />
      </SelectTrigger>
      <SelectContent>
        {userList.length
          ? userList.map((item) => (
              <SelectItem value={item.id.toString()} key={item.id}>
                {item.name}
              </SelectItem>
            ))
          : null}
      </SelectContent>
    </Select>
  );
}
