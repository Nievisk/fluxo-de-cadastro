import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "../services/jwt.service";
import { NextFunction, Request } from "express";


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private jwt: JwtService) { }

    use(req: any, res: any, next: NextFunction) {
        const accesstoken = req.headers?.authorization?.split(" ")[1]

        if (!accesstoken) return next(new UnauthorizedException("Access token is missing"));

        const { id, isValid } = this.jwt.validate(accesstoken) as { id: string, isValid: boolean };
        const url = req.originalUrl

        if (!url.includes("validate") && !isValid) return next(new UnauthorizedException("Unauthorized access token"));

        req.user = { id }
        return next()
    }
}