"use client";
import { useUserProgressStore } from "@/app/store/store";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProgressTrackButton({
  difficulty,
  isSolved,
  questionId,
  type,
}: {
  difficulty: string;
  isSolved: boolean;
  questionId: string;
  type: string;
}) {
  const [solved, setSolved] = useState(isSolved);
  const { data: session } = useSession();
  const router = useRouter();
  const {
    increaseEasySolved,
    increaseMediumSolved,
    increaseHardSolved,
    decreaseEasySolved,
    decreaseMediumSolved,
    decreaseHardSolved,
    increaseCompanyEasySolved,
    increaseCompanyMediumSolved,
    increaseCompanyHardSolved,
    decreaseCompanyEasySolved,
    decreaseCompanyMediumSolved,
    decreaseCompanyHardSolved,
  } = useUserProgressStore();

  const storeState = useUserProgressStore();

  useEffect(() => {
    console.log("Store state updated:", storeState);
  }, [storeState]);

  useEffect(() => {
    console.log("Company progress:", {
      easy: storeState.easyCompanySolved,
      medium: storeState.mediumCompanySolved,
      hard: storeState.hardCompanySolved,
    });
  }, [
    storeState.easyCompanySolved,
    storeState.mediumCompanySolved,
    storeState.hardCompanySolved,
  ]);

  useEffect(() => {
    setSolved(isSolved);
  }, [isSolved]);

  const handleSolved = async (difficulty: string) => {
    if (!session?.accessToken) {
      return toast("Signin to continue", {
        description: "Signin first to track your progress",
        action: {
          label: "Signin",
          onClick: () => router.push("/login"),
        },
      });
    }

    try {
      // Update local state FIRST for immediate feedback
      setSolved(true);

      // Update global store SECOND
      if (type === "topic") {
        if (difficulty === "EASY") {
          increaseEasySolved();
        } else if (difficulty === "MEDIUM") {
          increaseMediumSolved();
        } else if (difficulty === "HARD") {
          increaseHardSolved();
        }
      } else if (type === "company") {
        if (difficulty === "EASY") {
          increaseCompanyEasySolved();
        } else if (difficulty === "MEDIUM") {
          increaseCompanyMediumSolved();
        } else if (difficulty === "HARD") {
          increaseCompanyHardSolved();
        }
      }

      // THEN make API call
      await axios.post(
        "http://localhost:8080/api/v1/user/question/solved",
        {
          userId: session.user.id,
          questionId: questionId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      toast.success("Marked as done");
    } catch (error) {
      console.log(error);
      setSolved(false);
      if (type === "company") {
        if (difficulty === "EASY") {
          decreaseCompanyEasySolved();
        } else if (difficulty === "MEDIUM") {
          decreaseCompanyMediumSolved();
        } else if (difficulty === "HARD") {
          decreaseCompanyHardSolved();
        }
      }

      toast.error("Failed to mark as done");
    }
  };

  const handleUnSolve = async (difficulty: string) => {
    if (!session?.accessToken) {
      return toast.error("Sign in to continue");
    }

    try {
      // Update local state
      setSolved(false);

      // Update global store
      if (type === "topic") {
        if (difficulty === "EASY") {
          decreaseEasySolved();
        } else if (difficulty === "MEDIUM") {
          decreaseMediumSolved();
        } else if (difficulty === "HARD") {
          decreaseHardSolved();
        }
      } else if (type === "company") {
        if (difficulty === "EASY") {
          decreaseCompanyEasySolved();
        } else if (difficulty === "MEDIUM") {
          decreaseCompanyMediumSolved();
        } else if (difficulty === "HARD") {
          decreaseCompanyHardSolved();
        }
      }

      await axios.post(
        "http://localhost:8080/api/v1/user/question/mark-unsolve",
        {
          userId: session.user.id,
          questionId: questionId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );

      // Invalidate cache to force fresh data on next load
      await invalidateCache();

      toast.success("Marked as undone");
    } catch (error) {
      console.log(error);
      toast.error("Failed to mark as undone");
    }
  };

  // Function to invalidate cache (you'll need to implement this on your backend)
  const invalidateCache = async () => {
    try {
      // Call an API endpoint to clear relevant cache
      await axios.post(
        "http://localhost:8080/api/v1/cache/invalidate",
        {
          userId: session?.user.id,
          questionId: questionId,
        },
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        }
      );
    } catch (error) {
      console.error("Failed to invalidate cache:", error);
      // Continue even if cache invalidation fails
    }
  };

  return (
    <div className="hover:cursor-pointer">
      {solved ? (
        <ImCheckboxChecked
          size={20}
          className="text-green-500"
          onClick={() => handleUnSolve(difficulty)}
        />
      ) : (
        <ImCheckboxUnchecked
          size={20}
          className="text-gray-400"
          onClick={() => handleSolved(difficulty)}
        />
      )}
    </div>
  );
}