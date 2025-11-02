"use client";
import { useUserProgressStore } from "@/app/store/store";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

export default function ProgressTrackButton({
  difficulty,
  isSolved,
  questionId,
}: {
  difficulty: string;
  isSolved: boolean;
  questionId: string;
}) {
  const [solved, setSolved] = useState(isSolved);
  const { data: session } = useSession();
  const {
    increaseEasySolved,
    increaseMediumSolved,
    increaseHardSolved,
    decreaseEasySolved,
    decreaseMediumSolved,
    decreaseHardSolved,
  } = useUserProgressStore();

  // Sync local state with prop changes
  useEffect(() => {
    setSolved(isSolved);
  }, [isSolved]);

  const handleSolved = async (difficulty: string) => {
    if (!session?.accessToken) return toast.error("Sign in to continue");
    try {
      const id = toast.loading("Marking as done");

      const res = await axios.post(
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

      // Update local state
      setSolved(true);

      // Update global store
      if (difficulty === "EASY") {
        increaseEasySolved();
      } else if (difficulty === "MEDIUM") {
        increaseMediumSolved();
      } else if (difficulty === "HARD") {
        increaseHardSolved();
      }

      // Invalidate cache to force fresh data on next load
      invalidateCache();

      toast.remove(id);
      toast.success("Marked as done");
    } catch (error) {
      toast.removeAll();
      toast.error("Failed to mark as done");
    }
  };

  const handleUnSolve = async (difficulty: string) => {
    if (!session?.accessToken) return toast.error("Sign in to continue");
    try {
      const id = toast.loading("Marking as undone");

      const res = await axios.post(
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

      // Update local state
      setSolved(false);

      // Update global store
      if (difficulty === "EASY") {
        decreaseEasySolved();
      } else if (difficulty === "MEDIUM") {
        decreaseMediumSolved();
      } else if (difficulty === "HARD") {
        decreaseHardSolved();
      }

      // Invalidate cache to force fresh data on next load
      invalidateCache();

      toast.remove(id);
      toast.success("Marked as undone");
    } catch (error) {
      toast.removeAll();
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
      <Toaster />
    </div>
  );
}
