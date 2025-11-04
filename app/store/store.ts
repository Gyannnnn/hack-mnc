// app/store/store.ts
import { create } from "zustand";

type UserProgressStore = {
    // General progress
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

    // Company progress
    easyCompanySolved: number;
    mediumCompanySolved: number;
    hardCompanySolved: number;
    increaseCompanyEasySolved: () => void;
    increaseCompanyMediumSolved: () => void;
    increaseCompanyHardSolved: () => void;
    decreaseCompanyEasySolved: () => void;
    decreaseCompanyMediumSolved: () => void;
    decreaseCompanyHardSolved: () => void;
    initializeCompanyProgress: (easy: number, medium: number, hard: number) => void;
    setCompanyProgress: (easy: number, medium: number, hard: number) => void;
}

export const useUserProgressStore = create<UserProgressStore>((set) => ({
    // Initial state for general progress
    easySolved: 0,
    mediumSolved: 0, 
    hardSolved: 0,
    
    // Initial state for company progress
    easyCompanySolved: 0,
    mediumCompanySolved: 0,
    hardCompanySolved: 0,
    
    // General progress actions
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
    },
    
    // Company progress actions
    increaseCompanyEasySolved: () => {
        set((state) => ({
            easyCompanySolved: state.easyCompanySolved + 1
        }))
    },
    increaseCompanyMediumSolved: () => {
        set((state) => ({
            mediumCompanySolved: state.mediumCompanySolved + 1
        }))
    },
    increaseCompanyHardSolved: () => {
        set((state) => ({
            hardCompanySolved: state.hardCompanySolved + 1
        }))
    },
    decreaseCompanyEasySolved: () => {
        set((state) => ({
            easyCompanySolved: state.easyCompanySolved > 0 ? state.easyCompanySolved - 1 : 0
        }))
    },
    decreaseCompanyMediumSolved: () => {
        set((state) => ({
            mediumCompanySolved: state.mediumCompanySolved > 0 ? state.mediumCompanySolved - 1 : 0
        }))
    },
    decreaseCompanyHardSolved: () => {
        set((state) => ({
            hardCompanySolved: state.hardCompanySolved > 0 ? state.hardCompanySolved - 1 : 0
        }))
    },
    
    initializeCompanyProgress: (easy: number, medium: number, hard: number) => {
        set({
            easyCompanySolved: easy,
            mediumCompanySolved: medium,
            hardCompanySolved: hard
        });
    },
    
    setCompanyProgress: (easy: number, medium: number, hard: number) => {
        set({
            easyCompanySolved: easy,
            mediumCompanySolved: medium,
            hardCompanySolved: hard
        });
    }
}));