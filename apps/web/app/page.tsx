// apps/web/app/page.tsx
import { DocumentList } from "@/components/DocumentList";
import { TailwindAdvancedEditor } from "@/components/tailwind/advanced-editor";
import Menu from "@/components/tailwind/ui/menu";

export default function Page() {
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
