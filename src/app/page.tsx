import Link from "next/link";

const moduleData: Record<string, { title: string; color: string; lessons: { title: string; content: string }[] }> = {
  "modul-1": {
    title: "Modulul 1 — Baze Node-RED",
    color: "blue",
    lessons: [
      { title: "Ce este Node-RED și de ce îl folosești", content: "Node-RED = instrument visual de automatizare. Programare prin legarea de noduri în loc de cod scris.\n\n## Ce înveți\n- Ce e Node-RED\n- Instalare: npm install -g node-red\n- Interfață web: http://localhost:1880\n- Node-uri, fire-uri, payload\n\n## Primul flow\n1. Trage Inject pe workspace\n2. Trage Debug pe workspace\n3. Leagă Inject → Debug\n4. Apasă Inject → vezi mesajul în Debug\n\n## Payload\nMesajul dintre noduri. Poate fi număr, text sau JSON:\n```json\n{ \"temperatura\": 24.5 }\n```\n\n## Exercițiu\nCreează Inject + Debug care trimite \"Salut Node-RED!\" la 2 secunde.\n\n**Skills:** Node-RED, Inject, Debug, Payload, Deploy" },
      { title: "Primul tău flow complet", content: "Construiești un flow: Inject → Function → Debug.\n\n## Function node\n```javascript\nmsg.payload = msg.payload * 2;\nreturn msg;\n```\n\n## Exerciții\n1. Trimite 22°C → afișează Fahrenheit: (C × 9/5) + 32\n2. Trimite număr → afișează \"Par\" sau \"Impar\"\n\n**Skills:** Function, Inject, Calcul, Payload" },
      { title: "Noduri esențiale", content: "Noduri folosite curent:\n\n- **Inject** — trimite manual sau automat\n- **Debug** — afișează mesaj\n- **Function** — scrii JavaScript\n- **Comment** — notează ce faci\n- **Delay** — așteaptă X secunde\n- **Switch** — direcționează mesaj\n- **Change** — modifică proprietăți\n\nSchema: Inject → Switch → Function → Debug\n\n**Skills:** Inject, Debug, Function, Switch, Change, Delay" },
      { title: "Function node — JavaScript", content: "Scrii cod între return msg;.\n\n## Accesare\n```javascript\nmsg.payload    // conținut principal\nmsg.topic      // subiect\nnode.context() // variabile persistente\nflow.context() // toate nodurile\nglobal.context() // global\n```\n\n## Exemple\n```javascript\nvar C = msg.payload;\nmsg.payload = (C * 9/5) + 32; // C → F\nreturn msg;\n```\n\n**Skills:** Function node, JavaScript, node.context" },
      { title: "Lucrul cu JSON", content: "JSON = format standard.\n\n## Construire\n```javascript\nmsg.payload = {\n  tensiune: 12.5,\n  curent: 2.3,\n  timestamp: new Date().toISOString()\n};\n```\n\n## Citire\n```javascript\nvar t = msg.payload.tensiune;\n```\n\n## Parse\n```javascript\nmsg.payload = JSON.parse(msg.payload);\n```\n\n**Skills:** JSON, Payload, Function, Date" },
      { title: "Dashboard UI", content: "Instalare: npm install node-red-dashboard\n\nAcces: http://localhost:1880/ui\n\n## Noduri\n- gauge — valoare\n- chart — grafic\n- slider — control\n- switch — on/off\n- text — afișare\n- button — acțiune\n\n**Skills:** Dashboard, gauge, chart, slider" },
      { title: "Proiect final Modul 1", content: "Flow complet:\n1. Inject trimite valoare\n2. Function calculează dublu, putere, status\n3. Dashboard afișează gauge + chart + text\n\nStatus:\n- putere > 200W → AVERTISMENT\n- putere < 50W → SLAB\n- altfel → NORMAL\n\n**Skills:** Proiect, Dashboard, Function, Deploy, Export" },
    ],
  },
  "modul-2": {
    title: "Modulul 2 — Node-RED pentru Panouri Solare",
    color: "amber",
    lessons: [
      { title: "Hardware-ul nostru", content: "Componente:\n- Raspberry Pi 4/5 — computer central\n- ADS1115 — ADC 16-bit I2C\n- Releu modul — control on/off\n- Divizor tensiune — panou 22V → 3.3V\n- ACS712 — senzor curent\n- DS18B20 — senzor temperatură\n\nConectare ADS1115: VCC→3.3V, GND→GND, SCL→GPIO3, SDA→GPIO2\n\nVerificare: i2cdetect -y 1 (ar trebui să vezi 0x48)\n\n**Skills:** Raspberry Pi, ADS1115, I2C, ADC, Relee" },
      { title: "Citirea tensiunei panoului", content: "Divizor de tensiune:\n```\nV_panou = V_adc × ((R1+R2)/R2)\nFactor = (10+2.2)/2.2 ≈ 5.55\n```\n\nInstalare: npm install node-red-node-ads1x15\n\nFunction scale:\n```javascript\nvar factor = 5.55;\nmsg.payload = msg.payload * factor;\nreturn msg;\n```\n\n**Skills:** Divizor tensiune, ADS1115, Scale, Volt" },
      { title: "Citirea curentului cu ACS712", content: "Parametri: sensibilitate 66mV/A, Vref 2.5V\n\nFormula:\n```\nI = (Vout - 2.5) / 0.066\n```\n\nFunction:\n```javascript\nvar Vout = msg.payload;\nvar I = (Vout - 2.5) / 0.066;\nmsg.payload = I;\nreturn msg;\n```\n\n**Skills:** ACS712, Curent, ADC, Senzor" },
      { title: "Calculul puterii și energiei", content: "Putere: P = V × I\n\n```javascript\nvar V = msg.payload.tensiune;\nvar I = msg.payload.curent;\nmsg.payload.putere = V * I;\nmsg.payload.energie_Wh = (V * I) * (5/3600);\nreturn msg;\n```\n\nContor persistent:\n```javascript\nvar total = flow.context().energie_total || 0;\ntotal += msg.payload.energie_Wh;\nflow.context().energie_total = total;\n```\n\n**Skills:** Putere, Energie, Flow context, Persistență" },
      { title: "Control relee — pornire/oprire", content: "Relee pe GPIO:\n```\nVCC → 5V, GND → GND, IN → GPIO 17\n```\n\nFunction control:\n```javascript\nif (msg.payload.tensiune < 11) {\n    msg.payload = 1; // opreste\n} else {\n    msg.payload = 0; // repornește\n}\nreturn msg;\n```\n\n**Skills:** Relee, GPIO, Control, Panou solar" },
      { title: "Programare orară + bigtimer", content: "Cron: 0 6,12,18 * * * → 6:00, 12:00, 18:00\n\nFunction orar:\n```javascript\nvar h = new Date().getHours();\nif (h >= 6 && h <= 19) {\n    msg.payload = \"Zi\";\n} else {\n    msg.payload = \"Noapte\";\n}\nreturn msg;\n```\n\n**Skills:** Cron, bigtimer, Orar, Programare" },
      { title: "Stocare date cu SQLite", content: "Instalare: npm install node-red-node-sqlite\n\n```sql\nCREATE TABLE citiri (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,\n  tensiune REAL, curent REAL,\n  putere REAL, energie_Wh REAL\n);\n```\n\nInserare:\n```sql\nINSERT INTO citiri (tensiune, curent, putere, energie_Wh)\nVALUES (?, ?, ?, ?)\n```\n\n**Skills:** SQLite, Inserare, Query, Database" },
      { title: "MQTT — publicare date", content: "Protocol pub/sub. Broker = intermediar.\n\nBroker local:\n```bash\nsudo apt install -y mosquitto\n```\n\nOutput: topic casa/solar/tensiune, QoS 0\nInput: topic casa/solar/#\n\nTestare:\n```bash\nmosquitto_sub -t 'casa/solar/#' -v\n```\n\n**Skills:** MQTT, Broker, Mosquitto, Topic, Pub/Sub" },
      { title: "Anomaly Detection", content: "Detectare anomalii cu deviație standard:\n\n```javascript\nvar val = msg.payload.putere;\nvar is = flow.context().istoric || [];\nis.unshift(val);\nwhile (is.length > 50) is.pop();\nflow.context().istoric = is;\n\nfunction mean(arr) { return arr.reduce((a,b)=>a+b,0)/arr.length; }\nfunction std(arr) {\n    const m = mean(arr);\n    return Math.sqrt(arr.reduce((a,b)=>a+(b-m)**2,0)/arr.length);\n}\n\nif (is.length >= 10) {\n    const m = mean(is), s = std(is);\n    if (Math.abs(val - m) > 2 * s) {\n        msg.payload.status = \"ANOMALIE\";\n    }\n}\nreturn msg;\n```\n\n**Skills:** Anomaly, Istoric, Statistică, Flow context" },
      { title: "Proiect final Modul 2", content: "Sistem complet monitorizare panou solar:\n1. Citește tensiune + curent\n2. Calculează putere + contor energie\n3. Salvează în SQLite\n4. Publică prin MQTT\n5. Dashboard: Tensiune, Curent, Putere, Energie, Status\n6. Releu controlează încărcare\n\n**Skills:** Proiect, Integrare, Monitorizare, Persistență" },
    ],
  },
  "modul-3": {
    title: "Modulul 3 — AI în Node-RED",
    color: "violet",
    lessons: [
      { title: "Ce e AI în Node-RED", content: "AI = funcții complexe, decizii automate, predicții.\n\nExemplu medie mobilă:\n```javascript\nvar L = flow.ctx.ma || [];\nL.unshift(msg.payload);\nwhile (L.length > 10) L.pop();\nflow.ctx.ma = L;\nvar sum = L.reduce((a,b) => a + b, 0);\nmsg.payload.ma10 = sum / L.length;\nreturn msg;\n```\n\n**Skills:** AI, Medie mobilă, Funcție, Flow context" },
      { title: "Function node avansate", content: "Async:\n```javascript\nconst raw = await global.request('https://api.ex.ro/v1');\nmsg.payload = JSON.parse(raw);\nreturn msg;\n```\n\nMulti-output:\n```javascript\nreturn [msg1, msg2];\n```\n\n**Skills:** Async, Multi-output, Error handling, Function" },
      { title: "HTTP Request — API extern", content: "Node http request: GET, POST, PUT, DELETE.\n\nExemplu vreme:\nGET https://api.open-meteo.com/v1/forecast?latitude=44.43&longitude=26.10&current_weather=true\n\n```json\n{ \"current_weather\": { \"temperature\": 23.1, \"windspeed\": 5.3 } }\n```\n\n**Skills:** HTTP Request, API, Fetch, JSON" },
      { title: "Baze de date — MySQL/PostgreSQL", content: "Instalare:\n```bash\nnpm install node-red-node-mysql\nnpm install node-red-node-postgresql\n```\n\nQuery: msg.topic = 'SELECT * FROM citiri ORDER BY id DESC LIMIT 10';\nInserare: msg.topic = 'INSERT INTO citiri (tensiune, curent) VALUES (?, ?)';\n\n**Skills:** MySQL, PostgreSQL, Query, Inserare, Agregare" },
      { title: "Anomaly Detection", content: "Detectare anomalii cu deviație 3σ:\n\n```javascript\nvar L = flow.ctx.recente || [];\nL.unshift(msg.payload);\nwhile (L.length > 30) L.pop();\nflow.ctx.recente = L;\n\nfunction dev_std(arr) {\n    var m = arr.reduce((a,b)=>a+b,0)/arr.length;\n    return Math.sqrt(arr.reduce((a,b)=>a+(b-m)**2,0)/arr.length);\n}\n\nvar sd = dev_std(L);\nif (sd > 0 && Math.abs(msg.payload - L.reduce((a,b)=>a+b,0)/L.length) > 3*sd) {\n    msg.payload.status = \"ANOMALIE\";\n}\nreturn msg;\n```\n\n**Skills:** Anomaly, Deviație, Istoric" },
      { title: "Predicție producție solară", content: "Regresie simplă:\n```javascript\nvar is = flow.ctx.istoric_solar || [];\nis.unshift(msg.payload.producere || 0);\nwhile (is.length > 336) is.pop();\nflow.ctx.istoric_solar = is;\nvar sum=0; is.forEach(v=> sum+=v);\nmsg.payload.pred = sum / is.length;\nreturn msg;\n```\n\nCu vreme: dacă noros → pred *= 0.2\n\n**Skills:** Predicție, Regresie, Vreme, Estimare" },
      { title: "Notificări email și Telegram", content: "Email: node-red-node-email\n```\nmsg.to = 'admin@x.ro';\nmsg.topic = 'Alertă Panou';\nmsg.payload = 'Producție sub 10W';\n```\n\nTelegram: node-red-contrib-telegram-bot\n```\nmsg.payload = { chatId: 123456, text: '⚠️ Panou: ' + msg.payload.tensiune + 'V' };\n```\n\n**Skills:** Email, Telegram, Notificare, Alertă" },
      { title: "Optimizare automată consum", content: "Reguli:\n- producție > consum → pornește consumatori mari\n- baterie < 20% → oprește neesențiali\n- preț scump → vinde surplus\n\n```javascript\nif (producere > consum && baterie > 50) {\n    msg.pornire = 'masina_spalat';\n} else if (baterie < 20) {\n    msg.opriri = ['masina', 'spalator'];\n}\nreturn msg;\n```\n\n**Skills:** Optimizare, Reguli, Economie, Control" },
      { title: "Proiect final Modul 3", content: "Sistem inteligent complet:\n1. Senzori + API\n2. Anomaly detection\n3. Predicție\n4. Notificări Telegram\n5. Optimizare locală\n6. Dashboard\n\n**Skills:** Proiect, Inteligent, Optimizare, Sistem" },
    ],
  },
  "modul-4": {
    title: "Modulul 4 — Smart Home & Agent AI",
    color: "emerald",
    lessons: [
      { title: "Introducere Smart Home", content: "Ecosistem: senzori, actuatori, gateway, logică.\n\nProtocoluri:\n- MQTT — pub/sub\n- Zigbee — mesh low-power\n- Z-Wave — mesh propriu\n- WiFi — HTTP/API\n\nNode-RED ca centrală:\n```\nSenzori + Actuatori + API → Node-RED → Logică + UI\n```\n\n**Skills:** Smart Home, Zigbee, MQTT, Centrala" },
      { title: "Control divizor WiFi", content: "Shelly/Meross — HTTP sau MQTT.\n\nHTTP:\n```\nGET http://192.168.1.100/relay/0?turn=on\n```\n\nFunction:\n```javascript\nmsg.url = 'http://192.168.1.100/relay/0?turn=' + msg.payload;\nreturn msg;\n```\n\n**Skills:** Shelly, HTTP, Divizor, WiFi" },
      { title: "Scenele smart home", content: "Scenă = acțiuni multiple simultane.\n\nExemplu „Seara\":\n```javascript\nawait fetch(ip + '/relay/0?turn=on');\nawait fetch(ip + '/relay/1?turn=on');\nawait fetch(ip + '/light/0?brightness=40');\n```\n\n**Skills:** Scene, Acțiuni multiple, HTTP, Automatizare" },
      { title: "Programare avansată", content: "State Machine:\n```javascript\nvar stare = flow.ctx.stare || 'acasă';\nif (msg.topic === 'plecare') stare = 'plecat';\nif (msg.topic === 'sosire') stare = 'acasă';\nflow.ctx.stare = stare;\nmsg.payload = stare;\nreturn msg;\n```\n\n**Skills:** Schedule, State machine, Programare" },
      { title: "Agent AI — decizii autonome", content: "Agent = flow care ia decizii bazate pe context.\n\n```javascript\nvar p = msg.payload;\nvar scor = 0;\nif (p.producere > 200) scor += 1;\nif (p.baterie > 80) scor += 1;\nif (p.pret > 1.5) scor += 1;\nmsg.payload.recomandare = scor >= 2 ? 'ACUM_E_MOMENTUL' : 'ASTEPTAM';\nreturn msg;\n```\n\n**Skills:** Agent, Decizie, Scor, Autonomie" },
      { title: "Agent AI cu predicție", content: "Predicție + optimizare:\n```javascript\nif (p.previziune.some(v=>v.includes('noros'))) {\n    if (p.producere < 50 && p.baterie < 100) {\n        msg.payload.decizie = 'acumulează_baterie';\n    }\n}\n```\n\n**Skills:** Agent, Predicție, Optimizare, Baterie" },
      { title: "Integrare vreme + preț energie", content: "API-uri:\n- OpenWeatherMap — vreme\n- ENTSO-E — preț energie\n\nNotificări: preț ridicat + producție bună → pornește consumatori.\n\n**Skills:** API, Vreme, Preț energie, Notificări" },
      { title: "Dashboard Smart Home complet", content: "Tab-uri: Solar / Casă / Optimizare\n\nElemente: gauge, chart, switch, text, butoane.\n\nAcces mobil: http://192.168.1.100:1880/ui\n\n**Skills:** Dashboard, UI, Smart Home, Control" },
      { title: "Proiect final — Casă inteligentă", content: "Unificare:\n1. Modul solar\n2. Divizori WiFi\n3. Scenene\n4. Agent AI\n5. API extern\n\n**Skills:** Proiect, Integrare, Agent, Smart Home" },
      { title: "Ce urmează după curs", content: "Continuare:\n- node-red.org\n- flows.nodered.org\n- Reddit / Discord\n\nExtinderi:\n- Machine Learning\n- LLM\n- Grafana\n- Home Assistant\n\nAi construit: monitorizare solară, control divizori, scenene automate, agent AI, dashboard complet.\n\n**Skills:** Continuare, ML, LLM, Home Assistant" },
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
            <span key={j} className="px-3 py-1 text-[10px] font-mono rounded-md bg-blue-500/10 border border-blue-400/20 text-blue-300">{s}</span>
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
