export default class A2APerson {
    constructor(o) {
        // TODO: inherit from Person
        console.log(JSON.stringify(o))
        this.id = o.pid;
        const {
            a2a_PersonName: {
                a2a_PersonNameFirstName:{
                    a2a_PersonNameFirstName: firstName
                } = {},
                a2a_PersonNamePrefixLastName:{
                    a2a_PersonNamePrefixLastName: lastNamePrefix
                } = {},
                a2a_PersonNameLastName:{
                    a2a_PersonNameLastName: lastName
                } = {},
            }
        } = o;
        // TODO: make these properties
        this.firstName = firstName
        this.lastNamePrefix = lastNamePrefix
        this.lastName = lastName
    }
}
