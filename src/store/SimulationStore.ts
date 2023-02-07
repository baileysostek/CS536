import create from "zustand";
import { vanilla_store } from "./SimulationStoreVanilla";

export const useStore = create(vanilla_store);