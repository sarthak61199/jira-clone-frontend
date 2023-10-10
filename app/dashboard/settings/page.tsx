import ChangePassword from "@/components/change-password";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Settings() {
  return (
    <>
      <h2 className="text-3xl text-center">Settings</h2>
      <Tabs
        defaultValue="account"
        className="flex gap-4 mt-10"
        orientation="vertical"
      >
        <TabsList className="flex-col h-fit w-40 gap-2 border-r rounded-none pr-4">
          <TabsTrigger value="account" className="w-full py-2 text-md">
            Account
          </TabsTrigger>
          <TabsTrigger value="password" className="w-full py-2 text-md">
            Stats
          </TabsTrigger>
          <TabsTrigger value="admin" className="w-full py-2 text-md">
            Admin
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="flex-1">
          <ChangePassword />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
        <TabsContent value="admin">Admin.</TabsContent>
      </Tabs>
    </>
  );
}
