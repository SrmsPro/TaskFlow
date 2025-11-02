import { MobileHeader } from "../mobile-header";
import { ThemeProvider } from "@/lib/theme-provider";

export default function MobileHeaderExample() {
  return (
    <ThemeProvider>
      <div className="h-screen">
        <MobileHeader onSearchClick={() => console.log('Search clicked')} />
        <div className="p-6">
          <p className="text-muted-foreground">Mobile header with search and profile</p>
        </div>
      </div>
    </ThemeProvider>
  );
}
