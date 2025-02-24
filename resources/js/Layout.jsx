import { Link, router } from "@inertiajs/react";
import api from "./helpers/axios";

export default function Layout({ children }) {

    const handleLogout = async () => {
        try {
            const { data } = await api.post('/logout')
            if (data.logout) {
                localStorage.removeItem('token')
                router.visit('/login')
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <header className="flex items-center justify-end px-4 py-2 shadow-xl">
                <div>
                    <button
                        onClick={handleLogout}
                        className="py-1 px-4 border-2 rounded-md font-semibold hover:text-white border-red-500 transition duration-200 hover:bg-red-500"
                    >Logout
                    </button>
                </div>
            </header>
            <main>{children}</main>
        </>
    )
}
