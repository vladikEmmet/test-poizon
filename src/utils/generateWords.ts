import {faker} from "@faker-js/faker";

export const generateWords = (amount: number) => faker.word.words(amount);