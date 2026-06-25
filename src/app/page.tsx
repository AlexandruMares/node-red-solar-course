import Link from "next/link";

const moduleData: Record<string, { title: string; color: string; lessons: { title: string; content: string }[] }> = {
  "modul-1": {
    title: "Modulul 1 — Baze Node-RED",
    color: "blue",
    lessons: [
      {
        title: "Ce este Node-RED și cum funcționează intern",
        content: `## Ce este Node-RED?

Node-RED este un instrument visual de automatizare bazat pe programare prin fluxuri (flow-based programming). A fost creat de IBM în 2013 și este open-source. Rulează pe Node.js, ceea ce înseamnă că motorul runtime este JavaScript pur.

### Arhitectura internă

Node-RED constă în trei componente principale:

1. **Runtime Engine** — motorul care rulează pe Node.js. Gestionează execuția nodurilor, mesajele între nodurile, și programarea evenimentelor.

2. **Editor UI** — interfața web (http://localhost:1880) unde construiești fluxuri trăgând noduri și legându-le.

3. **Message Broker** — sistemul intern care circulă mesaje între noduri.

### Ce se întâmplă când apeși "Deploy"?

Când apeși butonul Deploy, Node-RED:
1. Validează toate conexiunile dintre noduri
2. Creează un graf directed al fluxului
3. Inițializează fiecare nod cu configurația sa
4. Pornește event listener-urile pentru nodurile cu intrări (Inject, MQTT inputs, etc.)
5. Fluxul este acum "live" și procesează mesaje

### Cum funcționează mesajele?

Un mesaj (msg) este un obiect JavaScript care circulă între noduri. Conține:
- \`msg.payload\` — datele principale (ori ceea ce vrei să transmiți)
- \`msg.topic\` — subiectul/opțional, folosit pentru filtrare
- \`msg._id\` — identificator unic al mesajului
- \`msg.complete\` — flag dacă mesajul e complet procesat

Când un nod procesează un mesaj, poate modifica payload-ul, adăuga proprietăți noi, sau returna unul/noi mesaje. Dacă intoarce null, fluxul se oprește pe acea cale.

### Ce sunt nodurile?

Un nod este o funcție JavaScript care primește mesaje, face procesare, și intoarce rezultate. Fiecare nod are:
- **Intrări** (inputs) — primesc mesaje de la alte noduri
- **Ieșiri** (outputs) — trimit mesaje către alte noduri
- **Configurație** — setări definite de utilizator (ex: topic pentru MQTT, payload pentru Inject)

Exemplu simplu — un nod Function conține:
\`\`\`javascript
// Acest cod rulează pentru fiecare mesaj primit
msg.payload = msg.payload * 2;  // dublează valoarea
return msg;  // trimite mesajul modificat mai departe
\`\`\`

## Exercițiu practic

1. Pornește Node-RED: \`node-red\`
2. Deschide browser: http://localhost:1880
3. Trage un nod "Inject" din paleta stângă
4. Trage un nod "Debug" lângă el
5. Leagă Inject → Debug (trage de la punctul la punct)
6. Dublu-click pe Inject, setează Payload la "number", valoare 42
7. Apasă butonul roșu Deploy
8. Apasă butonul de pe Inject (stânga)
9. Vezi rezultatul în Debug sidebar (dreapta)

**Skills:** Node-RED, Runtime, Mesaje, Noduri, Deploy`
      },
      {
        title: "Instalare și primul flow complet",
        content: `## Instalare Node-RED

Node-RED necesită Node.js (versiunea 18+). Instalare completă:

\`\`\`bash
# Instalare Node.js (dacă nu-l ai)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalare Node-RED
npm install -g --unsafe-perm node-red

# Pornire
node-red

# Acces: http://localhost:1880
\`\`\`

### Ce se întâmplă la pornire?

La pornire, Node-RED:
1. Încarcă runtime-ul Node.js
2. Inițializează express server (backend HTTP)
3. Pornește WebSocket server pentru comunicare cu UI-ul
4. Încarcă toate nodurile instalate din node_modules
5. Deschide porna de editare pe port 1880

### Primul flow pas cu pas

**Pasul 1: Crează un nod Inject**
- Inject trimite un mesaj la un moment dat (manual sau programat)
- Poți seta payload să fie: string, number, boolean, JSON, timestamp
- Poți programa intervalul (la fiecare X secunde sau cron)

**Pasul 2: Crează un nod Debug**
- Afișează mesajele în panoul din dreapta
- Poți alege să afișezi întregul mesaj sau doar o proprietate
- Essential pentru debugging

**Pasul 3: Leagă nodurile**
- Trage de la punctul din dreptul Inject la punctul din stânga Debug
- Aceasta creează o conexiune — mesajele vor trece pe aici

**Pasul 4: Configurează Inject**
- Dublu-click pe Inject
- La Payload, salvează JSON: \`{"temperatura": 24.5}\`
- La Repeat, alege "interval" la 3 secunde

**Pasul 5: Deploy și Test**
- Apasă butonul roșu "Deploy" (sus, dreapta)
- Fluxul pornește — vezi mesajele în Debug

### Ce module sunt disponibile implicit?

Node-RED vine cu noduri built-in:
- **Input:** Inject, mqtt in, http in, tcp in, udp in
- **Output:** Debug, mqtt out, http response, tcp out
- **Function:** Function, switch, change, range, template
- **Dashboard:** gauge, chart, slider, button, text, dropdown
- **Storage:** file in, file out, sqlite, postgresdb, mysql-database
- **Social:** e-mail, feedparse, twitter, telegram bot

### Raspberry Pi

Pe Raspberry Pi, funcționează la fel:
\`\`\`bash
# Pornește Node-RED
node-red-start

# Acces: http://<IP_RPI>:1880
# Oprește: node-red-stop
\`\`\`

**Skills:** Node-RED, Instalare, Node.js, Inject, Debug, Flow, Deploy`
      },
    ],
  },
  "modul-2": {
    title: "Modulul 2 — Hardware Solar",
    color: "amber",
    lessons: [
      {
        title: "Hardware-ul nostru — componentele electronice",
        content: `## Panțul nostru de lucru electronic

Pentru a monitoriza panourile solare, avem nevoie de componente electronice care convertesc semnalele analogice din lumea reală (tensiune, curent, temperatură) în date digitale pe care Raspberry Pi le poate citi.

### Raspberry Pi 4/5 — Computerul central

Raspberry Pi este un single-board computer de dimensiuni reduse (85×56mm).

**Specificații:**
- ARM Cortex-A72 la 1.5GHz sau ARM Cortex-A76 la 2.4GHz
- 1GB / 2GB / 4GB / 8GB RAM
- GPIO: 40 pini (digitale + analogice) cu suport I2C, SPI, UART
- Alimentare: USB-C 5V/3A
- Sistem de operare: Raspberry Pi OS (bazat pe Debian)

**Ce e I2C?**
I2C (Inter-Integrated Circuit) este un protocol de comunicație serială care conectează microcontroller-uri cu periferice. Folosă fire date (SDA) și ceas (SCL). Fiecărui i se asociază o adresă unică (ex: ADS1115 la 0x48).

**Ce e ADC?**
ADC (Analog-to-Digital Converter) convertește tensiunea analogică (continuă) într-o valoare digitală (discretă). Raspberry Pi nu are intrări ADC — de aceea folosim ADS1115 (un ADC extern pe I2C).

### ADS1115 — Convertor Analog-Digital 16-bit

**Ce face?** Citește tensiune analogică și o convertește în valoare digitală I2C.

**Specificații:**
- Rezoluție: 16 bit (0-65535)
- 4 intrări analogice (A0-A3)
- Precizie: ±0.25%
- Tensiune de referință internă (2.048V sau 4.096V)
- Interfață: I2C (adresă configurabilă, implicit 0x48)
- Frecvență de esantionare: 8-860 SPS

**Conectare ADS1115 → Raspberry Pi:**
\`\`\`
ADS1115      Raspberry Pi
VCC      →   3.3V (pin 1)
GND      →   GND  (pin 6)
SCL      →   SCL  (GPIO 3, pin 5)
SDA      →   SDA  (GPIO 2, pin 3)
\`\`\`

### ACS712 — Senzor curent cu efect Hall

**Ce face?** Măsoară curentul alternativ sau continuu prin câmp magnetic.

**Cum funcționează?**
Conductorul curent "trece" printr-un material semiconduct care produce un câmp magnetic. ACS712 detectează acest câmp și produce o tensiune proporțională.

**Specificații (versiunea 30A):**
- Sensibilitate: 66mV/A curent primit
- Tensiune zero (fără curent): 2.5V
- Curent maxim: 30A curent primit
- Alimentare: 5V curent primit

**Formula:**
\`\`\`
Tensiune citită = 2.5V + (I × 0.066V/A)
I = (tensiune_citită - 2.5) / 0.066
\`\`\`

### Divizor de tensiune

Un divizor de tensiune este un circuit simplu cu doi rezistenți care împarte o tensiune mare într-o tensiune mică.

\`\`\`      R1 (10k)
Vin ───┬───/\/\/\───┬─── Vout
       │            │
       │       ADC A0
       │            │
       └───/\/\/\───┘
           R2 (2.2k)

Formula: Vout = Vin × R2 / (R1 + R2)
Cu valorile noastre: Vout = Vin × 2.2 / 12.2 ≈ Vin / 5.55
Pentru a obține Vin: Vin = Vout × 5.55
\`\`\`

### DS18B20 — Senzor temperatură digital

**Ce face?** Măsoară temperatură și o transmite pe protocolul One-Wire.

**Specificații:**
- Rezoluție: 12 bit (0.0625°C precizie)
- Tensiune: 3V-5V curent primit
- Precizie: ±0.5°C (de la -10°C la +85°C)
- Comunicație: One-Wire (doar un fir de date)

**Conectare:**
\`\`\`          R (4.7kΩ pull-up)
DS18B20     ┌─────┐
VCC ────────│1    │
GND ────────│2    │
DATA ───────│3    │─── R ─── VCC
   └─────┘       │
                GPIO 4 (pin 7)
\`\`\`

### Releu modul — Comutator electronic

Un releu este un comutator acționat magnetic. Când încarci bobina, contactul se schimbă.

**Specificații tipice:**
- Curent: 5V (bobină)
- Curent contact: 250V AC / 10A
- Izolare: bobina și contact sunt izolate galvanic

**Conectare la Raspberry Pi:**
\`\`\`
              Raspberry Pi
GPIO 17 ────  Resistor (1kΩ) ──── BJT Base
                                                │
                                    ┌─────────┘
                                    │ GND
                                    │
VCC (5V) ──────────────────────────► Relays VCC
GND ───────────────────────────────► Relays GND
\`\`\`

**Skills:** Raspberry Pi, ADS1115, I2C, ADC, ACS712, Hall Effect, Divizor Tensiune, DS18B20, One-Wire, Releu`
      },
    ],
  },
  "modul-3": {
    title: "Modulul 3 — AI în Node-RED",
    color: "violet",
    lessons: [
      {
        title: "Fundamentele programării JavaScript pentru Node-RED",
        content: `## JavaScript pentru Function nodes

Function node-ul din Node-RED rulează cod JavaScript pur. Înțelegerea Fundamentelor JS este esențială pentru a automatiza corect.

### Variabile: var, let, const

\`\`\`javascript
// var — funcțională, are function scope (evită-l)
var x = 10;  // poate fi redeclarată

// let — block scope (preferat când variabila se schimbă)
let tensiune = 12.5;
tensiune = 13.2; // OK

// const — block scope, nu poate fi modificată (preferat pentru valori fixe)
const factor = 5.55;
// factor = 5; // EROARE!
\`\`\`

### Tipuri de date

\`\`\`javascript
let numar = 42;                    // number
let text = "Node-RED";             // string
let activ = true;                  // boolean
let nulo = null;                   // null (intenționat gol)
let obiect = {tensiune: 12};      // object
let vector = [12, 13, 14];         // array
\`\`\`

### Obiecte — acces proprietăți

\`\`\`javascript
let masuratoare = {
    tensiune: 12.5,
    curent: 2.3,
    putere: function() {
        return this.tensiune * this.curent;
    }
};

// Acces:
let t = masuratoare.tensiune;      // 12.5
let p = masuratoare.putere();      // calculează
\`\`\`

### Funcții

\`\`\`javascript
// Funcție simplă
function dublare(valoare) {
    return valoare * 2;
}

// Arrow function (preferat pentru expresii scurte)
const converteste = (vout) => (vout - 2.5) / 0.066;

// Funcție cu parametri impliciți
function scale(v, factor = 5.55) {
    return v * factor;
}
\`\`\`

### JSON — JavaScript Object Notation

JSON este formatul principal de date în Node-RED.

\`\`\`javascript
// Creare JSON
let payload = {
    timestamp: new Date().toISOString(),
    valori: {
        tensiune: 12.5,
        curent: 2.3
    },
    status: "OK"
};

// Accesare nested
let t = payload.valori.tensiune;

// Modificare
payload.valori.putere = payload.valori.tensiune * payload.valori.curent;

// Stringify (pentru trimitere către API)
let text = JSON.stringify(payload);
// Reîntoarcere din string
let obiect = JSON.parse(text);
\`\`\`

### Array-uri utile

\`\`\`javascript
let valori = [12.1, 12.3, 12.5, 12.7];

// Iterare
valori.forEach(v => node.warn(v));

// Filtru
let mari = valori.filter(v => v > 12.4);

// Map (transformare)
let dublate = valori.map(v => v * 2);

// Reduce (suma)
let suma = valuri.reduce((acc, v) => acc + v, 0);

// Medie
let media = suma / valori.length;
\`\`\`

### Async/Await — operații asincrone

\`\`\`javascript
//În Function node cu setat "async function"
try {
    var response = await global.fetch("https://api.example.com/data");
    var data = await response.json();
    msg.payload = data;
    return msg;
} catch (error) {
    node.error("Eroare: " + error.message, msg);
    return null;
}
\`\`\`

### Context — memorie persistentă

\`\`\`javascript
// node context — valabil doar pentru acest nod
node.context().ultimaValoare = msg.payload;

// flow context — întregul flux (toate nodurile din acest flow)
flow.context().total = (flow.context().total || 0) + 1;

// global context — accesibil din toate fluxurile
global.config = global.config || { prag: 20 };
\`\`\`

## Exerciții practice

1. Creează un Function node care primește un array de numere și intoarce media
2. Creează un Function care construiește JSON cu temperatură, umiditate, presiune
3. Creează un Function care citește din flux context și incrementează un contor
4. Creează un Function async care face HTTP request la un API public

**Skills:** JavaScript, Variabile, JSON, Funcții, Async, Context`
      },
    ],
  },
  "modul-4": {
    title: "Modulul 4 — Smart Home & Agent AI",
    color: "emerald",
    lessons: [
      {
        title: "Smart Home — arhitectură și protocoale de comunicație",
        content: `## Ce este un Smart Home?

Un Smart Home (casă inteligentă) este un ecosistem de dispozitive electronice conectate într-o rețea locală (sau internet) care pot fi monitorizate și controlate automat.

### Componentele unui ecosistem Smart Home

1. **Senzori** — măsoară: temperatură, umiditate, lumină, prezență, fum, temperatură panouri
2. **Actuatori** — acționează: divizori, lumini, prize, motoare, relee
3. **Gateway/Hub** — centrala care coordonează tot (Node-RED în cazul nostru)
4. **Protocoale** — limbajul în care vorbesc dispozitivele între ele
5. **Interfață** — dashboard-ul unde vezi ce se întâmplă

### Protocoale de comunicație comparate

| Protocol | Tip | Viteză | Consum | Range | Utilizare |
|---|---|---|---|---|---|
| **MQTT** | Pub/Sub | Rapid | Foarte mic | LAN/WAN | Senzori, IoT |
| **HTTP REST** | Request/Response | Rapid | Mediu | WAN | API-uri, control |
| **Zigbee** | Mesh | 250kbps | Foarte mic | 10-100m | Casă inteligentă |
| **Z-Wave** | Mesh | 9.6kbps | Mic | 30-100m | Casă inteligentă |
| **WiFi** | TCP/IP | Foarte rapid | Mediu/mare | 50m+ | Dispozitive puternice |
| **Bluetooth LE** | Point-to-point | 1Mbps | Foarte mic | 10-50m | Wearables, senzori |
| **I2C** | Serial | 400kbps | Mic | <1m | Chip-uri pe placă |
| **One-Wire** | Serial | 16kbps | Mic | 100m | Senzori temperatură |

### MQTT — protocolul IoT

**Ce e MQTT?**
MQTT (Message Queuing Telemetry Transport) este un protocol de mesagerie ușor, bazat pe publicare/subscriere. A fost creat de IBM în 1999 pentru sateliți și pipeline-uri de țiței.

**Arhitectura:**
\`\`\`
┌──────────┐     ┌─────────────┐     ┌──────────┐
│ Senzor   │────►│   Broker    │◄────│ Client   │
│(publică) │     │ (Mosquitto) │     │(se abonează)
└──────────┘     └─────────────┘     └──────────┘
\`\`\`

**Funcționare:**
- **Publisher** — trimite mesaje pe un "topic" (ex: casa/solar/tensiune)
- **Subscriber** — primește mesajele de la un topic la care s-a abonat
- **Broker** — intermediar care primește și distribuie mesajele
- **Topic** — categorie ierarhică: casa/paraj/usa, casa/solar/#
- **QOS (Quality of Service):**
  - 0 — cel mult o dată (fire and forget)
  - 1 — cel puțin o dată (confirmare)
  - 2 — exact o dată (cea mai sigură, cea mai lentă)

**Avantaje MQTT:**
- Consum minim de baterie
- Funcționează pe conexiuni instabile
- Un broker poate servi mii de clienți
- Limbaj simplu, ușor de implementat

**Dezavantaje:**
- Nu are criptare implicită (trebuie configurată)
- Broker-ul este un punct unic de eșec
- Nu e optim pentru transfer de fișiere mari

### HTTP REST — protocolul web

**Ce e REST?**
REST (Representational State Transfer) este un stil arhitectural pentru servicii web. Folosește metode HTTP standard.

**Metode HTTP:**
| Metodă | Ce face | Exemplu |
|---|---|---|
| GET | Citește date | GET /api/senzori |
| POST | Creează/trimite date | POST /api/comenzi |
| PUT | Actualizează complet | PUT /api/senzori/1 |
| PATCH | Actualizează parțial | PATCH /api/senzori/1 |
| DELETE | Șterge | DELETE /api/senzori/1 |

**Coduri de răspuns:**
- 200 OK — succes
- 201 Created — creat cu succes
- 400 Bad Request — cerere invalidă
- 401 Unauthorized — neautentificat
- 404 Not Found — nu există
- 500 Internal Server Error — eroare server

**Headers (anteturi):**
- Content-Type: application/json — formatul datelor
- Authorization: Bearer <token> — autentificare
- Accept: application/json — ce format aștept

**Exemplu HTTP request în Node-RED:**
\`\`\`javascript
// HTTP Request node configurat:
// Method: GET
// URL: https://api.open-meteo.com/v1/forecast?latitude=44.43&longitude=26.10&current_weather=true

// Răspunsul vine în msg.payload:
let vreme = msg.payload.current_weather.temperature;
let vant = msg.payload.current_weather.windspeed;
\`\`\`

### Zigbee vs Z-Wave vs WiFi

**Zigbee:**
- Standard IEEE 802.15.4
- Mesh network (fiecare dispozitor poate ruta)
- 2.4GHz (interferențe cu WiFi)
- Până la 65000 dispozitive pe rețea
- Exemplu: Philips Hue, IKEA Tradfri

**Z-Wave:**
- Proprietar (Silicon Labs)
- Sub-1GHz (mai puține interferențe)
- Mesh network
- Până la 232 dispozitive
- Exemplu: Fibaro, Aeotec

**WiFi:**
- Standard IEEE 802.11
- Consum mai mare
- Rădăcină mare
- Exemplu: Shelly, Meross, Sonoff

### Cum alegem protocolul?

| Criteriu | MQTT | HTTP | Zigbee | WiFi |
|---|---|---|---|---|
| Consum redus | ✅ | ❌ | ✅ | ❌ |
| Real-time | ✅ | ❌ | ✅ | ✅ |
| Complexitate | Mediu | Mare | Mare | Mică |
| Interoperabilitate | Mare | Mare | Mediu | Mare |
| Cost hardware | Mic | Mediu | Mediu | Mic |

**Skills:** Smart Home, MQTT, HTTP REST, Zigbee, Z-Wave, WiFi, Protocol, IoT`
      },
    ],
  },
};

export default function Page() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/[0.08] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.24em] text-blue-200 mb-6">
          Curs practic · Română · Hardware real
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.06] mb-6">
          Curs Node-RED & AI
          <span className="block bg-gradient-to-r from-white via-neutral-200 to-blue-300 bg-clip-text text-transparent">
            pentru Smart Home
          </span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-3xl">
          4 module, 36 lecții practice. De la zero la un sistem complet de monitorizare panouri solare, control divizori smart și agent AI care optimizează consumul automat.
        </p>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="text-2xl font-semibold">4</div><div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">Module</div></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="text-2xl font-semibold">36</div><div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">Lecții</div></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="text-2xl font-semibold">RO</div><div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">Română</div></div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><div className="text-2xl font-semibold">Real</div><div className="mt-1 text-[10px] uppercase tracking-widest text-neutral-500">Hardware</div></div>
        </div>
      </section>

      {/* Module */}
      {Object.entries(moduleData).map(([slug, mod], mIdx) => (
        <section key={slug} id={slug} className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center gap-4 mb-8">
            <div className={`w-12 h-12 rounded-2xl bg-${mod.color}-500/10 border border-${mod.color}-400/20 flex items-center justify-center text-lg font-mono font-bold text-${mod.color}-300`}>
              {mIdx + 1}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{mod.title}</h2>
              <p className="text-sm text-neutral-500">{mod.lessons.length} lecții practice</p>
            </div>
          </div>
          <div className="space-y-3">
            {mod.lessons.map((lesson, lIdx) => (
              <LessonCard key={lIdx} lesson={lesson} moduleIdx={mIdx} lessonIdx={lIdx} slug={slug} color={mod.color} />
            ))}
          </div>
        </section>
      ))}

      {/* Final */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-500/[0.06] p-6 md:p-10">
          <h2 className="text-3xl font-medium tracking-tight mb-6">La finalul cursului</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral-300">
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Instalează și configurează Node-RED</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Citește senzori tensiune/curent cu ADC</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Controlează relee și divizori din browser</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Afișează dashboard cu valori reale</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Programează acțiuni automate</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Publică date prin MQTT</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Detectează anomalii și trimite alerte</div>
            <div className="flex items-start gap-3"><span className="text-emerald-400">✅</span> Construiește un agent AI basic</div>
          </div>
        </div>
      </section>
    </div>
  );
}

function LessonCard({ lesson, lessonIdx, slug, color }: { lesson: { title: string; content: string }; moduleIdx: number; lessonIdx: number; slug: string; color: string }) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/[0.035] overflow-hidden">
      <summary className="flex items-center gap-4 p-5 cursor-pointer hover:bg-white/[0.02] transition-colors list-none">
        <div className="w-8 h-8 rounded-lg bg-white/[0.06] flex items-center justify-center text-xs font-mono text-neutral-500 shrink-0">
          {lessonIdx + 1}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white truncate">{lesson.title}</h3>
        </div>
        <span className="text-neutral-600 group-open:rotate-180 transition-transform">▾</span>
      </summary>
      <div className="px-5 pb-5 pt-0 border-t border-white/5">
        <div className="pt-5 text-neutral-400 font-light leading-relaxed text-[15px]">
          {renderContent(lesson.content)}
        </div>
      </div>
    </details>
  );
}

function renderContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];

  lines.forEach((line, i) => {
    if (line.startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="bg-black/40 border border-white/10 rounded-2xl p-6 overflow-x-auto my-6 text-sm font-mono text-blue-200">
            {codeLines.join('\n')}
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      return;
    }
    if (inCodeBlock) {
      codeLines.push(line);
      return;
    }
    if (line.startsWith('## ')) {
      elements.push(<h2 key={i} className="text-xl font-medium mt-8 mb-3 text-white">{line.slice(3)}</h2>);
    } else if (line.startsWith('**Skills:**')) {
      const skills = line.replace('**Skills:**', '').split(',').map(s => s.trim()).filter(Boolean);
      elements.push(
        <div key={i} className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/5">
          {skills.map((s, j) => (
            <span key={j} className="px-3 py-1 text-[10px] font-mono rounded-md bg-blue-500/15 border border-blue-400/30 text-blue-200">{s}</span>
          ))}
        </div>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-2" />);
    } else {
      elements.push(<p key={i} className="text-neutral-400 leading-relaxed">{line}</p>);
    }
  });
  return elements;
}
