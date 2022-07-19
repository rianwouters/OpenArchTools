export default interface A2AEventJson {
    eid: string,
    a2a_EventType: {
        a2a_EventType: string
    },
    a2a_EventDate: {
        a2a_LiteralDate: {
            a2a_LiteralDate: string
        },
        a2a_Year: {
            a2a_Year?: number
        },
        a2a_Month: {
            a2a_Month?: number
        }
        a2a_Day: {
            a2a_Day?: number
        }
    },
    a2a_EventPlace: {
        a2a_EventPlace: string
    }
};