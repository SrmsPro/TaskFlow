import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";
import { useEffect, useRef } from "react";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  value: string;
  onChange: (value: string) => void;
}

export function MobileSearchModal({ isOpen, onClose, value, onChange }: MobileSearchModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 md:hidden" 
        onClick={onClose}
      />
      <div className="fixed top-0 left-0 right-0 bg-background z-50 md:hidden p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Search tasks..."
              className="pl-10 pr-4"
              data-testid="input-mobile-search"
            />
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            data-testid="button-close-search"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  );
}
