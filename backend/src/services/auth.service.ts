import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { ICreateUser } from "../interfaces/icreate-user";
import { PrismaService } from "./prisma.service";
import { SendEmailService } from "./mailer.service";
import { JwtService } from "./jwt.service";
import { HashService } from "./hash.service";
import { ILoginUser } from "../interfaces/ilogin-user";


@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailer: SendEmailService,
    private jwt: JwtService,
    private hash: HashService
  ) { }

  async register(data: ICreateUser) {
    const foundEmail = await this.prisma.user.findUnique({
      where: { email: data.email }
    })

    if (foundEmail) throw new ConflictException("Email already in use")

    const hashedPass = this.hash.hashData(data.password)

    const user = await this.prisma.user.create({
      data: { ...data, hashed_pass: hashedPass }
    })

    const token = this.jwt.create(user.id, user.is_valid)

    this.mailer.send({ first_name: user.first_name, token, email: user.email })
    return;
  }

  async login({ email, password }: ILoginUser) {
    const hasEmail = await this.prisma.user.findUnique({ where: { email } });
    const isPassequal = this.hash.compareData(hasEmail?.hashed_pass ?? "", password)

    if (!hasEmail || !isPassequal) throw new NotFoundException("Incorrect email or password");
    if (!hasEmail.is_valid) throw new UnauthorizedException("User is not valid")

    const accessToken = this.jwt.create(hasEmail.id, hasEmail.is_valid)
    return accessToken
  }

  async validate(id: string) {
    const isUserValid = await this.prisma.user.findUnique({ where: { id } })

    if (isUserValid) throw new UnauthorizedException("This account was already validated")

    await this.prisma.user.update({
      where: { id }, data: { is_valid: true }
    })
  }

  async findUser(id: string) {
    return await this.prisma.user.findUnique({
      where: { id },
      select: { first_name: true }
    })
  }
}