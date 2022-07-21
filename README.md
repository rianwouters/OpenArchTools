# OpenArchTools
Toolset voor Open Archieven

## Issues
- Er meer API paden beschikbaar dan in de specificatie beschreven, o.a.
    - related/children.json
    - related/ancestors.json
    <p>Zijn er nog meer en wat is de specificatie ervan?</p>
- Over het gebruik van wildcards is weinig beschreven. Is daar een eenduidige specificatie van? Een aantal concrete problemen heb ik ook [hier](https://www.stamboomforum.nl/subfora/4/2/85171/0/#660754) beschreven.
- De JSON formaten van de verschillende query API’s zijn niet eenduidig, bv.
    - De search API gebruikt het archive_code veld, de children API heeft alleen archive
    - De children API bevat in het resultaat niet de persoonsnamen
    - De children API gebruikt  eventyear, ipv eventdata { year, month, date }. Waarom?
- De URI’s om de volledige documenten binnen te halen gebruiken een soort van A2A JSON formaat. Dit is helaas niet voor alle API's het geval. Dat zou het een stuk eenvoudiger en eenduidiger programmeren zijn.
- De A2A documenten gebruiken veldnamen die allen prefix a2a_ hebben. Dat lijkt nogal overkill en is niet in lijn met het [A2A Datamodel](https://a2a.coret.org/A2A/A2ABeschrijving_v1.8.pdf).
- De A2A JSON documenten hebben overal dubbele, geneste, veldnamen. 
- search en match retourneren hun data in response.data.response met een number_found veld; show doet dat niet helaas.