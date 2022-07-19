import axios from 'axios';
import { Agent } from 'https';
import OAEventRecord from './OA/OAEventRecord.js';
import A2AEventRecord from './A2A/A2AEventRecord.js'
import EventRecord from './EventRecord.js';

export default class Records {
    static _Api = axios.create({
        baseURL: 'https://api.openarch.nl/1.0/',
        httpsAgent: new Agent({ rejectUnauthorized: false })
    });

    // TODO: specify params type
    // TODO: specify docs type
    static async _query(path: string, params: any): Promise<object[]> {
        const res = await this._Api.get(path, { params });

        if (!res) throw "No response";

        if (!res.data) throw "No data in response";

        if (!res.data.response) "No response in data";        

        if (!res.data.response.number_found) return [];

        console.log(JSON.stringify(res.data.response, null, 2));

        return res.data.response.docs;
    };

    // TODO: specify type of d
    // TODO: add separate parameters
    static async search(params: any): Promise<EventRecord[]> {
        const r = await this._query('records/search.json', params)
        return r.map((d: any) => new OAEventRecord(d));
    };

    // TODO: specify type of d
    static async match(name: string, birthyear: number): Promise<EventRecord[]> {
        const r = await this._query('records/match.json', { name, birthyear })
        return r.map((d: any) => new OAEventRecord(d));
    };

    // TODO: specify type of params
    static async children(params: any) {
        const res = await this._Api.get('related/children.json', { params });
        if (!res) throw "No response";

        if (!res.data) throw "No data in response";

        if (!res.data.response) throw "Response in data";
        
        console.log(res.data.response)

        if (!res.data.response.number_found) return [];
        //TODO: specify type of d
        return res.data.response.children.map((d: any) => new OAEventRecord(d));
    };

    static async fetch(url: string): Promise<EventRecord> {
        const res = await axios.get(url, { httpsAgent: new Agent({ rejectUnauthorized: false }) });
        return new A2AEventRecord(res.data[0])
    };

}