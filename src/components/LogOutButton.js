"use client"
import { LogOut } from "lucide-react"

export default function LogOutButton ({ handleLogout }) {
    return (
        <>
            <button
                onClick={handleLogout}
                className="hover:bg-gray-300 text-black dark:text-white font-bold py-1 px-2 rounded-lg dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out"
                >
                <LogOut />
            </button>
        </>
    )
}
