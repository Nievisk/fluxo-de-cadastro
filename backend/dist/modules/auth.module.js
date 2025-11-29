"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const prisma_service_1 = require("../services/prisma.service");
const jwt_service_1 = require("../services/jwt.service");
const hash_service_1 = require("../services/hash.service");
const mailer_service_1 = require("../services/mailer.service");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth-middleware");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(auth_middleware_1.AuthMiddleware)
            .forRoutes({ path: 'auth/user', method: common_1.RequestMethod.GET });
    }
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        providers: [auth_service_1.AuthService, prisma_service_1.PrismaService, jwt_service_1.JwtService, hash_service_1.HashService, mailer_service_1.SendEmailService, auth_middleware_1.AuthMiddleware],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
