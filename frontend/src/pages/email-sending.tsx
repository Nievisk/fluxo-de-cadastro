import { Link } from "react-router-dom";

export const EmailSentPage = () => {
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
                    <h1 className="text-2xl font-semibold">Check your email</h1>
                    <p className="text-lg">
                        We just sent you an email.
                    </p>
                    <p className="text-gray-600 text-sm">Follow the instructions to continue.</p>

                    <Link
                        to="/sign-in"
                        className="inline-block mt-4 px-6 py-3 rounded-xl shadow bg-blue-600 text-white hover:bg-blue-700 transition"
                    >
                        Go to sign in
                    </Link>
                </div>
            </div>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center space-y-4">
                    <h1 className="text-2xl font-semibold">Check your email</h1>
                    <p className="text-lg">
                        We just sent you an email.
                    </p>
                    <p className="text-gray-600 text-sm">Follow the instructions to continue.</p>
                </div>
            </div>
        </>
    );
}