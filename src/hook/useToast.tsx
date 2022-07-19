import { useContext } from "react"
import { ToastContext } from "../context/toastContext"


export function useToast() {
    const toast = useContext(ToastContext)
    return toast
}