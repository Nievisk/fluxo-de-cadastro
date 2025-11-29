import { IsString, Matches } from "class-validator"
import { LoginUserDto } from "./login-user-dto"

export class CreateUserdto extends LoginUserDto {
    @IsString()
    @Matches(/^[a-zA-Z\s]{3,50}$/)
    first_name: string

    @IsString()
    @Matches(/^[a-zA-Z\s]{3,50}$/)
    last_name: string
}