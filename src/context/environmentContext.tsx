import React, { createContext, useCallback, useEffect, useState } from "react";
import { useWorker } from "../hook/useWorker";
import { environmentType } from "../types";

// 설정 파일 불러오기
const initData:environmentType = {
    gravity: 9.8,
    friction: 0,
    windDrag: 0,
    windX: 0,
    windY: 0
}

export const EnvironmentContext = createContext({
    data: initData,
    setData: (data: environmentType) => {},
    updateData: <T extends keyof environmentType>(key: T, value: environmentType[T]) => {}
})

const EnvironmentProvider = ({children}: {children: React.ReactNode}) => {
    const [ data, setData ] = useState<environmentType>(initData)
    const worker = useWorker()

    const updateData = useCallback(<T extends keyof environmentType>(key: T, value: environmentType[T]) => {
        const newData= {
            ...data,
            [key]: value
        }
        worker.requestWorker('updateEnv', newData)
        setData(newData)
    }, [data, worker])

    return (
        <EnvironmentContext.Provider
            value={{
                data,
                setData,
                updateData
            }}
        >
            {children}
        </EnvironmentContext.Provider>
    )
}

export default EnvironmentProvider;
