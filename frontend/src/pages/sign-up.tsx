import { Link } from "react-router-dom"
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { useState } from "react";
import { UseAuth } from "../hooks/use-auth";
import { ImSpinner9 } from "react-icons/im";
import { signUpSchema } from "../schemas/sign-up-schema";
import type { ICreateUser } from "../interfaces/icreate-user";

export const SignUpPage = () => {
    const [hideState, setHideState] = useState({
        password: false,
        confirm: false
    })

    const url = 'http://localhost:3000/auth/register'

    const {
        register, 
        loading, 
        errors, 
        handleSubmitform,
        statusCode
    } = UseAuth<ICreateUser>(url, signUpSchema, "/email-sending")

    return (
        <section className="h-screen w-screen flex justify-center items-center">
            <form onSubmit={(handleSubmitform)} className="flex flex-col w-60 h-92">
                <header className="mb-8"><h1 className=" text-3xl">SIGN UP</h1></header>

                <div>
                    <input type="text" placeholder="first name"
                        className="border-b border-gray-400 bg-gray-300 outline-none placeholder:px-1 h-7 px-1 w-full"
                        {...register("first_name")}
                    />
                    {
                        errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>
                    }
                </div>

                <div>
                    <input type="text" placeholder="last name"
                        className="border-b border-gray-400 bg-gray-300 outline-none placeholder:px-1 h-7 px-1 mt-1 w-full"
                        {...register("last_name")}
                    />
                    {
                        errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>
                    }
                </div>

                <div>
                    <input type="text" placeholder="email"
                        className="border-b border-gray-400 bg-gray-300 outline-none placeholder:px-1 h-7 px-1 mt-1 w-full"
                        {...register("email")}
                    />
                    {
                        (errors.email || statusCode === 409) && <p className="text-red-500 text-xs mt-1">{errors.email?.message || "Email already in use"}</p>
                    }
                </div>

                <div className="relative">
                    <input type={hideState.password ? "password" : "text"} placeholder="password"
                        className="border-b border-gray-400 bg-gray-300 outline-none placeholder:px-1 h-7 px-1 mt-1 w-full"
                        {...register("password")}
                    />
                    {
                        errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
                    }
                    <div
                        onClick={() => setHideState({ ...hideState, password: !hideState.password })}
                        className="absolute right-2 top-2 text-xl text-gray-500 z-10">
                        {
                            hideState.password ?
                                <IoEyeSharp /> :
                                <FaEyeSlash />
                        }
                    </div>
                </div>

                <div className="relative">
                    <input type={hideState.confirm ? "password" : "text"} placeholder="confirm password"
                        className="border-b border-gray-400 bg-gray-300 outline-none placeholder:px-1 h-7 px-1 mt-1 w-full"
                        {...register("confirmPassword")}
                    />
                    {
                        errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                    }
                    <div
                        onClick={() => setHideState({ ...hideState, confirm: !hideState.confirm })}
                        className="absolute right-2 top-2 text-xl text-gray-500 z-10">
                        {
                            hideState.confirm ?
                                <IoEyeSharp /> :
                                <FaEyeSlash />
                        }
                    </div>
                </div>

                <button type="submit" className={`${loading ? "opacity-80" : 'opacity-100'} mt-4 bg-gray-400 p-2 text-white hover:opacity-80 flex justify-center h-10 items-center rounded`}>{
                    loading ? <ImSpinner9 className="animate-spin text-xl" /> : "CONFIRM"
                }</button>

                <p className="flex justify-center mt-1 gap-x-1">or <Link to="/auth/sign-in" className="text-blue-400">sign in</Link></p>
            </form>
        </section>
    )
}