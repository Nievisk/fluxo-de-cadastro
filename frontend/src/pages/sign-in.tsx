import { Link } from "react-router-dom"
import { UseAuth } from "../hooks/use-auth";
import { ImSpinner9 } from "react-icons/im";
import { signInSchema } from "../schemas/sign-in-schema";
import type { ILoginUser } from "../interfaces/ilogin-user";

export const SignInPage = () => {
    const url = 'http://localhost:3000/auth/login'

    const {
        register,
        loading,
        errors,
        handleSubmitform,
        statusCode
    } = UseAuth<ILoginUser>(url, signInSchema, "/")

    return (
        <section className="h-screen w-screen flex justify-center items-center">
            <form onSubmit={(handleSubmitform)} className="flex flex-col w-60 h-92">
                <header className="mb-8"><h1 className=" text-3xl">SIGN IN</h1></header>

                <div>
                    <input type="text" placeholder="email"
                        className="border-b border-gray-400 bg-gray-300 outline-none placeholder:px-1 h-7 px-1 mt-1 w-full"
                        {...register("email")}
                    />
                </div>

                <div className="relative">
                    <input type="password" placeholder="password"
                        className="border-b border-gray-400 bg-gray-300 outline-none placeholder:px-1 h-7 px-1 mt-1 w-full"
                        {...register("password")}
                    />
                    {
                        (errors.email || errors.password || statusCode === 401) && <p className="text-red-500 text-xs mt-1">Incorrect email or password</p>
                    }
                </div>

                <button type="submit" className={`${loading ? "opacity-80" : 'opacity-100'} mt-4 bg-gray-400 p-2 text-white hover:opacity-80 flex justify-center h-10 items-center rounded`}>{
                    loading ? <ImSpinner9 className="animate-spin text-xl" /> : "CONFIRM"
                }</button>

                <p className="flex justify-center mt-1 gap-x-1">or <Link to="/auth/sign-up" className="text-blue-400">sign up</Link></p>
            </form>
        </section>
    )
}