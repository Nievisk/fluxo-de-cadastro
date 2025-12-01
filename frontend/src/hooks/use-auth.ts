import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const UseAuth = <T extends FieldValues>(
    url: string,
    schema: any,
    redirectUrl: string
) => {
    const [loading, setLoading] = useState(false)
    const [statusCode, setStatusCode] = useState<number>()

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<T>({
        mode: "onSubmit",
        resolver: zodResolver(schema)
    })

    const handleSubmitform = handleSubmit(async (data) => {
        setLoading(true)
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        })

        if (res.ok) {
            setLoading(false)
            const data = await res.json()
            if (data?.accessToken) sessionStorage.setItem("accessToken", data.accessToken);
            navigate(redirectUrl)
        }
        setLoading(false)
        setStatusCode(res.status)
    })

    return { errors, handleSubmitform, register, loading, statusCode }
}