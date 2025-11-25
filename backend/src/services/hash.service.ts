import { Injectable } from "@nestjs/common";
import b from "bcryptjs"

@Injectable()
export class HashService {
    hashData(data: string) {
        return b.hashSync(data, 10)
    }

    compareData(hashedData: string, data: string) {
        return b.compareSync(hashedData, data)
    }
}