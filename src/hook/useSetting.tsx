import { useContext } from "react";
import { SettingContext } from "../context/settingContext";


export function useSetting() {
    return useContext(SettingContext)
}