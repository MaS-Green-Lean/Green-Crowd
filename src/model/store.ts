import { Produce } from './produce'

export class Store {
    constructor(public name: string, public description: string, public address: string, public produce: Produce[]) {}
}