import { Records, EventRecord } from './openarch';

try {
  let recs: EventRecord[];

  // recs = await Records.search({ name: '(~Anna) Fran* 1715-1725', sort: 4, number_show: 100, eventplace: 'Breugel' })

  // recs.forEach(r => {
  //   console.log(`${r.date} ${r.type} ${r.relations[0].type} ${r.relations[0].person.fullName} ${r.place}`);
  // })

  recs = await Records.match('Joanna Jans*', 1718)

  recs.forEach(r => {
    console.log(`${r.date} ${r.type} ${r.relations[0].type} ${r.relations[0].person.fullName} ${r.place}`);
  })

  // recs = await Records.children({ father: "*", mother: "*", lang: 'nl' })

  // recs.forEach(rec => {
  //   console.log(`${rec.date} ${rec.type} ${rec.relations[0].type} ${rec.relations[0].person.fullName} ${rec.place}`);
  // })

  const rec = await Records.fetch('https://www.openarch.nl/rhe:1D4A2B93-DAD2-4E73-B3E9-2977D553477F')
  console.log(JSON.stringify(rec, undefined, 2))

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
- The data van de related/children API is niet gelijkvormig met de data van de search en match API's
    - archive ipv archive_code
    - eventyear ipv eventdate { year } 
    - archive info onvolledig
- A2A documenten hebben alle property namen dubbel bv.
    "a2a_PersonKeyRef": {
      "a2a_PersonKeyRef": "Person919088172"
    },
- uitkomst van match mist het archive_code veld
*/
