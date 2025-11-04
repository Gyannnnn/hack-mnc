import { auth } from "@/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { User, Mail, TrendingUp } from "lucide-react";
import { getUserOverallProgress } from "@/app/actions/user/user";

export default async function ProfileCard() {
  const session = await auth();
  const user = session?.user;
  const userId = user?.id;

  const stats = {
    easy: { solved: 234, total: 1234, percentage: 19 },
    medium: { solved: 156, total: 856, percentage: 18 },
    hard: { solved: 89, total: 423, percentage: 21 },
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  if (!userId) return <h1>Sign in first</h1>;
  const res = await getUserOverallProgress({ userId });
  const statsData = res?.data

  return (
    <Card className="w-full  p-6 shadow-lg">
      <CardContent className="p-0">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-around">
          {/* Profile Section */}
          <div className="flex flex-col  items-center gap-6 w-full lg:w-2/6 ">
            <div className="relative h-32 w-32">
              <Avatar className="h-32 w-32 border-4 border-primary relative">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={`${user?.name}'s profile`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user?.name ? (
                      getInitials(user.name)
                    ) : (
                      <User className="h-8 w-8" />
                    )}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            <div className="space-y-4 text-center sm:text-left">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {user?.name || "Anonymous User"}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{user?.email || "No email"}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-center items-center">
                <Badge variant="outline" className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>
                    {statsData?.userSolved}{" "}
                    Solved
                  </span>
                </Badge>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="h-50 w-50 rounded-full border-8 border-primary/20 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {statsData?.userSolved}/
                  {statsData?.totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground">{(Number(statsData?.userSolved)/Number(statsData?.totalQuestions)*100).toFixed(3)}% Solved</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10 w-full lg:w-4/5">
            <div className="space-y-4 flex-1 min-w-[280px]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-2xl text-green-600 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                    Easy
                  </span>
                  <span className="text-xl text-muted-foreground">
                    {statsData?.difficultyStats.EASY.solved}/{statsData?.difficultyStats.EASY.total}
                  </span>
                </div>
                <Progress  value={stats.easy.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {(Number(statsData?.difficultyStats.EASY.solved)/Number(statsData?.difficultyStats.EASY.total)*100).toFixed(2)}%
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-2xl text-yellow-600 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-600" />
                    Medium
                  </span>
                  <span className="text-xl text-muted-foreground">
                    {statsData?.difficultyStats.MEDIUM.solved}/{statsData?.difficultyStats.MEDIUM.total}
                  </span>
                </div>
                <Progress value={stats.medium.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                 {(Number(statsData?.difficultyStats.MEDIUM.solved)/Number(statsData?.difficultyStats.MEDIUM.total)*100).toFixed(2)}%
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-2xl text-red-600 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-600" />
                    Hard
                  </span>
                  <span className="text-xl text-muted-foreground">
                    {statsData?.difficultyStats.HARD.solved}/{statsData?.difficultyStats.HARD.total}
                  </span>
                </div>
                <Progress value={stats.hard.percentage} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                 {(Number(statsData?.difficultyStats.HARD.solved)/Number(statsData?.difficultyStats.HARD.total)*100).toFixed(2)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
