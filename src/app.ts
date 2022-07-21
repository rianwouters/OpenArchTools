import { search, match, show, Record } from './openarch';

try {
  let recs: Record[];

  recs = await search({
    query: '(~Anna) Fran*"',
    when: '1715-1725',
    sort: 5,
    number_show: 100,
    eventplace: 'Breugel',
    archive_code: undefined
  })

  recs.forEach(r => {
    console.log(`${r.date} ${r.type} ${r.relations[0].type} ${r.relations[0].person.fullName} ${r.place}`);
  })

  recs = await match({
    name: 'Joanna Jansse',
    birthyear: 1718
  });

  recs.forEach(r => {
    console.log(`${r.date} ${r.type} ${r.relations[0].type} ${r.relations[0].person.fullName} ${r.place}`);
  })

  // recs = await Records.children({ father: "*", mother: "*", lang: 'nl' })

  // recs.forEach(rec => {
  //   console.log(`${rec.date} ${rec.type} ${rec.relations[0].type} ${rec.relations[0].person.fullName} ${rec.place}`);
  // })

  // const rec = await Records.fetch('https://www.openarch.nl/rhe:1D4A2B93-DAD2-4E73-B3E9-2977D553477F');
  // console.log(JSON.stringify(rec, undefined, 2));

  const rec = await show({ archive_id: 'rhe', guid: '1D4A2B93-DAD2-4E73-B3E9-2977D553477F' });
  console.log(JSON.stringify(rec, undefined, 2));

} catch (err) {
  console.log(err)
}


/* TODO
- split search param fields 
- Related/Census
- Related/Weather
- Related/children
- Related/ancestors
*/