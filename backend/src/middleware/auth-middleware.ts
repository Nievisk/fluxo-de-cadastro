import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "../services/jwt.service";
import { NextFunction } from "express";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwt: JwtService) { }

    use(req: any, res: any, next: NextFunction) {
        const accesstoken = req.headers.cookie?.["accessToken"]

        if (!accesstoken) return next(new UnauthorizedException("Missing access token"));

        const { id, isValid } = this.jwt.validate(accesstoken) as { id: string, isValid: boolean };
        const url = req.originalUrl

        if (!url.includes("validate") && !isValid) return next(new UnauthorizedException("This account is not verified"));

        req.body = { id }
        return next()
    }
}