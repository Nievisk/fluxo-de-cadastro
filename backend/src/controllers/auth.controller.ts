import { Body, Controller, Get, Post, Put, Req, Res } from "@nestjs/common";
import { CreateUserdto } from "../dtos/create-user-dto";
import { AuthService } from "../services/auth.service";
import { LoginUserDto } from "../dtos/login-user-dto";
import { Response, Request, response } from "express"

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("register")
    async register(@Req() request: Request, @Body() dto: CreateUserdto) {
        await this.authService.register(dto);
        return { message: `Welcome ${dto.first_name}! We sent a confirmation to: ${dto.email}.` }
    }

    @Post("login")
    async login(@Req() request: Request, @Body() dto: LoginUserDto) {
        const accessToken = await this.authService.login(dto);
        return { accessToken }
    }

    @Put("validate")
    async validate(@Req() request: any) {
        await this.authService.validate(request.user.id);
    }

    @Get("user")
    async findUser(@Req() request: any) {
        return await this.authService.findUser(request.user.id)
    }
}