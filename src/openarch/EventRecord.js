import objectMap from 'object.map';
import Archive from './Archive.js';
import Person from './Person.js';
import A2AEventRecord from './A2A/A2AEventRecord.js'

export default class EventRecord {
    static fieldMap = {
        place: 'eventplace',
        type: 'eventtype',
        source: 'sourcetype',
        guid: 'identifier',
        url: 'url'
    };

    static {
        function propertyDef(v, k) {
            return { get: function () { return this[`_${k}`]; } };
        }
        Object.defineProperties(this.prototype, objectMap(this.fieldMap, propertyDef));
    }

    constructor(doc) {
        console.log(doc)

        const { eventdate: { year = 0, day = 0, month = 0 } = {} } = doc;
        this._date = new Date(year, month - 1, day);

        const { relationtype, personname, pid } = doc
        this.relations = [
            {
                relation: relationtype,
                person: new Person(pid, personname)
            }
        ]

        const { archive_code, archive, archive_org } = doc
        this.archive = new Archive(archive_code, archive, archive_org)

        for (const [k, v] of Object.entries(this.constructor.fieldMap))
            this[`_${k}`] = doc[v];
    }

    get date() {
        return this._date;
    }

    async fetch() {
        const res = await axios.get(this._url, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
        return new A2AEventRecord(res.data[0])
    };
}
