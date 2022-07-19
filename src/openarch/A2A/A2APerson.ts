import Person from '../Person.js'
import A2APersonJson from './json/A2APersonJson.js'

export default class A2APerson implements Person {

    readonly firstName: string;
    readonly lastName: string;
    readonly lastNamePrefix: string;
    readonly id: string;

    constructor(o: A2APersonJson) {
        const {
            pid: id,
            a2a_PersonName: {
                a2a_PersonNameFirstName: {
                    a2a_PersonNameFirstName: firstName = ''
                } = {},
                a2a_PersonNamePrefixLastName: {
                    a2a_PersonNamePrefixLastName: lastNamePrefix = ''
                } = {},
                a2a_PersonNameLastName: {
                    a2a_PersonNameLastName: lastName = ''
                } = {},
            }
        } = o;
        this.id = id;
        this.firstName = firstName
        this.lastNamePrefix = lastNamePrefix
        this.lastName = lastName
    }

    get fullName(): string {
        return `${this.firstName} ${this.lastNamePrefix} ${this.lastName}`
    }
}
