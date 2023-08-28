import { HttpException, HttpStatus } from "@nestjs/common";

export function notFoundError(){
    throw new HttpException('Not Found', 404)
}