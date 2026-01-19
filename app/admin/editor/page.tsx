import { auth } from "@/auth";
import EditorPageComonent from "./editor";
import { AlertOctagon } from"lucide-react"
import { Button } from "@/components/ui/button";
import Link from "next/link";



export default async function EditorPage() {
    try {
        const session  = await auth()
        const role = session?.user.role
        if (role !== "ADMIN") {
            return (
                <div className="flex flex-col items-center justify-center h-screen gap-4 ">
                    <p className="text-2xl font-bold text-red-500">You are not allowed to access this page !</p>
                    <AlertOctagon className="h-6 w-6 text-red-500 animate-pulse" />
                    <Button variant="destructive">
                        <Link href={"/"}>
                        Go Back To Home                  
                        </Link>
                    </Button>
                    
                </div>
            );
        }
        return (
            <div>
                <EditorPageComonent />
            </div>
        );
    } catch (error) {
        console.error("Error in EditorPage:", error);
        return (
            <div>
                <p>Error loading editor page. Please try again later.</p>
            </div>
        );
    }
}