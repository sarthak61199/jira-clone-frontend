"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Priority from "./priority";
import Progress from "./progress";
import User from "./user";
import { useModalStore } from "@/hooks/useModalStore";

export default function FilterSidebar() {
  const [isMounted, setIsMounted] = useState(false);
  const [priority, setPriority] = useState<string>("");
  const [progress, setProgress] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("");

  const router = useRouter();

  const { isOpen, onClose, type, onOpen } = useModalStore();

  const isModalOpen = isOpen && type === "filterSidebar";

  const onSubmit = () => {
    const url = qs.stringify(
      {
        order: sortOrder || "desc",
        value: sortValue || "createdAt",
        priority: priority || null,
        progress: progress || null,
        user: user || null,
      },
      {
        skipNull: true,
      }
    );
    router.push(`/dashboard?${url}`);
    router.refresh();
    onClose();
  };

  const onReset = () => {
    setPriority("");
    setProgress("");
    setSortValue("");
    setUser("");
    setSortOrder("");
    const url = qs.stringify(
      {
        order: "desc",
        value: "createdAt",
        priority: null,
        progress: null,
        user: null,
      },
      {
        skipNull: true,
      }
    );
    router.push(`/dashboard?${url}`);
    router.refresh();
    onClose();
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet open={isModalOpen} onOpenChange={onClose}>
      <Button
        className="justify-end flex ml-auto"
        onClick={() => onOpen("filterSidebar")}
      >
        Filter/Sort
      </Button>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters & Sort</SheetTitle>
          <SheetDescription>
            Filter and Sort the Issues according to your needs.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4">
          <div className="my-4">
            <h3>Filter</h3>
            <div className="space-y-4 mt-2">
              <Priority
                defaultValue={priority}
                onValueChange={(val: string) => setPriority(val)}
              />
              <Progress
                defaultValue={progress}
                onValueChange={(val: string) => setProgress(val)}
              />
              <User
                defaultValue={user}
                onValueChange={(val: string) => setUser(val)}
              />
            </div>
          </div>
          <div>
            <h3>Sort</h3>
            <div className="space-y-4 mt-2">
              <Select
                defaultValue={sortValue}
                onValueChange={(val: string) => setSortValue(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="createdAt">Created At</SelectItem>
                  <SelectItem value="updatedAt">Updated At</SelectItem>
                </SelectContent>
              </Select>
              <Select
                defaultValue={sortOrder}
                onValueChange={(val: string) => setSortOrder(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="space-x-4">
          <Button className="mt-8" onClick={onSubmit}>
            Submit
          </Button>
          <Button className="mt-8" onClick={onReset} variant="secondary">
            Reset
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
