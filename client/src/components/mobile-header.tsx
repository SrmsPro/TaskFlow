import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ListTodo, Search } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface MobileHeaderProps {
  onSearchClick?: () => void;
}

export function MobileHeader({ onSearchClick }: MobileHeaderProps) {
  return (
    <div className="md:hidden sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <ListTodo className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold">TaskFlow</h1>
            <p className="text-xs text-muted-foreground">Stay organized</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onSearchClick}
            data-testid="button-mobile-search"
          >
            <Search className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary text-primary-foreground text-sm font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}
