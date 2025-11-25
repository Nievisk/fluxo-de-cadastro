import { Body, Controller, Post, Req } from "@nestjs/common";
import { CreateUserdto } from "../dtos/create-user-dto";

@Controller("auth")
export class AuthController {
    constructor() { }

    @Post("register")
    async register(@Req() request: Request, @Body() dto: CreateUserdto) { }

    @Post("login")
    async login(@Req() request: Request) { }

    @Post("logout")
    async logout(@Req() request: Request) { }
}