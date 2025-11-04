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

import Link from "next/link";
import AuthButton from "./ui/AuthButton";

export const navBarData = [
  { Name: "Problems", link: "/problems" },
  { Name: "Companies", link: "/companies" },
  { Name: "Topics", link: "/topic" },
  { Name: "Blogs", link: "/blogs" },
  { Name: "Profile", link: "/profile" },
];

export function SideSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col px-2">
        <SheetHeader className="flex flex-col items-center">
          <SheetTitle className="text-2xl font-bold">&lt;HackMNC/&gt;</SheetTitle>
          <SheetDescription>
            Your roadmap to top MNCs
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-8">
          {navBarData.map((data, index) => (
            <SheetClose key={index} asChild>
              <Link href={data.link}>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-base font-medium "
                >
                  {data.Name}
                </Button>
              </Link>
            </SheetClose>
          ))}
        </div>
        <SheetFooter className="flex flex-col items-center gap-3 mt-auto pt-8">
          <AuthButton/>
          <p className="text-xs text-muted-foreground">© 2025 HackMNC</p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
