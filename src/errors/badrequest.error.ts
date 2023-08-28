import { HttpException, HttpStatus } from "@nestjs/common";

export function badRequestError(){
    throw new HttpException('Bad Request', 400)
}