import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SignInPage } from "./pages/sign-in"
import { Congrats } from "./pages/congrats"
import { EmailSentPage } from "./pages/email-sending"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={Congrats} />
                <Route path="email-sending" Component={EmailSentPage} />

                <Route path="auth">
                    <Route path="sign-up" Component={SignInPage} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}