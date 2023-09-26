import Image from "next/image";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (session) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex items-center">
      <div className="flex-1 space-y-4">
        <h2 className="text-2xl">A modern React components library</h2>
        <p>
          Build fully functional accessible web applications faster than ever.
          Mantine includes more than 120 customizable components and hooks to
          cover you in any situation
        </p>
        <ul className="space-y-2">
          <li>
            TypeScript based – build type safe applications, all components and
            hooks export types
          </li>
          <li>
            TypeScript based – build type safe applications, all components and
            hooks export types
          </li>
          <li>
            TypeScript based – build type safe applications, all components and
            hooks export types
          </li>
        </ul>
      </div>
      <div className="relative w-60 h-60 flex-1">
        <Image
          src="/hero.svg"
          alt="hero image"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
