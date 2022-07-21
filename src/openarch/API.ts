import axios from 'axios';
import { Agent } from 'https';
import OARecord from './OA/OARecord.js';
import A2ARecord from './A2A/A2ARecord.js'
import Record from './Record.js';

const _Api = axios.create({
    baseURL: 'https://api.openarch.nl/1.0/',
    httpsAgent: new Agent({ rejectUnauthorized: false })
});

// TODO: specify params type
// TODO: specify docs type
async function _query(path: string, params: any): Promise<object[]> {
    const res = await _Api.get(path, { params });

    if (!res) throw "No response";

    if (!res.data) throw "No data in response";

    if (!res.data.response)
        return res.data;

    return res.data.response.docs;
};

type SearchParams = {
    query: string,
    when: string,
    eventplace?: string,
    relationtype?: string, // TODO make this an enumeration
    source_type?: string, // TODO make this an enumeration
    archive_code?: string,
    sort?: number, // TODO make this an enumeration
    number_show?: number, // TODO how to get more than 100 results automagically
    start?: number,
    lang?: string
};



// TODO: specify type of d
export async function search({ query, when, eventplace, relationtype, source_type, archive_code, sort, number_show, start, lang }: SearchParams): Promise<Record[]> {
    const r = await _query('records/search.json', {
        name: when ? `${query} ${when}` : query,
        ...eventplace && { eventplace },
        ...relationtype && { relationtype },
        ...source_type && { source_type },
        ...archive_code && { archive: archive_code },
        ...sort && { sort },
        ...number_show && { number_show },
        ...start && { start },
        ...lang && { lang }
    });
    return r.map((d: any) => new OARecord(d));
};


type MatchParams = {
    name: string,
    birthyear: number
};

// TODO: specify type of d
export async function match(params: MatchParams): Promise<Record[]> {
    const r = await _query('records/match.json', params);
    return r.map((d: any) => new OARecord(d));
};



type ShowParams = {
    guid: string,
    archive_id: String
};

export async function show({ archive_id, guid }: ShowParams): Promise<Record[]> {
    const r = await _query('records/show.json', { archive: archive_id, identifier: guid });
    return r.map((d: any) => new A2ARecord(d));
};

// TODO: specify type of params
export async function children(params: any) {
    const res = await _Api.get('related/children.json', { params });
    if (!res) throw "No response";

    if (!res.data) throw "No data in response";

    if (!res.data.response) throw "Response in data";

    //TODO: specify type of d
    return res.data.response.children.map((d: any) => new OARecord(d));
};