import { useContext } from "react";
import { DataContext } from "../context/dataContext";

export function useData() {
    return useContext(DataContext)
}