export const Congrats = ({ username }: { username: string }) => {
    return (
        <section className="w-full h-screen flex flex-col items-center justify-center gap-6 text-center p-6">
            <h1 className="text-3xl font-bold">🎉 Login Successful!</h1>
            <p className="text-base opacity-80\">Hi {username}! If you are seeing this page, it means your session is now active.</p>
            <button
                onClick={() => {
                    sessionStorage.removeItem("accessToken");
                    window.location.href = "/auth/sign-in";
                }}
                className="px-5 py-2 rounded-xl shadow text-white bg-gray-400 hover:bg-gray-500 transition"
            >
                Logout
            </button>
        </section>
    );
};
