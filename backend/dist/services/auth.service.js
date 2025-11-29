"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
const mailer_service_1 = require("./mailer.service");
const jwt_service_1 = require("./jwt.service");
const hash_service_1 = require("./hash.service");
let AuthService = class AuthService {
    constructor(prisma, mailer, jwt, hash) {
        this.prisma = prisma;
        this.mailer = mailer;
        this.jwt = jwt;
        this.hash = hash;
    }
    async register(data) {
        const foundEmail = await this.prisma.user.findUnique({
            where: { email: data.email }
        });
        if (foundEmail)
            throw new common_1.ConflictException("Email already in use");
        const hashedPass = this.hash.hashData(data.password);
        const user = await this.prisma.user.create({
            data: { ...data, hashed_pass: hashedPass }
        });
        const token = this.jwt.create(user.id, user.is_valid);
        this.mailer.send({ first_name: user.first_name, token, email: user.email });
        return;
    }
    async login({ email, password }) {
        var _a;
        const hasEmail = await this.prisma.user.findUnique({ where: { email } });
        const isPassequal = this.hash.compareData((_a = hasEmail === null || hasEmail === void 0 ? void 0 : hasEmail.hashed_pass) !== null && _a !== void 0 ? _a : "", password);
        if (!hasEmail || !isPassequal)
            throw new common_1.NotFoundException("Incorrect email or password");
        if (!hasEmail.is_valid)
            throw new common_1.UnauthorizedException("User is not valid");
        const accessToken = this.jwt.create(hasEmail.id, hasEmail.is_valid);
        return accessToken;
    }
    async validate(id) {
        const isUserValid = await this.prisma.user.findUnique({ where: { id } });
        if (isUserValid)
            throw new common_1.UnauthorizedException("This account was already validated");
        await this.prisma.user.update({
            where: { id }, data: { is_valid: true }
        });
    }
    async findUser(id) {
        return await this.prisma.user.findUnique({
            where: { id },
            select: { first_name: true }
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_service_1.SendEmailService,
        jwt_service_1.JwtService,
        hash_service_1.HashService])
], AuthService);
