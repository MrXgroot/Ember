import { Plus } from "lucide-react";

import { Button } from "@/shared/ui";

export function CreateCommunityButton({ onClick }) {
  return (
    <Button
      onClick={onClick}
      className="w-full justify-start gap-2"
      variant="ghost"
    >
      <Plus size={18} />
      Create Community
    </Button>
  );
}
