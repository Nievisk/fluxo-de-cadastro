import nodemailer from "nodemailer"
import { CreateTemplate } from "../hbs/create-template"

type EmailData = {
    first_name: string
    email: string
    token: string
}

export class SendEmailService {
    createtransporter() {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.GOOGLE_USER,
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
            },
        })
        return transporter
    };

    async send(data: EmailData) {
        const transporter = this.createtransporter()
        const template = CreateTemplate({ first_name: data.first_name, token: data.token })
        await transporter.sendMail({
            from: '"Nievisk" <rafaellsouza03@gmail.email>',
            to: data.email,
            html: template
        })
    }
}