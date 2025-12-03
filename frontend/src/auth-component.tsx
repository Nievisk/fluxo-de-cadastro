import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Congrats } from "./pages/congrats"

export const AuthComponent = () => {
    const [username, setUsername] = useState<string>("")
    const navigate = useNavigate()

    const handleUser = async () => {
        const token = sessionStorage.getItem("accessToken");
        const url = `${import.meta.env.BACKEND_URL}/auth/user` || 'http://localhost:3000/auth/user'

        const res = await fetch(url, {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        })

        if (!res.ok) return navigate("/auth/sign-in")

        const data = await res.json();
        setUsername(data.username)
    }

    useEffect(() => {
        (async () => await handleUser())()
    }, [])

    return <Congrats username={username} />
}