// app/store/store.ts
import { create } from "zustand";


type UserProgressStore = {
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    increaseEasySolved: () => void;
    increaseMediumSolved: () => void;
    increaseHardSolved: () => void;
    decreaseEasySolved: () => void;
    decreaseMediumSolved: () => void;
    decreaseHardSolved: () => void;
   
    initializeProgress: (easy: number, medium: number, hard: number) => void;
   
    setProgress: (easy: number, medium: number, hard: number) => void;
}

export const useUserProgressStore = create<UserProgressStore>((set) => ({
    easySolved: 0,
    mediumSolved: 0, 
    hardSolved: 0,
    
    increaseEasySolved: () => {
        set((state) => ({
            easySolved: state.easySolved + 1
        }))
    },
    increaseMediumSolved: () => {
        set((state) => ({
            mediumSolved: state.mediumSolved + 1
        }))
    },
    increaseHardSolved: () => {
        set((state) => ({
            hardSolved: state.hardSolved + 1
        }))
    },
    decreaseEasySolved: () => {
        set((state) => ({
            easySolved: state.easySolved > 0 ? state.easySolved - 1 : 0
        }))
    },
    decreaseMediumSolved: () => {
        set((state) => ({
            mediumSolved: state.mediumSolved > 0 ? state.mediumSolved - 1 : 0
        }))
    },
    decreaseHardSolved: () => {
        set((state) => ({
            hardSolved: state.hardSolved > 0 ? state.hardSolved - 1 : 0
        }))
    },
    
    
    initializeProgress: (easy: number, medium: number, hard: number) => {
        set({
            easySolved: easy,
            mediumSolved: medium,
            hardSolved: hard
        });
    },
    
    
    setProgress: (easy: number, medium: number, hard: number) => {
        set({
            easySolved: easy,
            mediumSolved: medium,
            hardSolved: hard
        });
    }
}));