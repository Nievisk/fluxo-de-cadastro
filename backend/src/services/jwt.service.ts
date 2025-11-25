import { Injectable } from "@nestjs/common"
import "dotenv/config"
import jwt from "jsonwebtoken"

@Injectable()
export class JwtService {
    secret = process.env.JWT_SECRET!

    create(id: string) {
        return jwt.sign({ id }, this.secret, {
            expiresIn: "1d"
        })
    }
}