import { Records } from './openarch/index.js';
import axios from 'axios';

try {
  let docs

  // docs = await Records.search({ name: '(~Anna) Fran* 1715-1725', sort: 4, number_show: 100, eventplace: 'Breugel' })

  // docs.forEach(rec => {
  //   console.log(`${rec.date} ${rec.event} ${rec.persons[0].role} ${rec.persons[0].person.name} ${rec.place}`);
  // })

  // docs = await Records.match('Joanna Jansse', 1718)

  // docs.forEach(rec => {
  //   console.log(`${rec.date} ${rec.event} ${rec.persons[0].role} ${rec.persons[0].person.name} ${rec.place}`);
  // })

  // docs = await Records.children({ father: "*", mother: "*", lang: 'nl'})

  // docs.forEach(rec => {
  //   console.log(`${rec.date} ${rec.event} ${rec.persons[0].role} ${rec.persons[0].person.name} ${rec.place}`);
  // })

  docs = await Records.fetch('https://www.openarch.nl/rhe:1D4A2B93-DAD2-4E73-B3E9-2977D553477F')
  console.log(JSON.stringify(docs, undefined, 2))

} catch (err) {
  console.log(err)
}


/* TODO
- split search param fields 
- how to get complete record info (not only html)
- Related/Census
- Related/Weather
- Related/children
*/

/* ISSUES
- API specificatie van related/children.json?
- Gebruik van wildcards bij Children?
- A2A documenten hebben alle property namen dubbel bv.
    "a2a_PersonKeyRef": {
      "a2a_PersonKeyRef": "Person919088172"
    },

*/
