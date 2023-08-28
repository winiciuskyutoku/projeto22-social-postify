import { HttpException, HttpStatus } from "@nestjs/common";

export function conflictError(){
    throw new HttpException('Conflict', 409)
}