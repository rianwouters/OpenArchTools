import '../ArraytoObject.js'
import A2APerson from './AAPerson.js';

export default class A2AEventRecord {
    constructor(o) {
        const {
            a2a_Person: persons,
            a2a_Event: {
                eid: id,
                a2a_EventType: {
                    a2a_EventType: type
                },
                a2a_EventDate: {
                    a2a_LiteralDate: {
                        a2a_LiteralDate: literalDate
                    },
                    a2a_Year: {
                        a2a_Year: year = 0
                    },
                    a2a_Month: {
                        a2a_Month: month = 0
                    },
                    a2a_Day: {
                        a2a_Day: day = 0
                    }
                } = {},
                a2a_EventPlace: {
                    a2a_EventPlace: place
                }
            },
            a2a_RelationEP: relations
        } = o;
        // TODO: make these properties
        this.id = id;
        this.type = type;
        this.place = place;
        this.literalDate = literalDate;
        this.date = new Date(year, month - 1, day);
        this.persons = persons.toObject(p => p.pid, p => new A2APerson(p));        
        this.relations = relations.map(r => {
            const {
                a2a_EventKeyRef: {
                    a2a_EventKeyRef: ref
                }, 
                a2a_RelationType: {
                    a2a_RelationType: relation
                },
                a2a_PersonKeyRef: {
                    a2a_PersonKeyRef: personRef
                }
            } = r
            console.log(personRef)
            if (ref != id) throw `Unknown event reference ${JSON.stringify(ref)}`;
            return {
                relation,
                person: this.persons[personRef]
            }
        });
    }
}
