import { useEffect, useState } from "react";
import Layout from "../Layout";
import api from "../helpers/axios";
import { FaTrash } from "react-icons/fa";
import { MdCheckCircleOutline, MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { router } from "@inertiajs/react";

export default function Home() {
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState('')
    const [newTask, setNewTask] = useState('')

    useEffect(() => {
        const getData = async () => {
            const { data } = await api.get('/tasks')
            console.log(data)
            setTasks(data.tasks)
        }
        getData()
    }, [])

    const handleReload = () => {
        const token = localStorage.getItem('token')
        router.visit('/', { method: 'get', headers: { Authorization: `Bearer ${token}` } })
    }

    const handleAdd = async (e) => {
        e.preventDefault()
        try {
            if (!newTask) {
                throw 'You have to fulfill the input'
            }
            const { data } = await api.post('/tasks', { newTask })
            alert(data.message)
        } catch (err) {
            setError(err.error)
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await api.delete(`/tasks/${id}`)
            alert(data.message)
        } catch (err) {
            console.log(err);
        }
    }

    const handleUpdate = async (id, is_completed) => {
        try {
            const { data } = await api.patch(`/tasks/${id}`, { is_completed })
            alert(data.message)
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Layout>
            <div className="p-4">
                <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-4 py-2 text-left">TASK</th>
                            <th className="border px-4 py-2 text-left">STATUS</th>
                            <th className="border px-4 py-2 text-left">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-100">
                                    <td className="border px-4 py-2">{item.task}</td>
                                    <td className="border px-4 py-2">
                                        {item.is_completed ? (
                                            <span className="text-green-600 font-semibold">Completed</span>
                                        ) : (
                                            <span className="text-red-600 font-semibold">Not Completed</span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex items-center gap-6">
                                            <button className="text-red-500" onClick={() => handleDelete(item.id)}>
                                                <FaTrash />
                                            </button>
                                            <button onClick={() => handleUpdate(item.id, !item.is_completed)}>
                                                {item.is_completed ? (
                                                    <MdCheckCircleOutline className="text-green-500" />
                                                ) : (
                                                    <MdOutlineRadioButtonUnchecked />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center border px-4 py-2 text-gray-500">
                                    No tasks available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div>
                    <button onClick={handleReload} className="py-2 font-semibold ml-2">Reload</button>
                </div>
                <div>
                    <form
                        className="flex flex-col p-8 bg-white shadow-lg rounded-lg max-w-md mx-auto"
                        onSubmit={handleAdd}
                    >
                        {error && (
                            <div className="py-2 rounded-md mb-4 bg-red-100 text-red-600 text-center font-medium">
                                {error}
                            </div>
                        )}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="task" className="text-sm font-semibold text-gray-700 mb-2">
                                Task :
                            </label>
                            <input
                                type="text"
                                id="task"
                                name="task"
                                onChange={(e) => setNewTask(e.target.value)}
                                placeholder="Create New Task"
                                className="bg-gray-100 rounded-md outline-none py-2 px-4 border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                            />
                        </div>
                        <button
                            className="py-2 w-full px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                            type="submit"
                        >
                            SUBMIT
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    )
}
