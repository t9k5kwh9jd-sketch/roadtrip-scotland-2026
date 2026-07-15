/* Application controller: rendering, navigation and persistence. */
const DATA = window.TRIP_DATA;

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];function esc(v){return String(v??'').replace(/[&<>\"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[m]))}function mapsLink(q){return'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(q)}function showTab(id){$$('.view').forEach(x=>x.classList.toggle('active',x.id===id));$$('#nav button').forEach(x=>x.classList.toggle('active',x.dataset.tab===id));scrollTo({top:document.querySelector('.dock').offsetTop,behavior:'smooth'});if(id==='karte')setTimeout(()=>window.initLiveMap&&window.initLiveMap(),80)}$$('#nav button').forEach(b=>b.onclick=()=>showTab(b.dataset.tab));function parts(ds){let d=new Date(ds+'T12:00:00');return{day:d.getDate(),mon:d.toLocaleDateString('de-DE',{month:'short'}),wd:d.toLocaleDateString('de-DE',{weekday:'short'})}}function priority(e){return e.priority?'<span class="chip">'+('⭐'.repeat(Math.min(3,Number(e.priority)||1)))+'</span>':''}function renderDays(q=''){q=q.toLowerCase();$('#dayList').innerHTML=DATA.days.filter(d=>JSON.stringify(d).toLowerCase().includes(q)).map((d,i)=>{let p=parts(d.date);return`<details class="day" ${i===0?'open':''}><summary><div class="date"><span>${p.wd}</span><b>${p.day}</b><span>${p.mon}</span></div><div><div class="label">${esc(d.region)} · ${esc(d.type)}</div><h3>${esc(d.title)}</h3></div></summary><div class="daybody">${d.warnings?`<div class="notice">⚠️ ${esc(Array.isArray(d.warnings)?d.warnings.join(' · '):d.warnings)}</div>`:''}<div class="timeline">${d.timeline.map(e=>`<div class="event"><div class="time">${esc(e.time||e.start||'')} ${e.end?'– '+esc(e.end):''}</div><h4>${esc(e.title)}</h4><div class="chips">${priority(e)}${e.category?`<span class="chip">${esc(e.category)}</span>`:''}${e.duration_minutes?`<span class="chip">⏱ ${e.duration_minutes} Min.</span>`:''}${e.cost_gbp===0?`<span class="chip">Kostenlos</span>`:''}${e.reservation_required?`<span class="chip">Reservierung nötig</span>`:''}</div>${e.address?`<p>📍 ${esc(e.address)} <a class="btn" href="${mapsLink(e.address)}">Karte</a></p>`:''}${e.notes?`<p class="muted">${esc(e.notes)}</p>`:''}${e.photo_tip?`<div class="tip">📸 <b>Fototipp:</b> ${esc(e.photo_tip)}</div>`:''}${e.charlie_tip?`<div class="tip">💡 <b>Charlie:</b> ${esc(e.charlie_tip)}</div>`:''}${e.restaurant?(()=>{const r=DATA.restaurants.find(x=>x.name===e.restaurant);return `<p>🍽️ <b>${esc(e.restaurant)}</b>${r?.address?`<br><span class="muted">📍 ${esc(r.address)}</span> <a class="btn" href="${mapsLink(r.address)}">Navigation</a>`:''}</p>`})():''}${e.restaurant_options?`<div>${e.restaurant_options.map(o=>{const r=DATA.restaurants.find(x=>x.name===o.name);return `<p>🍽️ <b>${esc(o.name)}</b>${r?.address?`<br><span class="muted">📍 ${esc(r.address)}</span> <a class="btn" href="${mapsLink(r.address)}">Navigation</a>`:''}</p>`}).join('')}</div>`:''}</div>`).join('')}</div>${d.soundtrack?`<div class="tip">🎵 <b>Soundtrack des Tages:</b> ${d.soundtrack.map(esc).join(' · ')}</div>`:''}</div></details>`}).join('')}$('#daySearch').oninput=e=>renderDays(e.target.value);renderDays();function renderFood(q=''){q=q.toLowerCase();$('#foodList').innerHTML=DATA.restaurants.filter(r=>JSON.stringify(r).toLowerCase().includes(q)).map(r=>CardComponents.restaurantCard(r)).join('')}$('#foodSearch').oninput=e=>renderFood(e.target.value);renderFood();function renderSights(q=''){q=q.toLowerCase();const rows=DATA.photo.map((p,i)=>({...p,_index:i})).filter(p=>JSON.stringify(p).toLowerCase().includes(q));$('#sightList').innerHTML=rows.map(p=>CardComponents.sightCard(p)).join('')}const sightSearch=$('#sightSearch');if(sightSearch)sightSearch.oninput=e=>renderSights(e.target.value);renderSights();const photoList=$('#photoList');if(photoList)photoList.innerHTML=DATA.photo.map(p=>CardComponents.sightCard(p,IMAGE_MANIFEST.sights[p.place])).join('');const dashboardCharlie=document.querySelector('.charlie-panel');if(dashboardCharlie){dashboardCharlie.outerHTML=CardComponents.charlieCard('Schottland belohnt Geduld','Plant Fotostopps nicht nur nach Uhrzeit. Nach Regenschauern entstehen oft die stärksten Lichtstimmungen – besonders in Glencoe und auf Skye.','highland')}function key(t,i){return'roadtrip26_'+t+'_'+i}function state(t,i){return localStorage.getItem(key(t,i))==='1'}function toggle(t,i,v){localStorage.setItem(key(t,i),v?'1':'0')}$('#ticketList').innerHTML=DATA.tickets.map((t,i)=>`<label class="check"><input type="checkbox" ${state('ticket',i)?'checked':''} onchange="toggle('ticket',${i},this.checked)"><span><b>${esc(t.name)}</b><br><span class="muted">${esc(t.date)} · ${esc(t.action)}</span></span></label>`).join('');$('#hotelList').innerHTML=DATA.hotels.map(h=>`<article class="card"><div class="label">${esc(h.dates)}</div><h3>${esc(h.name)}</h3><p class="muted">${esc(h.address)}</p><a class="btn" href="${mapsLink(h.address)}">Navigation</a></article>`).join('');$('#packList').innerHTML=DATA.packing.map((x,i)=>`<label class="check"><input type="checkbox" ${state('pack',i)?'checked':''} onchange="toggle('pack',${i},this.checked)"><span>${esc(x)}</span></label>`).join('');
const EXPENSE_KEY='roadtrip26_expenses_v1';
const defaultExpenseDate='2026-08-06';
function getExpenses(){try{return JSON.parse(localStorage.getItem(EXPENSE_KEY)||'[]')}catch{return[]}}
function saveExpenses(items){localStorage.setItem(EXPENSE_KEY,JSON.stringify(items));renderExpenses()}
function money(n,c='GBP'){return new Intl.NumberFormat('de-DE',{style:'currency',currency:c}).format(Number(n)||0)}
function normalizeToGbp(e){return e.currency==='EUR'?(Number(e.amount)||0)*0.86:(Number(e.amount)||0)}
function uid(){return Date.now().toString(36)+Math.random().toString(36).slice(2,8)}
function formValue(id){return document.getElementById(id).value.trim()}
function resetExpenseForm(){document.getElementById('expenseForm').reset();document.getElementById('expenseId').value='';document.getElementById('expenseDate').value=new Date().toISOString().slice(0,10);document.getElementById('saveExpense').textContent='Ausgabe speichern';document.getElementById('cancelExpenseEdit').hidden=true}
function renderExpenses(){
  const all=getExpenses(); const q=(document.getElementById('expenseSearch')?.value||'').toLowerCase(); const date=document.getElementById('expenseFilterDate')?.value||''; const cat=document.getElementById('expenseFilterCategory')?.value||'';
  const filtered=all.filter(e=>(!q||JSON.stringify(e).toLowerCase().includes(q))&&(!date||e.date===date)&&(!cat||e.category===cat)).sort((a,b)=>b.date.localeCompare(a.date)||b.createdAt-a.createdAt);
  const total=all.reduce((s,e)=>s+normalizeToGbp(e),0); const selectedDay=date||new Date().toISOString().slice(0,10); const today=all.filter(e=>e.date===selectedDay).reduce((s,e)=>s+normalizeToGbp(e),0);
  document.getElementById('expenseTotal').textContent=money(total,'GBP'); document.getElementById('expensePerPerson').textContent=money(total/4,'GBP'); document.getElementById('expenseToday').textContent=money(today,'GBP'); document.getElementById('expenseCount').textContent=all.length?`${all.length} Ausgabe${all.length===1?'':'n'} erfasst · EUR-Beträge werden für die Übersicht mit 0,86 GBP je EUR umgerechnet.`:'Noch keine Ausgaben erfasst.';
  document.getElementById('expenseList').innerHTML=filtered.length?filtered.map(e=>`<article class="expense-item"><div class="expense-date">${esc(new Date(e.date+'T12:00:00').toLocaleDateString('de-DE'))}<br>${esc(e.category)}</div><div class="expense-main"><b>${esc(e.description)}</b><div class="expense-meta">Bezahlt von ${esc(e.payer)} · ${esc(e.forWhom)} · ${esc(e.method)}${e.note?' · '+esc(e.note):''}</div></div><div class="expense-amount">${money(e.amount,e.currency)}<div class="expense-actions"><button class="mini-btn" onclick="editExpense('${e.id}')">Bearbeiten</button><button class="mini-btn" onclick="deleteExpense('${e.id}')">Löschen</button></div></div></article>`).join(''):'<div class="expense-empty">Noch keine passenden Ausgaben vorhanden.</div>';
  const categoryTotals={},payerTotals={}; all.forEach(e=>{categoryTotals[e.category]=(categoryTotals[e.category]||0)+normalizeToGbp(e);payerTotals[e.payer]=(payerTotals[e.payer]||0)+normalizeToGbp(e)});
  const rows=obj=>Object.entries(obj).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`<div class="summary-row"><span>${esc(k)}</span><b>${money(v,'GBP')}</b></div>`).join('')||'<p class="muted">Noch keine Daten.</p>';
  document.getElementById('expenseByCategory').innerHTML=rows(categoryTotals);document.getElementById('expenseByPayer').innerHTML=rows(payerTotals);
}
function editExpense(id){const e=getExpenses().find(x=>x.id===id);if(!e)return;document.getElementById('expenseId').value=e.id;document.getElementById('expenseDate').value=e.date;document.getElementById('expenseCategory').value=e.category;document.getElementById('expenseDescription').value=e.description;document.getElementById('expenseAmount').value=e.amount;document.getElementById('expenseCurrency').value=e.currency;document.getElementById('expensePayer').value=e.payer;document.getElementById('expenseFor').value=e.forWhom;document.getElementById('expenseMethod').value=e.method;document.getElementById('expenseNote').value=e.note||'';document.getElementById('saveExpense').textContent='Änderung speichern';document.getElementById('cancelExpenseEdit').hidden=false;document.querySelector('.expense-form-card').scrollIntoView({behavior:'smooth'})}
function deleteExpense(id){if(confirm('Diese Ausgabe wirklich löschen?'))saveExpenses(getExpenses().filter(x=>x.id!==id))}
function downloadFile(name,text,type){const blob=new Blob([text],{type});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),500)}
function csvCell(v){return '"'+String(v??'').replace(/"/g,'""')+'"'}
function initExpenseTracker(){
  const dateEl=document.getElementById('expenseDate'); if(!dateEl)return; dateEl.value=new Date().toISOString().slice(0,10);
  const cats=[...document.getElementById('expenseCategory').options].map(o=>o.value);document.getElementById('expenseFilterCategory').innerHTML='<option value="">Alle Kategorien</option>'+cats.map(c=>`<option>${esc(c)}</option>`).join('');
  document.getElementById('expenseForm').addEventListener('submit',ev=>{ev.preventDefault();const id=formValue('expenseId');const item={id:id||uid(),date:formValue('expenseDate'),category:formValue('expenseCategory'),description:formValue('expenseDescription'),amount:Number(formValue('expenseAmount')),currency:formValue('expenseCurrency'),payer:formValue('expensePayer'),forWhom:formValue('expenseFor'),method:formValue('expenseMethod'),note:formValue('expenseNote'),createdAt:id?(getExpenses().find(x=>x.id===id)?.createdAt||Date.now()):Date.now()};const items=getExpenses();const i=items.findIndex(x=>x.id===item.id);if(i>=0)items[i]=item;else items.push(item);saveExpenses(items);resetExpenseForm()});
  document.getElementById('cancelExpenseEdit').onclick=resetExpenseForm;['expenseSearch','expenseFilterDate','expenseFilterCategory'].forEach(id=>document.getElementById(id).addEventListener('input',renderExpenses));
  document.getElementById('exportExpensesCsv').onclick=()=>{const h=['Datum','Kategorie','Beschreibung','Betrag','Währung','Bezahlt von','Betrifft','Zahlungsart','Notiz'];const lines=[h,...getExpenses().map(e=>[e.date,e.category,e.description,e.amount,e.currency,e.payer,e.forWhom,e.method,e.note])].map(r=>r.map(csvCell).join(';'));downloadFile('roadtrip-scotland-ausgaben.csv','\ufeff'+lines.join('\n'),'text/csv;charset=utf-8')};
  document.getElementById('backupExpenses').onclick=()=>downloadFile('roadtrip-scotland-ausgaben-sicherung.json',JSON.stringify({version:1,exportedAt:new Date().toISOString(),expenses:getExpenses()},null,2),'application/json');
  document.getElementById('restoreExpenses').onchange=ev=>{const f=ev.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const data=JSON.parse(r.result);if(!Array.isArray(data.expenses))throw 0;if(confirm(`${data.expenses.length} Ausgaben importieren und vorhandene Daten ersetzen?`)){saveExpenses(data.expenses);resetExpenseForm()}}catch{alert('Die Sicherungsdatei ist ungültig.')}ev.target.value=''};r.readAsText(f)};
  document.getElementById('clearExpenses').onclick=()=>{if(confirm('Wirklich ALLE Ausgaben auf diesem Gerät löschen?'))saveExpenses([])};renderExpenses();
}
initExpenseTracker();
(function(){let start=new Date('2026-08-06T00:00:00'),now=new Date(),days=Math.ceil((start-now)/86400000);$('#countdown').textContent=days>0?`Noch ${days} Tage bis zum Roadtrip`:days>=-14?'Euer Roadtrip läuft jetzt 🏴':'Eine Reise voller Erinnerungen';let iso=now.toISOString().slice(0,10),d=DATA.days.find(x=>x.date===iso);if(d){$('#todayTitle').textContent=d.title;$('#todayText').textContent=d.region+' · '+d.timeline.length+' Programmpunkte'}})();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js').catch(() => {});
  });
}


/* Build 2.1: date-aware soundtrack, daily quote and launch identity */
(function initDailyIdentity(){
  const launch=document.getElementById('launchScreen');
  if(launch){
    const alreadySeen=sessionStorage.getItem('scotland-launch-seen');
    if(alreadySeen){ launch.remove(); }
    else {
      sessionStorage.setItem('scotland-launch-seen','1');
      window.setTimeout(()=>launch.classList.add('is-hidden'),1450);
      window.setTimeout(()=>launch.remove(),2200);
    }
  }
  const extras=window.DAILY_EXTRAS;
  if(!extras)return;
  const now=new Date();
  const localIso=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
  const tripStart='2026-08-06',tripEnd='2026-08-20';
  const item=extras.days[localIso]||(localIso<tripStart?extras.preTrip:extras.postTrip);
  const song=document.getElementById('dailySong');
  const mood=document.getElementById('dailySongMood');
  const quote=document.getElementById('dailyQuote');
  const by=document.getElementById('dailyQuoteBy');
  if(song)song.textContent=item.song;
  if(mood)mood.textContent=item.mood;
  if(quote)quote.textContent='„'+item.quote+'“';
  if(by)by.textContent='— '+item.quoteBy;
})();

/* FINAL: interactive Leaflet map + date/place weather */
(function(){
  let map=null,hotLayer=null,foodLayer=null;
  const hotMarkers=[];
  const restaurantCoords={Edinburgh:[55.9533,-3.1883],'Fort William':[56.8198,-5.1052],Skye:[57.4125,-6.1960],'Applecross/Aberdeen':[57.4314,-5.8097],'Aberdeen/Glasgow':[56.0,-3.4],Glasgow:[55.8610,-4.2520]};
  const mapDetail=document.getElementById('mapDetail');
  function setMapMessage(title,text){if(mapDetail)mapDetail.innerHTML=`<div class="label">Karte</div><h3>${esc(title)}</h3><p class="muted">${esc(text)}</p>`}
  function popupHot(s,i){return `<b>${esc(s.place)}</b><br>${esc(s.region)}<br><small>${esc(s.duration)} · ${esc(s.best_time)}</small><br><button class="mini-btn" type="button" onclick="showTab('sehenswuerdigkeiten')">Hot-Spot-Liste öffnen</button>`}
  function initMap(){
    if(map){setTimeout(()=>map.invalidateSize(),50);return true}
    const el=document.getElementById('leafletMap');
    if(!el)return false;
    if(!window.L){setMapMessage('Karte konnte nicht geladen werden','Bitte Internetverbindung prüfen und die Seite neu laden. Die externen Google-Maps-Links der Hot Spots funktionieren weiterhin.');return false}
    map=L.map(el,{zoomControl:true,scrollWheelZoom:true,tap:true}).setView([57.0,-4.3],6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; OpenStreetMap-Mitwirkende'}).addTo(map);
    hotLayer=L.layerGroup().addTo(map);foodLayer=L.layerGroup().addTo(map);
    DATA.photo.forEach((s,i)=>{if(!Array.isArray(s.coords))return;const marker=L.marker(s.coords,{title:s.place}).bindPopup(popupHot(s,i));marker.on('click',()=>setMapMessage(s.place,`${s.region} · ${s.duration} · beste Zeit: ${s.best_time}`));marker.addTo(hotLayer);hotMarkers[i]=marker});
    DATA.restaurants.forEach((r,i)=>{const c=restaurantCoords[r.region]||[56.5,-4.0];const offset=((i%5)-2)*0.009;const marker=L.circleMarker([c[0]+offset,c[1]-offset],{radius:7,weight:2,color:'#e8b04f',fillColor:'#e8b04f',fillOpacity:.78}).bindPopup(`<b>${esc(r.name)}</b><br>${esc(r.region)}<br>${esc(Array.isArray(r.cuisine)?r.cuisine.join(' · '):r.cuisine||'')}`);marker.addTo(foodLayer)});
    document.querySelectorAll('.map-type').forEach(b=>b.onclick=()=>{b.classList.toggle('active');const layer=b.dataset.type==='hotspot'?hotLayer:foodLayer;b.classList.contains('active')?layer.addTo(map):map.removeLayer(layer)});
    const fit=document.getElementById('mapFit');if(fit)fit.onclick=()=>{if(hotLayer.getLayers().length)map.fitBounds(hotLayer.getBounds(),{padding:[25,25]})};
    map.whenReady(()=>{map.invalidateSize();if(hotLayer.getLayers().length)map.fitBounds(hotLayer.getBounds(),{padding:[25,25]})});
    return true;
  }
  window.initLiveMap=initMap;
  window.focusSightOnMap=function(i){
    const index=Number(i),s=DATA.photo[index];
    if(!s||!Array.isArray(s.coords))return;
    showTab('karte');
    setTimeout(()=>{if(!initMap())return;map.invalidateSize();map.setView(s.coords,14,{animate:true});const marker=hotMarkers[index];if(marker){if(!map.hasLayer(hotLayer))hotLayer.addTo(map);marker.openPopup()}setMapMessage(s.place,`${s.region} · ${s.duration} · beste Zeit: ${s.best_time}`)},350);
  };

  const regionCoords={Edinburgh:[55.9533,-3.1883],'Fort William':[56.8198,-5.1052],Glencoe:[56.6826,-5.1023],Glenfinnan:[56.8727,-5.4496],Skye:[57.4125,-6.1960],Applecross:[57.4314,-5.8097],Aberdeen:[57.1497,-2.0943],Glasgow:[55.8610,-4.2520]};
  const wmo={0:'Klar',1:'Überwiegend klar',2:'Teilweise bewölkt',3:'Bedeckt',45:'Nebel',51:'Leichter Nieselregen',61:'Leichter Regen',63:'Regen',65:'Starker Regen',71:'Leichter Schnee',80:'Regenschauer',95:'Gewitter'};
  async function loadWeather(){const now=new Date(),iso=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');let d=DATA.days.find(x=>x.date===iso);if(!d){d=iso<'2026-08-06'?DATA.days[0]:DATA.days.at(-1)}const c=regionCoords[d.region]||regionCoords.Edinburgh;document.getElementById('weatherTitle').textContent=d.region+' · '+new Date(d.date+'T12:00:00').toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long'});const diff=Math.round((new Date(d.date+'T12:00:00')-now)/86400000);if(diff>15){document.getElementById('weatherText').textContent='Tagesgenaue Prognose wird ab 16 Tagen vorher automatisch geladen · Open‑Meteo';return}try{const url=`https://api.open-meteo.com/v1/forecast?latitude=${c[0]}&longitude=${c[1]}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=Europe%2FLondon&start_date=${d.date}&end_date=${d.date}`;const r=await fetch(url);if(!r.ok)throw 0;const x=await r.json(),a=x.daily;document.getElementById('weatherTemp').textContent=Math.round(a.temperature_2m_max[0])+'°';document.getElementById('weatherText').textContent=`${wmo[a.weather_code[0]]||'Wechselhaft'} · Daten von Open‑Meteo`;const rain=document.getElementById('weatherRain'),range=document.getElementById('weatherRange'),feels=document.getElementById('weatherFeels'),sunrise=document.getElementById('weatherSunrise'),sunset=document.getElementById('weatherSunset');if(rain)rain.textContent=(a.precipitation_probability_max[0]??'–')+' %';if(range)range.textContent=Math.round(a.temperature_2m_max[0])+'° / '+Math.round(a.temperature_2m_min[0])+'°';if(feels)feels.textContent=Math.round(a.temperature_2m_max[0])+'°';if(sunrise)sunrise.textContent=(a.sunrise[0]||'').slice(11,16);if(sunset)sunset.textContent=(a.sunset[0]||'').slice(11,16);}catch{document.getElementById('weatherText').textContent='Wetter derzeit offline · letzte Reisedaten bleiben verfügbar';}}
  loadWeather();
})();


/* FINAL Tagebuch: offline daily journal */
(function initJournal(){
  const select=document.getElementById('journalDaySelect'); if(!select)return;
  const STORE='roadtrip26_journal_v1';
  const prompts=[
    'Was hat euch heute am meisten überrascht?',
    'Welcher Moment war schöner als jedes Foto?',
    'Was würdet ihr Freunden von heute unbedingt empfehlen?',
    'Worüber musstet ihr heute gemeinsam lachen?',
    'Welches Detail möchtest du niemals vergessen?',
    'Welcher Ort hat heute eine besondere Stimmung ausgelöst?',
    'Was hat das Wetter heute besser gemacht als geplant?',
    'Welches Foto würdest du sofort groß ausdrucken?',
    'Welche Begegnung bleibt von heute in Erinnerung?',
    'Was war heute euer bester spontaner Entschluss?',
    'Welcher Geschmack gehört für dich zu diesem Tag?',
    'Wann warst du heute einfach nur glücklich?',
    'Was würdest du bei diesem Reisetag genauso wieder machen?',
    'Welcher Blick hat dich heute innehalten lassen?',
    'Wenn ihr morgen noch einen Tag hättet – wohin würdet ihr zurückkehren?'
  ];
  const memoryLabels=['Souvenir gekauft','Whisky gekauft','Postkarte verschickt','Besonderen Menschen getroffen','Neuen Lieblingsort gefunden','Unerwarteten Umweg genossen'];
  let currentDate=''; let saveTimer=null;
  function all(){try{return JSON.parse(localStorage.getItem(STORE)||'{}')}catch{return{}}}
  function write(data){localStorage.setItem(STORE,JSON.stringify(data))}
  function blank(){return{rating:0,mood:'',highlight:'',notes:'',discoveries:'',whisky:'',moment:'',memories:[],photo:''}}
  function item(date){return Object.assign(blank(),all()[date]||{})}
  function dayByDate(date){return DATA.days.find(d=>d.date===date)||DATA.days[0]}
  function setState(text,saving=false){const el=document.getElementById('journalSaveState');el.textContent=text;el.classList.toggle('saving',saving)}
  function scheduleSave(){setState('Speichert …',true);clearTimeout(saveTimer);saveTimer=setTimeout(save,250)}
  function save(){if(!currentDate)return;const data=all();data[currentDate]={
    rating:Number(document.querySelector('#journalRating button.active')?.dataset.value||0),
    mood:document.querySelector('#journalMood button.active')?.dataset.value||'',
    highlight:document.getElementById('journalHighlight').value,
    notes:document.getElementById('journalNotes').value,
    discoveries:document.getElementById('journalDiscoveries').value,
    whisky:document.getElementById('journalWhisky').value,
    moment:document.getElementById('journalMoment').value,
    memories:[...document.querySelectorAll('#journalMemories input:checked')].map(x=>x.value),
    photo:document.getElementById('journalPhotoPreview').dataset.photo||''
  };write(data);setState('Offline gespeichert')}
  function renderPickers(entry){
    document.getElementById('journalRating').innerHTML=[1,2,3,4,5].map(n=>`<button type="button" data-value="${n}" class="${entry.rating===n?'active':''}" aria-label="${n} Sterne">${'★'.repeat(n)}</button>`).join('');
    document.getElementById('journalMood').innerHTML=['😀','😄','🙂','😌','😴'].map(m=>`<button type="button" data-value="${m}" class="${entry.mood===m?'active':''}" aria-label="Stimmung ${m}">${m}</button>`).join('');
    document.querySelectorAll('#journalRating button,#journalMood button').forEach(b=>b.onclick=()=>{b.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));b.classList.add('active');scheduleSave()});
  }
  function dayExpenses(date){return getExpenses().filter(e=>e.date===date).reduce((sum,e)=>sum+normalizeToGbp(e),0)}
  function render(date){currentDate=date;const d=dayByDate(date),entry=item(date),i=DATA.days.findIndex(x=>x.date===date),p=parts(date);document.getElementById('journalTitle').textContent=`Tag ${i+1} · ${d.title}`;document.getElementById('journalSubtitle').textContent=`${new Date(date+'T12:00:00').toLocaleDateString('de-DE',{weekday:'long',day:'numeric',month:'long',year:'numeric'})} · ${d.region}`;document.getElementById('journalDayMeta').innerHTML=`<b>${esc(d.region)}</b><br>${esc(d.type)} · ${d.timeline.length} Programmpunkte`;document.getElementById('journalPrompt').textContent=prompts[i]||prompts[0];const extra=window.DAILY_EXTRAS?.days?.[date];document.getElementById('journalSong').textContent='♪ '+(extra?.song||d.soundtrack?.[0]||'Soundtrack des Tages');document.getElementById('journalExpenses').textContent=money(dayExpenses(date),'GBP')+' heute';renderPickers(entry);['Highlight','Notes','Discoveries','Whisky','Moment'].forEach(k=>document.getElementById('journal'+k).value=entry[k.toLowerCase()]||'');document.getElementById('journalMemories').innerHTML=memoryLabels.map(m=>`<label><input type="checkbox" value="${esc(m)}" ${entry.memories.includes(m)?'checked':''}>${esc(m)}</label>`).join('');document.querySelectorAll('#journalMemories input').forEach(x=>x.onchange=scheduleSave);const img=document.getElementById('journalPhotoPreview'),empty=document.getElementById('journalPhotoEmpty'),remove=document.getElementById('journalPhotoRemove');if(entry.photo){img.src=entry.photo;img.dataset.photo=entry.photo;img.hidden=false;empty.hidden=true;remove.hidden=false}else{img.removeAttribute('src');img.dataset.photo='';img.hidden=true;empty.hidden=false;remove.hidden=true}setState(entry.notes||entry.highlight||entry.photo?'Offline gespeichert':'Noch leer')}
  select.innerHTML=DATA.days.map((d,i)=>`<option value="${d.date}">Tag ${i+1} · ${new Date(d.date+'T12:00:00').toLocaleDateString('de-DE',{day:'2-digit',month:'2-digit'})} · ${esc(d.region)}</option>`).join('');
  const today=new Date().toISOString().slice(0,10);select.value=DATA.days.some(d=>d.date===today)?today:DATA.days[0].date;select.onchange=()=>render(select.value);
  ['journalHighlight','journalNotes','journalDiscoveries','journalWhisky','journalMoment'].forEach(id=>document.getElementById(id).addEventListener('input',scheduleSave));
  document.getElementById('journalPhotoInput').onchange=ev=>{const f=ev.target.files?.[0];if(!f)return;if(!f.type.startsWith('image/')){alert('Bitte eine Bilddatei auswählen.');return}const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const max=1400,scale=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*scale);c.height=Math.round(im.height*scale);c.getContext('2d').drawImage(im,0,0,c.width,c.height);const data=c.toDataURL('image/jpeg',.8),preview=document.getElementById('journalPhotoPreview');preview.src=data;preview.dataset.photo=data;preview.hidden=false;document.getElementById('journalPhotoEmpty').hidden=true;document.getElementById('journalPhotoRemove').hidden=false;scheduleSave()};im.src=r.result};r.readAsDataURL(f);ev.target.value=''};
  document.getElementById('journalPhotoRemove').onclick=()=>{const p=document.getElementById('journalPhotoPreview');p.src='';p.dataset.photo='';p.hidden=true;document.getElementById('journalPhotoEmpty').hidden=false;document.getElementById('journalPhotoRemove').hidden=true;scheduleSave()};
  document.getElementById('journalExport').onclick=()=>downloadFile('roadtrip-scotland-2026-tagebuch.json',JSON.stringify({version:1,exportedAt:new Date().toISOString(),journal:all()},null,2),'application/json');
  document.getElementById('journalImport').onchange=ev=>{const f=ev.target.files?.[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const x=JSON.parse(r.result);if(!x.journal||typeof x.journal!=='object')throw 0;if(confirm('Tagebuch-Sicherung importieren und vorhandene Einträge ersetzen?')){write(x.journal);render(currentDate)}}catch{alert('Diese Sicherungsdatei ist ungültig.')}ev.target.value=''};r.readAsText(f)};
  document.getElementById('journalPrint').onclick=()=>window.print();
  render(select.value);
})();
