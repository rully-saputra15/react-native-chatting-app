import create from "zustand";
import {Platform} from "react-native";

interface MainStore {
  name: string;
  setName: (name: string) => void;
}

export const useMainStore = create<MainStore>(set => ({
  name: Platform.OS === "android" ? "Rully" : "Ruls",
  setName: name => set({ name })
}));
