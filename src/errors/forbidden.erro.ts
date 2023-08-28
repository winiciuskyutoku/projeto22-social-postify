import { HttpException, HttpStatus } from "@nestjs/common";

export function forbiddenError(){
    throw new HttpException('Forbidden', 403)
}