import { useState } from "react"
import api from "../helpers/axios"
import { router, Link } from "@inertiajs/react"

export default function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setError('')
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password, password_confirmation } = formData

        try {
            if (name == '' || email == '' || password == '' || password_confirmation == '') {
                throw "You have to fullfill the form"
            }

            const { data } = await api.post('/register', formData)
            localStorage.setItem('token', data.token)
            alert(data.message)
            router.visit('/', {
                method: 'get',
                headers: { Authorization: `Bearer ${data.token}` }
            })
        } catch (err) {
            setError(err)
        }
    }
    return (
        <main className="h-screen flex justify-center items-center">
            <form
                className="flex flex-col border py-10 px-6 rounded-md w-[25rem] min-h-[20rem]"
                onSubmit={handleSubmit}
            >
                <h1 className="text-3xl font-semibold mb-6 text-center">REGISTER</h1>
                {error && (
                    <div className="py-2 rounded-md mb-2 bg-red-300 text-red-600 text-center">{error}</div>
                )}
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="text-sm font-semibold mb-2"
                    >Name :</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        className="bg-slate-100 rounded-sm outline-none py-1 px-2 border-b border-black"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="text-sm font-semibold mb-2">Email :</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleChange}
                        className="bg-slate-100 rounded-sm outline-none py-1 px-2 border-b border-black"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="password" className="text-sm font-semibold mb-2"
                    >Password :</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        onChange={handleChange}
                        className="bg-slate-100 rounded-sm outline-none py-1 px-2 border-b border-black"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="password_confirmation" className="text-sm font-semibold mb-2"
                    >Confirm Password :</label>
                    <input
                        type="password"
                        id="password_confirmation"
                        name="password_confirmation"
                        onChange={handleChange}
                        className="bg-slate-100 rounded-sm outline-none py-1 px-2 border-b border-black"
                    />
                </div>
                <button
                    className="py-1 rounded-3xl border-2 border-blue-500 font-semibold hover:bg-blue-500 transition duration-200 hover:text-white"
                >
                    REGISTER
                </button>
                <div>
                    <Link className="text-blue-500 text-xs" href="/login">Login</Link>
                </div>
            </form>
        </main >
    )
}
