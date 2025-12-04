import { useEffect, useState } from "react";
import { Congrats } from "./pages/congrats";
import { useNavigate } from "react-router-dom";

export const AuthComponent = () => {
    const [username, setUsername] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleUser = async () => {
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
            navigate("/auth/sign-in");
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/auth/user", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!res.ok) {
                navigate("/auth/sign-in");
                return;
            }

            const data = await res.json();
            if (!data.username) {
                navigate("/auth/sign-in");
                return;
            }

            setUsername(data.username);
        } catch (err) {
            console.error(err);
            navigate("/auth/sign-in");
        }
    };

    useEffect(() => {
        handleUser();
    }, []);

    if (username === null) return <div>Loading...</div>;

    return <Congrats username={username} />;
};
