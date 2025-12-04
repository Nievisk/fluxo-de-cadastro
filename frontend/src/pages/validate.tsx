import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

export const ValidatePage = () => {
    const [statusCode, setStatusCode] = useState<number>()
    const navigate = useNavigate()

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token")

    const handleUserValidation = async () => {
        const url = 'http://localhost:3000/auth/validate'

        const res = await fetch(url, {
            method: "PUT",
            headers: { "Authorization": `Bearer ${token}` }
        })

        if (res.ok) navigate("/auth/sign-in")

        setStatusCode(res.status)
    }

    useEffect(() => {
        (async () => await handleUserValidation())()
    }, [])

    return (
        <div>{statusCode !== 200 && "Bad request"}</div>
    )
}