import { LoaderCircle } from "lucide-react";
import React from "react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[80vh] w-full">
      <LoaderCircle className="h-10 w-10 animate-[spin_0.5s_linear_infinite] text-primary" />
    </div>
  );
}
