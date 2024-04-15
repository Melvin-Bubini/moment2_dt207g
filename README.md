API
Detta repository innehåller kod för ett enklare REST API byggt med Express. APIet är byggt för att hantera olika kurser som jag studerat under min tid på Mittuniversitetet. Grundläggande funktionalitet för CRUD (Create, Read, Update, Delete) är implementerad.

Installation, databas
APIet använder en MySQL-databas. Klona ner källkodsfilerna, kör kommando npm install för att installera nödvändiga npm-paket. Kör installations-skriptet install.js. Installations-skriptet skapar databastabeller enligt nedanstående:

Tabell-namn	Fält
Tabell1	id (integer), fält1 (varchar(255)), fält2 (varchar(255)), fält3 (varchar(255)), fält4 (varchar(255))
Tabell2	id (integer), fält1 (varchar(255)), fält2 (varchar(255)), fält3 (varchar(255)), fält4 (varchar(255))
Användning
Nedan finns beskrivet hur man nå APIet på olika vis:

Metod	Ändpunkt	Beskrivning
GET	/courses	Hämtar alla tillgängliga cv.
GET	/courses/:ID	Hämtar ett specifik cv med angivet ID.
POST	/courses	Lagrar ett ny cv
PUT	/courses/:ID	Uppdaterar en existerande kurs med angivet ID
DELETE	/courses/:ID	Raderar ett cv med angivet ID.
Ett kurs-objekt returneras/skickas som JSON med följande struktur:

{
   "id": "1",
   "companyname": "Nordic green design ",
   "jobtitle": "Leverantör",
   "location": "Spånga"
   "posted": "14:15:35 "
}