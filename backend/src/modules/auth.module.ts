import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { AuthService } from "../services/auth.service";
import { PrismaService } from "../services/prisma.service";
import { JwtService } from "../services/jwt.service";
import { HashService } from "../services/hash.service";
import { SendEmailService } from "../services/mailer.service";
import { AuthController } from "../controllers/auth.controller";
import { AuthMiddleware } from "../middleware/auth-middleware";


@Module({
    providers: [AuthService, PrismaService, JwtService, HashService, SendEmailService, AuthMiddleware],
    controllers: [AuthController]
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthMiddleware)
            .forRoutes(
                { path: 'auth/user', method: RequestMethod.GET },
                { path: "auth/validate", method: RequestMethod.PUT }
            )
    }
}