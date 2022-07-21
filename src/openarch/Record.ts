import Archive from './Archive.js';
import Person from './Person.js';

export default interface Record {
    readonly place: string;
    readonly type: string;
    readonly source: string;
    readonly guid: string;
    readonly url: string;
    readonly date: Date;
    readonly relations: { type: String, person: Person}[];
    readonly archive?: Archive;    
}
