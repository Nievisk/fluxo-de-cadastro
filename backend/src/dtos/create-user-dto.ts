import { IsEmail, IsString, Matches, MaxLength } from "class-validator"

export class CreateUserdto {
    @IsString()
    @Matches(/^[a-zA-Z\s]{3,50}$/)
    first_name: string

    @IsString()
    @Matches(/^[a-zA-Z\s]{3,50}$/)
    last_name: String

    @IsString()
    @IsEmail()
    @MaxLength(250)
    email: String

    @IsString()
    @Matches(/^(?=.*\p{L})(?=.*\p{Nd})(?=.*[\p{S}\p{P}])[\p{L}\p{Nd}\p{S}\p{P}][^\s]{8,16}$/u)
    password: String
}