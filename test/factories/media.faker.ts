import { faker } from "@faker-js/faker";

export async function fakeMedia(){
    return {
        title: faker.word.sample(),
        username: faker.lorem.words(10)
    }
}