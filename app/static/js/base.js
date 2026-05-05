const WORKS_JSON_PATH = "/static/works_list.json";
var masterRows = [];

// ================================================================
// STATE
// ================================================================
var leftRows  = [];   // works available to assign
var rightRows = [];   // works in action plan

// ================================================================
// DOMAIN HELPERS (identical to Page 1)
// ================================================================
function domainKey(theme){
    if(!theme) return 'water';
    if(theme==='Domain I'||theme.includes('Domain I:')) return 'water';
    if(theme==='Domain II'||theme.includes('Domain II:')) return 'rural';
    if(theme==='Domain III'||theme.includes('Domain III:')) return 'livelihood';
    if(theme==='Domain IV'||theme.includes('Domain IV:')) return 'climate';
    return 'water';
}
function domainLabel(k){return{water:'Water Security',rural:'Rural Infrastructure',livelihood:'Livelihood Infrastructure',climate:'Climate Resilience', pm_gati_shakti:'PM Gati Shakti', yuktdhara: 'Yuktdhara', 'india_wris':'India WRIS'}[k]||k;}
function domainBadge(k){return{water:'domain-water',rural:'domain-rural',livelihood:'domain-livelihood',climate:'domain-climate', pm_gati_shakti:'domain-pm-gati-shakti'}[k]||'domain-water';}

// ================================================================
// HTML ESCAPE HELPER
// ================================================================
function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function filter(theme){
    if(activeFilter === theme){
        // Click same filter again: remove filter
        activeFilter = null;
        leftRows = masterRows;
    } else {
        // Click new filter: apply it
        activeFilter = theme;
        leftRows = masterRows.filter(function(r){
            return r.dk === theme;
        });
    }
    render();
}
// ================================================================
// UUID GENERATOR — identical to Page 1 (8-char hex)
// ================================================================
function genUUID(){return 'xxxxxxxx'.replace(/x/g,function(){return Math.floor(Math.random()*16).toString(16).toUpperCase();});}

function normalizeRowObj(obj) {
    return {
        serial:(obj["serial"] || ""),
        theme: (obj["theme"] || "").trim(),
        group: (obj["group"] || obj["Group Name (AI)"] || "").trim(),
        work: (obj["name"] || "").trim(),
        dk: (domainKey(obj["theme"]||'Domain I')).trim(),
        type: (obj["type"] || "").trim(),
        content: (obj.content || "").trim(),
        imageLink: (obj.image_link || "").trim()
    };
}

function jsonToObjects(jsonData) {
    if (!Array.isArray(jsonData)) {
        return [];
    }

    return jsonData.map(normalizeRowObj).filter(function (r) {
        return r.theme && r.group && r.work;
    });
}

function uniqueSorted(values) {
    return Array.from(new Set(values)).sort(function (a, b) {
        return a.localeCompare(b);
    });
}

function updateStats(){
    var lc={water:0,rural:0,livelihood:0,climate:0};
    var rc={water:0,rural:0,livelihood:0,climate:0};
    leftRows.forEach(function(r){ lc[r.dk]++; });
    rightRows.forEach(function(r){ rc[r.dk]++; });

    document.getElementById('lsWater').textContent=lc.water;
    document.getElementById('lsRural').textContent=lc.rural;
    document.getElementById('lsLivelihood').textContent=lc.livelihood;
    document.getElementById('lsClimate').textContent=lc.climate;

    document.getElementById('rsWater').textContent=rc.water;
    document.getElementById('rsRural').textContent=rc.rural;
    document.getElementById('rsLivelihood').textContent=rc.livelihood;
    document.getElementById('rsClimate').textContent=rc.climate;
}

async function fetchJson(path) {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) {
        throw new Error("Failed to load JSON: " + path);
    }
    return response.json();
}

async function getMasterRows() {
    const worksData = await fetchJson(WORKS_JSON_PATH);
    masterRows = jsonToObjects(worksData);
    return masterRows;
}
