import React from "react";

import FeaturedCompany from "@/components/FeaturedCompany";
import Topics from "@/components/Topics";
import Questions from "@/components/Questions";
import { auth } from "@/auth";

export default async function page() {
  const session = await auth();
  return (
    <div className="cnt">
      <FeaturedCompany />
      <Topics />
      <h1>Questions Topic wise company wise</h1>
      <Questions userId={session?.user.id as string} />
    </div>
  );
}
