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
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD
            }
        })
        return transporter
    };

    async send(data: EmailData) {
        const transporter = this.createtransporter()
        const template = CreateTemplate({ first_name: data.first_name, token: data.token })
        await transporter.sendMail({
            from: '"Nievisk" <rafaellsouza03@gmail.com>',
            to: data.email,
            html: template
        })
    }
}