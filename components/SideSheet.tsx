import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { navBarData } from "./Navbar";
import Link from "next/link";

export function SideSheet() {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent >
        <SheetHeader className="flex items-center">
          <SheetTitle>Hack MNC</SheetTitle>
          <SheetDescription>
            Making interview preparation easier
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          {navBarData.map((data, index) => (
            <SheetClose asChild>
              <Button variant={"secondary"}>
                <Link href={data.link}>{data.Name}</Link>
              </Button>
            </SheetClose>
          ))}
        </div>
        <SheetFooter className="flex  flex-col items-center">
          <Button className="w-full" variant={"default"}>Signin</Button>  
          <p className="text-sm">@gyanpatra.dev</p>        
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
