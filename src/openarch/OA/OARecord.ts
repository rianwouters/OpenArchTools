import Archive from '../Archive.js';
import Record from '../Record.js';
import OAPerson from './OAPerson.js';
import A2ARecord from '../A2A/A2ARecord.js';
import axios from 'Axios';
import { Agent } from 'https';
import Person from '../Person.js';
import { show } from '../API.js';

export default class OARecord implements Record {
    readonly place: string = '';
    readonly type: string = '';
    readonly source: string = '';
    readonly guid: string = '';
    readonly url: string;
    readonly date: Date;
    readonly relations: { type: String, person: Person }[];;
    readonly archive: Archive;

    // TODO specify type
    constructor(doc: any) {
        const { eventdate: { year = 0, day = 0, month = 0 } = {} } = doc;
        this.date = new Date(year, month - 1, day);

        const { relationtype, pid, personname } = doc
        this.relations = [
            {
                type: relationtype,
                person: new OAPerson(pid, personname)
            }
        ]

        const { archive_code, archive, archive_org } = doc
        this.archive = new Archive(archive_code, archive, archive_org);

        const { eventplace, eventtype, sourcetype, identifier, url } = doc;
        this.place = eventplace;
        this.type = eventtype;
        this.source = sourcetype;
        this.guid = identifier;
        this.url = url;
    }

    async fetch() {
        return show({ archive_id: this.archive.id, guid: this.guid })
    };
}
