import { faker } from "@faker-js/faker";

export async function fakePost(){
    return {
        title: faker.word.sample(),
        text: faker.lorem.words(10)
    }
}