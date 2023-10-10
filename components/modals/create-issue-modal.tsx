"use client";

import { useModalStore } from "@/hooks/useModalStore";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Priority from "../priority";
import Progress from "../progress";
import User from "../user";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required.",
  }),
  description: z.string().min(1, {
    message: "Description is required.",
  }),
  priorityId: z.string().min(1, {
    message: "Priority is required.",
  }),
  progressId: z.string().min(1, {
    message: "Progress is required.",
  }),
  userId: z.string().min(1, {
    message: "Assignee is required.",
  }),
});

export default function CreateIssueModal() {
  const router = useRouter();
  const { data: sessionData } = useSession();
  const { isOpen, onClose, type, data } = useModalStore();

  const isModalOpen =
    isOpen && (type === "createIssue" || type === "editIssue");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priorityId: "",
      progressId: "",
      userId: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await axios.post("http://localhost:3001/issue", values, {
        headers: {
          authorization: `Bearer ${sessionData?.user?.accessToken}`,
        },
      });
      toast.success(data?.message);
      handleClose();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.success("Something went wrong.");
      }
    }
  };

  const onEdit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: respData } = await axios.put(
        `http://localhost:3001/issue/${data?.id}`,
        values,
        {
          headers: {
            authorization: `Bearer ${sessionData?.user?.accessToken}`,
          },
        }
      );
      toast.success(respData?.message);
      handleClose();
      router.refresh();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.success("Something went wrong.");
      }
    }
  };

  useEffect(() => {
    if (type === "editIssue") {
      form.setValue("title", data?.title as string);
      form.setValue("description", data?.description as string);
      form.setValue("priorityId", data?.priorityId.toString() as string);
      form.setValue("progressId", data?.progressId.toString() as string);
      form.setValue("userId", data?.userId.toString() as string);
    }
  }, [data]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Create an Issue
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              type === "editIssue" ? onEdit : onSubmit
            )}
          >
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input className="py-6" placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        className="pt-3"
                        placeholder="Description"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priorityId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Priority
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="progressId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Progress
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <User
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-8">
              <Button>{type === "editIssue" ? "Edit" : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
