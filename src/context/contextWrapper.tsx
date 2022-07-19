import DataProvider from "./dataContext"
import EnvironmentProvider from "./environmentContext"
import SettingProvider from "./settingContext"
import ToastProvider from "./toastContext"
import WorkerProvider from "./workerContext"


function ContextWrapper({children}: {children: React.ReactNode}) {
    return (
        <WorkerProvider>
            <DataProvider>
                <SettingProvider>
                    <ToastProvider>
                        <EnvironmentProvider>
                            {children}
                        </EnvironmentProvider>
                    </ToastProvider>
                </SettingProvider>
            </DataProvider>
        </WorkerProvider>
    )
}

export {
    ContextWrapper
}