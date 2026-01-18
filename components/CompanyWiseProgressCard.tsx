import React from "react";
import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { getUserProgress } from "@/app/actions/user/user";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function CompanyWiseProgressCard({
  userId,
}: {
  userId: string;
}) {
  try {
    if (!userId) {
      return (
        <Card className="bg-card border border-border rounded-lg">
          <CardContent className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <LogIn className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    You&apos;re not signed in
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Please sign in to view your progress and personalized stats.
                  </p>
                </div>
              </div>

              <Link href="/login">
                <Button variant="default" size="sm" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  Sign in
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      );
    }

    const session = await auth();
    const token = session?.accessToken;
    const res = await getUserProgress({ userId, token });
    const progressData = res?.data;

    if (!progressData?.progresses?.length) {
      return (
        <Alert variant="default" className="bg-muted/50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            No progress data available yet. Start solving problems to see your
            progress!
          </AlertDescription>
        </Alert>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {progressData.progresses.map((data, index) => (
          <Card
            key={index}
            className="bg-card border border-border rounded-lg hover:border-primary/40 transition-colors"
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <Image
                  src={data.company.logo}
                  height={64}
                  width={64}
                  alt={`${data.company.name} logo`}
                />

                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">
                      {data.company.name}
                    </h3>
                    <Badge variant="secondary" className="ml-2">
                      {data.percentageCompleted.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">
                        {data.totalQuestionsSolved}
                      </span>
                    </div>
                    <Progress
                      value={data.percentageCompleted}
                      className="h-2 flex-1"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Something went wrong while loading your progress. Please try again
          later.
        </AlertDescription>
      </Alert>
    );
  }
}
