import { useContext } from "react";
import { WorkerContext } from "../context/workerContext";


export function useWorker() {
    const worker = useContext(WorkerContext)
    return worker
}