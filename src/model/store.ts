import { Produce } from './produce'
import { Location } from './location'

export class Store {
    constructor(public name: string, public description: string, public address: string, public produce: Produce[], public location: Location, public _id: number) { }
}