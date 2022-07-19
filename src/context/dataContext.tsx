import React, { createContext, useEffect, useState } from "react";
import { useWorker } from "../hook/useWorker";

import type { Planet } from "../types";

export const DataContext = createContext<{
    planets: { [key: string]: Planet },
    loopId: number
}>({
    planets: {},
    loopId: 0
})

interface ResultData {
    newPlanets: { [key: string]: Planet },
    loopId: number
}

const DataProvider: React.FC<React.ReactNode> = ({children}) => {
    const worker = useWorker()
    const [planets, setPlanets] = useState<{ [key: string]: Planet }>({})
    const [loopId, setLoopId] = useState(0)

    const result = (data:ResultData) => {
        setPlanets(data.newPlanets)
        setLoopId(data.loopId)
    }

    useEffect(() => {
        const resultSymbol = worker.addListener('result', result)
        return () => {
            worker.removeListener(resultSymbol)
        }
    }, [worker])

    return (
        <DataContext.Provider
            value={{
                planets,
                loopId
                
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;
