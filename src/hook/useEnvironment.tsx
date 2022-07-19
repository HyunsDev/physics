import { useContext } from "react";
import { EnvironmentContext } from "../context/environmentContext";

export function useEnvironment() {
    return useContext(EnvironmentContext)
}