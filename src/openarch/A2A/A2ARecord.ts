import '../util/ArraytoObject.js'
import Record from '../Record.js';
import A2APerson from './A2APerson.js';
import A2ARelationJson from './json/A2ARelationJson.js';
import A2ARecordJson from './json/A2ARecordJson.js';

export default class A2ARecord implements Record {
    readonly id: string;
    // TODO implement
    readonly guid: string = '';
    // TODO implement
    readonly source: string = '';
    // TODO implement
    readonly url: string = '';
    readonly type: string;
    readonly place: string;
    readonly literalDate: string;
    readonly date: Date;
    readonly persons: { [id: string]: A2APerson };
    readonly relations: { type: String, person: A2APerson }[];

    // TODO specify type of o
    constructor(o: A2ARecordJson) {
        const {
            a2a_Person: persons,
            a2a_Event: {
                eid: id,
                a2a_EventType: {
                    a2a_EventType: type
                },
                a2a_EventDate: {
                    a2a_LiteralDate: {
                        a2a_LiteralDate: literalDate = ''
                    } = {},
                    a2a_Year: {
                        a2a_Year: year = 0
                    } = {},
                    a2a_Month: {
                        a2a_Month: month = 0
                    } = {},
                    a2a_Day: {
                        a2a_Day: day = 0
                    } = {}
                } = {},
                a2a_EventPlace: {
                    a2a_EventPlace: place
                }
            },
            a2a_RelationEP: relations
        } = o;

        this.id = id;
        this.type = type;
        this.place = place;
        this.literalDate = literalDate;
        this.date = new Date(year, month - 1, day);

        this.persons = persons.toObject(p => p.pid, p => new A2APerson(p));

        this.relations = relations.map((r: A2ARelationJson) => {
            const {
                a2a_EventKeyRef: {
                    a2a_EventKeyRef: eventRef
                },
                a2a_RelationType: {
                    a2a_RelationType: type
                },
                a2a_PersonKeyRef: {
                    a2a_PersonKeyRef: personRef
                }
            } = r

            if (eventRef != id)
                throw `Unknown event reference ${JSON.stringify(eventRef)}`;

            return {
                type,
                person: this.persons[personRef]
            }
        });
    }
}
