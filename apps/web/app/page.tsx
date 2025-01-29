// apps/web/app/page.tsx

"use client";

import { useEffect, useState } from "react";

import { DocumentList } from "@/components/DocumentList";
import LoginDialog from "@/components/LoginDialog";
import { TailwindAdvancedEditor } from "@/components/tailwind/advanced-editor";
import Menu from "@/components/tailwind/ui/menu";

export default function Page() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {

    if (process.env.NEXT_PUBLIC_LOGIN_CHECK === "true") {
      fetch("/api/user")
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    }
    else {
      setUser({
        userId: "guest",
        userName: "Guest",
        authority: false,
        enable: true,
        firstLogin: false,
        passwordChange: false,
      });
    }
  }, []);

  if (!user) return <LoginDialog />;

  return (
    <div className="flex min-h-screen">
      <DocumentList />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 p-4">
          <Menu />
        </div>
        <div className="flex-1 overflow-auto px-4">
          <TailwindAdvancedEditor />
        </div>
      </div>
    </div>
  );
}
