import axios from 'axios';
import https from 'https';
import EventRecord from './EventRecord.js';
import A2AEventRecord from './A2A/A2AEventRecord.js'

export default class Records {
    static _Api = axios.create({
        baseURL: 'https://api.openarch.nl/1.0/',
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });


    static async _query(path, params) {
        const res = await this._Api.get(path, { params });

        if (!res) throw Exception("No response");

        if (!res.data) throw Exception("No data in response");

        if (!res.data.response) throw Exception("Response in data");

        if (!res.data.response.number_found) return [];

        return res.data.response
    };

    static async search(params) {
        const r = await this._query('records/search.json', params)
        return r.docs.map(d => new EventRecord(d));
    };

    static async match(name, birthyear) {
        const r = this._query('records/match.json', { name, birthyear })
        return r.docs.map(d => new EventRecord(d));
    };

    static async children(params) {
        const res = await this._Api.get('related/children.json', { params });
        console.log(res)
        if (!res) throw "No response";

        if (!res.data) throw "No data in response";

        if (!res.data.response) throw "Response in data";

        if (!res.data.response.number_found) return [];

        return res.data.response.children.map(d => new EventRecord(d));
    };

    static async fetch(url) {
        const res = await axios.get(url, { httpsAgent: new https.Agent({ rejectUnauthorized: false }) });
        return new A2AEventRecord(res.data[0])
    };

}