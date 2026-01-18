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

  // Deprecated dummy stats were previously used to drive progress bars.
  // Real percentages are now calculated from server data below.

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

  const calcPct = (solved?: number, total?: number) => {
    const s = Number(solved || 0);
    const t = Number(total || 0);
    if (!t) return 0;
    return (s / t) * 100;
  };

  const easyPct = calcPct(statsData?.difficultyStats.EASY.solved, statsData?.difficultyStats.EASY.total);
  const mediumPct = calcPct(statsData?.difficultyStats.MEDIUM.solved, statsData?.difficultyStats.MEDIUM.total);
  const hardPct = calcPct(statsData?.difficultyStats.HARD.solved, statsData?.difficultyStats.HARD.total);

  return (
    <Card className="w-full bg-card border border-border ">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-6 w-full lg:w-2/6">
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
            <div className="h-40 w-40 rounded-full border-8 border-primary/20 flex items-center justify-center bg-card/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {statsData?.userSolved}/
                  {statsData?.totalQuestions}
                </div>
                <div className="text-sm text-muted-foreground">{calcPct(statsData?.userSolved, statsData?.totalQuestions).toFixed(1)}% Solved</div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-10 w-full lg:w-3/5">
            <div className="space-y-4 flex-1 min-w-[280px]">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg md:text-xl text-green-600 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-600" />
                    Easy
                  </span>
                  <span className="text-base md:text-lg text-muted-foreground">
                    {statsData?.difficultyStats.EASY.solved}/{statsData?.difficultyStats.EASY.total}
                  </span>
                </div>
                <Progress value={easyPct} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                  {easyPct.toFixed(1)}%
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg md:text-xl text-yellow-600 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-600" />
                    Medium
                  </span>
                  <span className="text-base md:text-lg text-muted-foreground">
                    {statsData?.difficultyStats.MEDIUM.solved}/{statsData?.difficultyStats.MEDIUM.total}
                  </span>
                </div>
                <Progress value={mediumPct} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                 {mediumPct.toFixed(1)}%
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-lg md:text-xl text-red-600 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-600" />
                    Hard
                  </span>
                  <span className="text-base md:text-lg text-muted-foreground">
                    {statsData?.difficultyStats.HARD.solved}/{statsData?.difficultyStats.HARD.total}
                  </span>
                </div>
                <Progress value={hardPct} className="h-2" />
                <div className="text-xs text-muted-foreground text-right">
                 {hardPct.toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
