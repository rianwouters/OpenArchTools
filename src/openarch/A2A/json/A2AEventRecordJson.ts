import A2AEventJson from "./A2AEventJson"
import A2APersonJson from "./A2APersonJson"
import A2ARelationJson from "./A2ARelationJson"

export default interface A2AEventRecordJson {
    a2a_Person: A2APersonJson[],
    a2a_Event: A2AEventJson,
    a2a_RelationEP: A2ARelationJson[]
};