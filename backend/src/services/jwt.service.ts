import { Injectable, UnauthorizedException } from "@nestjs/common"
import "dotenv/config"
import jwt, { TokenExpiredError } from "jsonwebtoken"

@Injectable()
export class JwtService {
    private secret = process.env.JWT_SECRET!

    create(id: string, isValid: boolean) {
        return jwt.sign({ id, isValid }, this.secret, {
            expiresIn: "10h"
        })
    }

    validate(token: string) {
        try {
            return jwt.verify(token, this.secret)
        } catch (error) {
            if (error instanceof TokenExpiredError) throw new UnauthorizedException("Exceeded login time");
            else throw new UnauthorizedException("Unauthorized access attempt")
        }
    }
}