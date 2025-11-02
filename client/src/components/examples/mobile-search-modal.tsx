import { MobileSearchModal } from "../mobile-search-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MobileSearchModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="p-6">
      <Button onClick={() => setIsOpen(true)}>Open Mobile Search</Button>
      <MobileSearchModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        value={search}
        onChange={setSearch}
      />
    </div>
  );
}
