export default class Archive {
    readonly id: string;
    readonly name: string;
    readonly org: string;

    constructor(id: string, name: string, org: string) {
        this.id = id;
        this.name = name;
        this.org = org;
    }
}
