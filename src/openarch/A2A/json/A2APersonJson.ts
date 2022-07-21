export default interface A2APersonJson {
    pid: string;
    a2a_PersonName: {
        a2a_PersonNameFirstName?: {
            a2a_PersonNameFirstName: string;
        };
        a2a_PersonNamePrefixLastName?: {
            a2a_PersonNamePrefixLastName?: string;
        };
        a2a_PersonNameLastName?: {
            a2a_PersonNameLastName?: string;
        };
    };
};