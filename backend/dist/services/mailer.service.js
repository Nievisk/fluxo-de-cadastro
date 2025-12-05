"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendEmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const create_template_1 = require("../hbs/create-template");
class SendEmailService {
    createtransporter() {
        const transporter = nodemailer_1.default.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GOOGLE_USER,
                pass: process.env.GOOGLE_PASSWORD
            }
        });
        return transporter;
    }
    ;
    async send(data) {
        const transporter = this.createtransporter();
        const template = (0, create_template_1.CreateTemplate)({ first_name: data.first_name, token: data.token });
        await transporter.sendMail({
            from: '"Developer" <rafaellsouza03@gmail.com>',
            to: data.email,
            html: template
        });
    }
}
exports.SendEmailService = SendEmailService;
