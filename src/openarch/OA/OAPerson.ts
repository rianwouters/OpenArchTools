import Person from "../Person.js";

export default class OAPerson implements Person {
    constructor(readonly id: string, readonly fullName: string) {
    }

    private notAvailable(): string {
        throw "Not available";
    }

    get firstName(): string {
        return this.notAvailable();
    }

    get lastName(): string {
        return this.notAvailable();
    }

    get lastNamePrefix(): string {
        return this.notAvailable();
    }
}
