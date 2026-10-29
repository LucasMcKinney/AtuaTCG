// =====================================================================
// ATUA TCG — APP
// =====================================================================

const NAV_ITEMS = [
    { route:"", key:"nav_home", icon:"i-home" },
    { route:"cards", key:"nav_cards", icon:"i-cards" },
    { route:"rules", key:"nav_rules", icon:"i-book" },
    { route:"about", key:"nav_about", icon:"i-info" },
];

const SUPERTYPE_COLOR = {
    atua:   { c:"#2f9e6e", l:"#d9f0e4" },
    tupuna: { c:"#c98812", l:"#fdedc6" },
    kotahi: { c:"#7c5cff", l:"#ece6ff" },
    mana:   { c:"#ff6a5c", l:"#ffe1dc" },
};
const RARITY_COLOR = {
    common:    { c:"#8a919b", l:"#eceded" },
    rare:      { c:"#2688c2", l:"#dcf0fb" },
    legendary: { c:"#c98812", l:"#fdedc6" },
};
const ABILITY_KIND = {
    gift:      { icon:"ic-gift",      c:"#2f9e6e", l:"#d9f0e4", labelKey:"gift" },
    help:      { icon:"ic-help",      c:"#2688c2", l:"#dcf0fb", labelKey:"help" },
    challenge: { icon:"ic-challenge", c:"#ff6a5c", l:"#ffe1dc", labelKey:"challenge" },
};

const state = {
    lang: "en",
    filters: { types:new Set(), traits:new Set(), elements:new Set(), rarities:new Set() },
    query: "",
    sort: "number",
    recentlyViewed: [],
    tab: "atua",
    support: { kinds:new Set(), origins:new Set(), conditions:new Set() },
    lastIds: [],
};

function t(key){ return (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key; }
function cardById(id){ return ALL_CARDS.find(c=>c.id===id); }
function icon(sym){ return `<svg class="icon"><use href="#${sym}"/></svg>`; }

// ---------------------------------------------------------------------
// ACCENT / VISUAL HELPERS
// ---------------------------------------------------------------------
function accentFor(card) {
    if (card.trait) {
        const tr = TRAITS[card.trait];
        if (tr) return { c: tr.color, l: tr.light };
    }

    const element = card.elements && ELEMENTS[card.elements[0]];
    if (element) return { c: element.color, l: element.light };

    // Safe fallback when card data has no matching colour.
    return { c: "#47796b", l: "#e0eee8" };
}
function elementChip(key, size){
    const e = ELEMENTS[key];
    return `<span class="el-chip" style="background:${e.color}" title="${e.label} · ${e.gloss}">${icon(e.icon)}</span>`;
}
function traitBadge(key){
    const tr = TRAITS[key];
    return `<span class="tile-trait-badge" style="--tc:${tr.color}">${icon(tr.icon)}${tr.label}</span>`;
}
function rarityChip(key){
    const r = RARITY[key];
    const c = RARITY_COLOR[key];
    return `<span class="rarity-chip" style="color:${c.c}">${icon(r.icon)}${r.label}</span>`;
}

function symbolicArt(elementKey){
    switch(elementKey){
        case "wai": return `<svg class="symbolic" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="140" fill="var(--cc-l)"/>
      <path d="M-10 70c15 0 15-16 30-16s15 16 30 16 15-16 30-16 15 16 30 16 15-16 30-16 15 16 30 16 15-16 30-16" stroke="var(--cc)" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.9"/>
      <path d="M-10 92c15 0 15-16 30-16s15 16 30 16 15-16 30-16 15 16 30 16 15-16 30-16 15 16 30 16" stroke="var(--cc)" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.5"/>
      <path d="M-10 114c15 0 15-16 30-16s15 16 30 16 15-16 30-16 15 16 30 16 15-16 30-16 15 16 30 16" stroke="var(--cc)" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.25"/>
    </svg>`;
        case "ahi": return `<svg class="symbolic" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="140" fill="var(--cc-l)"/>
      <path d="M100 20c9 30-22 38-22 66a22 22 0 0 0 44 0c0-12-7-16-7-24 14 9 22 24 22 46a37 37 0 0 1-74 0c0-40 22-48 37-88z" stroke="var(--cc)" stroke-width="4" fill="none" stroke-linejoin="round"/>
    </svg>`;
        case "hiko": return `<svg class="symbolic" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="140" fill="var(--cc-l)"/>
      <path d="M112 14 70 76h30l-8 52 46-66h-30z" stroke="var(--cc)" stroke-width="4" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M40 30l8 8M160 100l8 8M35 100l8-8M165 35l-8 8" stroke="var(--cc)" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
    </svg>`;
        case "kowhai": return `<svg class="symbolic" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="140" fill="var(--cc-l)"/>
      <circle cx="100" cy="70" r="26" stroke="var(--cc)" stroke-width="4" fill="none"/>
      <g stroke="var(--cc)" stroke-width="4" stroke-linecap="round">
        <path d="M100 24v-10M100 116v10M154 70h10M36 70h-10"/>
        <path d="M138 32l7-7M62 108l-7 7M62 32l-7-7M138 108l7 7"/>
      </g>
    </svg>`;
        case "po": return `<svg class="symbolic" viewBox="0 0 200 140" preserveAspectRatio="xMidYMid slice">
      <rect width="200" height="140" fill="var(--cc-l)"/>
      <path d="M148 46a34 34 0 1 1-42-42 28 28 0 0 0 42 42z" stroke="var(--cc)" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <circle cx="150" cy="95" r="3" fill="var(--cc)"/><circle cx="168" cy="72" r="2.2" fill="var(--cc)" opacity="0.7"/>
      <circle cx="130" cy="108" r="2" fill="var(--cc)" opacity="0.6"/><circle cx="55" cy="100" r="2.4" fill="var(--cc)" opacity="0.7"/>
    </svg>`;
        default: return `<svg class="symbolic" viewBox="0 0 200 140"><rect width="200" height="140" fill="var(--cc-l)"/></svg>`;
    }
}
function artHtml(card){
    if(card.art.type === "image"){
        return `<img src="${IMAGES[card.art.src]}" alt="${card.name} — illustration" loading="lazy">`;
    }
    return symbolicArt(card.art.domain);
}

// ---------------------------------------------------------------------
// NAV
// ---------------------------------------------------------------------
function currentRoute(){
    const hash = location.hash.replace(/^#\/?/, "");
    if(hash) return hash.split("/").filter(Boolean);
    const file = location.pathname.split("/").pop().toLowerCase();
    if(file === "cards.html") return ["cards"];
    if(file === "rules.html") return ["rules"];
    if(file === "about.html") return ["about"];
    return [""];
}
function routeName(){
    const p = currentRoute();
    if(["cards","rules","about"].includes(p[0])) return p[0];
    return "";
}
function renderNav(){
    const active = routeName();
    const pageHref = route => route ? `${route}.html` : "index.html";
    const items = (isMain) => NAV_ITEMS.map(n=>{
        const cls = (n.route===active) ? "active" : "";
        return isMain
            ? `<a href="${pageHref(n.route)}" class="nav-link ${cls}">${icon(n.icon)}${t(n.key)}</a>`
            : `<a href="${pageHref(n.route)}" class="tab-link ${cls}">${icon(n.icon)}<span>${t(n.key)}</span></a>`;
    }).join("");
    document.getElementById("mainNav").innerHTML = items(true);
    document.getElementById("tabbarInner").innerHTML = items(false);
}

// ---------------------------------------------------------------------
// FILTER / SORT
// ---------------------------------------------------------------------
function matches(card){
    const f = state.filters;
    if(f.types.size && !f.types.has(card.supertype)) return false;
    if(f.traits.size && (!card.trait || !f.traits.has(card.trait))) return false;
    if(f.elements.size && !(card.elements||[]).some(e=>f.elements.has(e))) return false;
    if(f.rarities.size && !f.rarities.has(card.rarity)) return false;
    return searchHit(card);
}
function searchHit(card){
    if(!state.query) return true;
    const q = state.query.toLowerCase();
    const hay = card.family==="support"
        ? [card.title||"", card.conditionLabel, card.text, card.extra||"", KINDS[card.kind].label, ORIGINS[card.origin].label]
        : [card.name, card.epithet, card.trait?TRAITS[card.trait].label:"", ...(card.abilities?card.abilities.map(a=>a.name):[])];
    return hay.join(" ").toLowerCase().includes(q);
}
function supportMatches(c){
    const f = state.support;
    if(f.kinds.size && !f.kinds.has(c.kind)) return false;
    if(f.origins.size && !f.origins.has(c.origin)) return false;
    if(f.conditions.size && !f.conditions.has(c.condition)) return false;
    return searchHit(c);
}
function currentList(){
    return state.tab==="support" ? sortCards(SUPPORT_CARDS.filter(supportMatches)) : sortCards(CARDS.filter(matches));
}
function sortCards(list){
    const arr = [...list];
    switch(state.sort){
        case "name": return arr.sort((a,b)=>a.name.localeCompare(b.name));
        case "mana-desc": return arr.sort((a,b)=>(b.mana||0)-(a.mana||0));
        case "mana-asc": return arr.sort((a,b)=>(a.mana||0)-(b.mana||0));
        case "condition": return arr.sort((a,b)=>a.conditionLabel.localeCompare(b.conditionLabel)||a.number-b.number);
        default: return arr.sort((a,b)=>a.number-b.number);
    }
}

// ---------------------------------------------------------------------
// CARD TILE
// ---------------------------------------------------------------------
function supportArtPath(c){
    const aliases = { autism:"asd", tourette:"tour", abi:"tbi" };
    const condition = aliases[c.condition] || c.condition;
    const prefix = { accommodation:"acco", affirmation:"affirm", task:"task" }[c.kind];
    const hasVariant = c.origin === "epigenetic" && ["adhd", "autism", "dyslexia"].includes(c.condition);
    return `assets/images/${prefix}${hasVariant ? "2" : ""}_${condition}.png`;
}
function supportTileHtml(c){
    const k = KINDS[c.kind], o = ORIGINS[c.origin];
    const main = c.title || c.conditionLabel, sub = c.title ? c.conditionLabel : "";
    const img = supportArtPath(c);
    return `<button class="card-tile support-tile" style="--cc:${o.color};--cc-l:${o.light};--kc:${k.color};--kl:${k.light}" data-card="${c.id}" aria-label="${k.label}: ${main}">
    <div class="sup-band"><img src="${img}" alt="${k.label} card artwork for ${c.conditionLabel}" loading="lazy"><span class="sup-art-kind">${k.label}</span></div>
    <div class="tile-body">
      <div class="sup-kind" style="color:${k.color}">${k.label}</div>
      <div class="tile-name">${main}</div>${sub?`<div class="tile-epithet">${sub}</div>`:""}
      <div class="tile-foot"><span class="origin-tag">${icon(o.icon)}${o.label}</span><span>${c.code}</span></div>
    </div></button>`;
}
function cardTileHtml(card){
    if(card.family==="support") return supportTileHtml(card);
    const ac = accentFor(card);
    const rarityC = RARITY_COLOR[card.rarity];
    return `
    <button class="card-tile" style="--cc:${ac.c};--cc-l:${ac.l}" data-card="${card.id}" aria-label="${card.name} — view details">
      <div class="tile-art">
        ${artHtml(card)}
        ${card.trait ? traitBadge(card.trait) : ""}
        ${card.mana!=null ? `<span class="tile-mana">${icon("st-mana")}${card.mana}</span>` : ""}
      </div>
      <div class="tile-body">
        <div class="tile-name">${card.name}</div>
        <div class="tile-epithet">${card.epithet}</div>
        <div class="tile-elements">${(card.elements||[]).map(e=>elementChip(e)).join("")}</div>
        <div class="tile-foot">
          <span>${SUPERTYPES[card.supertype].label}</span>
          <span class="rarity-chip" style="color:${rarityC.c}">${icon(RARITY[card.rarity].icon)}${RARITY[card.rarity].label}</span>
        </div>
      </div>
    </button>`;
}
function renderGrid(list, el){
    if(list.length===0){
        el.innerHTML = `<div class="empty-state">${icon("i-search")}<div>No cards match those filters yet.</div></div>`;
        return;
    }
    el.innerHTML = list.map(cardTileHtml).join("");
}

// delegate all "data-card" clicks to the modal
document.addEventListener("click", (e)=>{
    const el = e.target.closest("[data-card]");
    if(el){ openCardModal(el.dataset.card); }
});

// ---------------------------------------------------------------------
// HOME VIEW
// ---------------------------------------------------------------------
function renderHome(){
    document.getElementById("homeTitle").innerHTML = t("home_title").replace(/\*(.+?)\*/, "<em>$1</em>");
    document.getElementById("homeSub").textContent = t("home_sub");
    document.getElementById("btnViewCards").innerHTML = `${icon("i-cards")}${t("view_cards")}`;
    document.getElementById("btnLearnRules").innerHTML = `${icon("i-book")}${t("learn_rules")}`;

    const traitStrip = document.getElementById("homeTraitStrip");
    traitStrip.innerHTML = Object.entries(TRAITS).map(([key, tr]) => {
        const card = CARDS.find(c => c.trait === key);

        // Skip traits that don't have a matching card.
        if (!card) return "";

        return `<button class="trait-card" style="--tc:${tr.color};--tc-l:${tr.light}" data-card="${card.id}">
        <div class="badge-icon">${icon(tr.icon)}</div>
        <b>${tr.label}</b><span>${card.name}</span>
    </button>`;
    }).join("");

    document.getElementById("homeTypeStrip").innerHTML = Object.entries(SUPERTYPES).map(([key,s])=>{
        const c = SUPERTYPE_COLOR[key];
        return `<a href="cards.html" class="trait-card" style="--tc:${c.c};--tc-l:${c.l}" data-preset-type="${key}">
      <div class="badge-icon">${icon(s.icon)}</div><b>${s.label}</b><span>${s.gloss}</span>
    </a>`;
    }).join("");

    document.getElementById("homeKindStrip").innerHTML = Object.entries(KINDS).map(([key,k])=>
        `<a href="cards.html" class="trait-card" style="--tc:${k.color};--tc-l:${k.light}" data-preset-kind="${key}"><div class="badge-icon">${icon(k.icon)}</div><b>${k.label}</b><span>${k.desc}</span></a>`).join("");

    document.getElementById("homeElementStrip").innerHTML = Object.entries(ELEMENTS).map(([key,e])=>{
        return `<a href="cards.html" class="trait-card" style="--tc:${e.color};--tc-l:${e.light}" data-preset-element="${key}">
      <div class="badge-icon">${icon(e.icon)}</div><b>${e.label}</b><span>${e.gloss}</span>
    </a>`;
    }).join("");

    const preview = CARDS.filter(c=>c.supertype === "atua" && c.art && c.art.type === "image");
    renderGrid(preview.slice(0, 4), document.getElementById("homeCardPreview"));

    const helperPreview = [
        SUPPORT_CARDS.find(c=>c.condition === "adhd" && c.kind === "accommodation" && c.origin === "genetic"),
        SUPPORT_CARDS.find(c=>c.condition === "autism" && c.kind === "affirmation" && c.origin === "epigenetic"),
        SUPPORT_CARDS.find(c=>c.condition === "dyslexia" && c.kind === "task" && c.origin === "genetic"),
    ].filter(Boolean);
    renderGrid(helperPreview, document.getElementById("homeHelperPreview"));

    const heroCards = ["maui", "hinemoana", "tangaroa"].map(cardById).filter(Boolean);
    const heroWrap = document.getElementById("homeHeroCards");
    if(heroWrap) heroWrap.innerHTML = heroCards.map(c => `<button class="home-art-card" data-card="${c.id}" aria-label="Explore $">${artHtml(c)}</button>`).join("");
}
// home quick-filter links: clicking a type/element card jumps to Cards page pre-filtered
document.addEventListener("click", (e)=>{
    const typeEl = e.target.closest("[data-preset-type]");
    const elEl = e.target.closest("[data-preset-element]");
    const kindEl = e.target.closest("[data-preset-kind]");
    if(typeEl){ e.preventDefault(); window.location.href = `cards.html?type=${encodeURIComponent(typeEl.dataset.presetType)}`; }
    if(elEl){ e.preventDefault(); window.location.href = `cards.html?element=${encodeURIComponent(elEl.dataset.presetElement)}`; }
    if(kindEl){ e.preventDefault(); window.location.href = `cards.html?tab=support&kind=${encodeURIComponent(kindEl.dataset.presetKind)}`; }
});

// ---------------------------------------------------------------------
// CARDS (BROWSE) VIEW
// ---------------------------------------------------------------------
function buildPickGrid(containerId, entries, filterSet, colorMap){
    const el = document.getElementById(containerId);
    el.innerHTML = entries.map(([key, obj])=>{
        const col = colorMap[key];
        const pressed = filterSet.has(key);
        const iconSym = obj.icon;
        return `<button class="pick-btn" data-key="${key}" style="--pc:${col.c||col.color};--pc-l:${col.l||col.light}" aria-pressed="${pressed}">
      <span class="badge-icon">${icon(iconSym)}</span><span class="pick-label">${obj.label}</span>
    </button>`;
    }).join("");
    el.querySelectorAll(".pick-btn").forEach(btn=>{
        btn.addEventListener("click", ()=>{
            const k = btn.dataset.key;
            if(filterSet.has(k)) filterSet.delete(k); else filterSet.add(k);
            btn.setAttribute("aria-pressed", filterSet.has(k));
            renderCardsResults();
        });
    });
}
function renderFilterPanel(){
    document.querySelector('#filterPanel h3').innerHTML = `${icon("i-filter")}${t("filters")}`;
    const labels = document.querySelectorAll("#atuaFilters .filter-group > .label");
    const keys = ["type","trait","element","rarity"];
    labels.forEach((l,i)=> l.textContent = t(keys[i]));
    document.getElementById("clearFiltersBtn").textContent = t("clear");

    buildPickGrid("filterType", Object.entries(SUPERTYPES), state.filters.types, SUPERTYPE_COLOR);
    buildPickGrid("filterTrait", Object.entries(TRAITS).map(([k,v])=>[k,{label:v.label,icon:v.icon}]), state.filters.traits,
        Object.fromEntries(Object.entries(TRAITS).map(([k,v])=>[k,{c:v.color,l:v.light}])));
    buildPickGrid("filterElement", Object.entries(ELEMENTS).map(([k,v])=>[k,{label:v.label,icon:v.icon}]), state.filters.elements,
        Object.fromEntries(Object.entries(ELEMENTS).map(([k,v])=>[k,{c:v.color,l:v.light}])));
    buildPickGrid("filterRarity", Object.entries(RARITY), state.filters.rarities, RARITY_COLOR);
    renderSupportFilters();
}
function renderSupportFilters(){
    const S = state.support;
    const cm = o => Object.fromEntries(Object.entries(o).map(([k,v])=>[k,{c:v.color,l:v.light}]));
    buildPickGrid("filterKind", Object.entries(KINDS), S.kinds, cm(KINDS));
    buildPickGrid("filterOrigin", Object.entries(ORIGINS), S.origins, cm(ORIGINS));
    const el = document.getElementById("filterCondition");
    el.innerHTML = Object.entries(CONDITIONS).map(([k,c])=>`<button class="chip-pick" data-key="${k}" aria-pressed="${S.conditions.has(k)}">${c.label}${c.teReo?`<small>${c.teReo}</small>`:""}</button>`).join("");
    el.querySelectorAll(".chip-pick").forEach(b=>b.addEventListener("click",(event)=>{
        event.preventDefault();
        const scrollY = window.scrollY;
        const k = b.dataset.key;
        if(S.conditions.has(k)) S.conditions.delete(k); else S.conditions.add(k);
        b.setAttribute("aria-pressed", S.conditions.has(k));
        renderCardsResults();
        window.scrollTo({top:scrollY, left:0, behavior:"auto"});
    }));
    document.getElementById("originHint").innerHTML = Object.values(ORIGINS).map(o=>`<b>${o.label}:</b> ${o.kid}`).join("<br>");
}
function updateTabs(){
    const a = CARDS.filter(searchHit).length, s = SUPPORT_CARDS.filter(searchHit).length;
    document.getElementById("cardTabs").innerHTML =
        `<button class="card-tab" role="tab" data-tab="atua" aria-selected="${state.tab==="atua"}">${icon("st-atua")}Atua <span class="count">${a}</span></button>`+
        `<button class="card-tab" role="tab" data-tab="support" aria-selected="${state.tab==="support"}">${icon("i-shield")}Helper Cards <span class="count">${s}</span></button>`;
}
function renderCardsResults(){
    const list = currentList();
    state.lastIds = list.map(c=>c.id);
    updateTabs();
    document.getElementById("resultsNum").textContent = list.length;
    document.getElementById("resultsLabel").textContent = t("results");
    renderGrid(list, document.getElementById("cardsGrid"));
}
function renderCardsPage(){
    renderFilterPanel();
    const sup = state.tab==="support";
    document.getElementById("atuaFilters").style.display = sup ? "none" : "";
    document.getElementById("supportFilters").style.display = sup ? "" : "none";
    const opts = sup
        ? [["number","Sort: Collection order"],["name","Sort: Name (A–Z)"],["condition","Sort: Condition (A–Z)"]]
        : [["number","Sort: Collection order"],["name","Sort: Name (A–Z)"],["mana-desc","Sort: Mana (high–low)"],["mana-asc","Sort: Mana (low–high)"]];
    if(!opts.some(o=>o[0]===state.sort)) state.sort = "number";
    document.getElementById("sortSelect").innerHTML = opts.map(o=>`<option value="${o[0]}">${o[1]}</option>`).join("");
    document.getElementById("searchInput").value = state.query;
    document.getElementById("sortSelect").value = state.sort;
    renderCardsResults();
}
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
if(clearFiltersBtn) clearFiltersBtn.addEventListener("click", ()=>{
    state.filters = { types:new Set(), traits:new Set(), elements:new Set(), rarities:new Set() };
    state.support = { kinds:new Set(), origins:new Set(), conditions:new Set() };
    state.query = ""; state.sort = "number";
    document.getElementById("searchInput").value = "";
    document.getElementById("sortSelect").value = "number";
    renderCardsPage();
});
const sortSelect = document.getElementById("sortSelect");
if(sortSelect) sortSelect.addEventListener("change", e=>{ state.sort = e.target.value; renderCardsResults(); });
let searchDebounce;
document.getElementById("searchInput").addEventListener("input", e=>{
    clearTimeout(searchDebounce);
    const val = e.target.value;
    searchDebounce = setTimeout(()=>{ state.query = val.trim(); if(routeName()==="cards") renderCardsResults(); }, 120);
});
const mobileFilterToggle = document.getElementById("mobileFilterToggle");
if(mobileFilterToggle) mobileFilterToggle.addEventListener("click", ()=>{
    document.getElementById("filterPanel").classList.toggle("open");
});

// ---------------------------------------------------------------------
// CARD DETAIL MODAL
// ---------------------------------------------------------------------
function openCardModal(id){
    const card = cardById(id);
    const wrap = document.getElementById("detailContent");
    if(!card){ return; }
    if(card.family==="support"){ openSupportModal(card); return; }

    if(!state.recentlyViewed.includes(id)){
        state.recentlyViewed.unshift(id);
        state.recentlyViewed = state.recentlyViewed.slice(0,8);
    }

    const ac = accentFor(card);
    const superC = SUPERTYPE_COLOR[card.supertype];
    const rarityC = RARITY_COLOR[card.rarity];

    const idx = CARDS.findIndex(c=>c.id===id);
    const prev = CARDS[(idx-1+CARDS.length)%CARDS.length];
    const next = CARDS[(idx+1)%CARDS.length];

    const abilitiesHtml = (card.abilities||[]).map(a=>{
        const k = ABILITY_KIND[a.kind];
        return `<div class="ability-row">
      <div class="ability-icon" style="--ac:${k.c};--ac-l:${k.l}">${icon(k.icon)}</div>
      <div>
        <div class="ability-kind" style="color:${k.c}">${t(k.labelKey)}</div>
        <div class="ability-name">${a.name}</div>
        <div class="ability-text">${a.text}</div>
      </div>
    </div>`;
    }).join("");

    let extraSections = "";
    if(card.trait){
        const accomHtml = (card.accommodations||[]).map(a=>`<li>${icon("i-shield")}${a}</li>`).join("");
        const srcList = [...(SOURCES[card.trait]||[]), SOURCES.maori];
        const srcHtml = srcList.map(s=>`<a href="${s.url}" target="_blank" rel="noopener">${icon("i-link")}${s.name}${icon("i-arrow-right").replace('class="icon"','class="icon go"')}</a>`).join("");
        extraSections = `
      <div class="ability-block">
        <h2>${icon("i-shield")}${t("things_help")}</h2>
        <ul class="accom-list">${accomHtml}</ul>
      </div>
      <div class="ability-block">
        <h2>${icon("i-bulb")}${t("our_story")}</h2>
        <p class="story-text">${card.story}</p>
      </div>
      <div class="ability-block">
        <h2>${icon("i-link")}${t("learn_more")}</h2>
        <div class="source-list">${srcHtml}</div>
      </div>`;
    } else {
        const text = card.funFact || card.effect || "";
        extraSections = `
      <div class="ability-block">
        <h2>${icon("i-bulb")}${t("fun_fact")}</h2>
        <p class="story-text">${text}</p>
      </div>`;
    }

    const gameTipHtml = card.gameTip ? `
    <div class="ability-block">
      <h2>${icon("i-swords")}${t("game_tip")}</h2>
      <div class="gametip-box">${icon("i-bulb")}<p>${card.gameTip}</p></div>
    </div>` : "";

    const nHelp = card.trait ? SUPPORT_CARDS.filter(s=>s.condition===card.trait).length : 0;
    const helperBlock = nHelp ? `<div class="ability-block"><h2>${icon("i-shield")}Helper cards for ${TRAITS[card.trait].label}</h2><button class="btn btn-gold" data-support-condition="${card.trait}">${icon("i-cards")}See ${nHelp} helper cards</button></div>` : "";
    const related = CARDS.filter(c=>c.id!==card.id && (c.supertype===card.supertype || (c.elements||[]).some(e=>(card.elements||[]).includes(e)))).slice(0,4);
    const relatedHtml = related.length ? `
    <div class="ability-block">
      <h2>${icon("st-kotahi")}${t("related")}</h2>
      <div class="related-grid">${related.map(cardTileHtml).join("")}</div>
    </div>` : "";

    wrap.innerHTML = `
    <div class="detail-top" style="--cc:${ac.c};--cc-l:${ac.l}">
      <div>
        <div class="detail-art">${artHtml(card)}</div>
        ${card.artist ? `<div class="detail-artist">Art by ${card.artist}</div>` : ""}
      </div>
      <div>
        <div class="detail-badges">
          <span class="pill" style="background:${superC.l};color:${superC.c}">${icon(SUPERTYPES[card.supertype].icon)}${SUPERTYPES[card.supertype].label}</span>
          ${card.trait ? `<span class="pill" style="background:${TRAITS[card.trait].light};color:${TRAITS[card.trait].color}">${icon(TRAITS[card.trait].icon)}${TRAITS[card.trait].label}</span>` : ""}
          <span class="pill" style="background:${rarityC.l};color:${rarityC.c}">${icon(RARITY[card.rarity].icon)}${RARITY[card.rarity].label}</span>
        </div>
        <h1 class="detail-name">${card.name}</h1>
        <div class="detail-epithet">${card.epithet}</div>
        <div class="detail-stats">
          ${card.mana!=null ? `<span class="stat-chip">${icon("st-mana")}Mana ${card.mana}</span>` : ""}
          <span class="stat-chip">${(card.elements||[]).map(e=>elementChip(e)).join(" ")}</span>
        </div>
      </div>
    </div>

    ${card.abilities ? `<div class="ability-block"><h2>${icon("ic-gift")}${card.name}'s Abilities</h2>${abilitiesHtml}</div>` : `
    <div class="ability-block"><h2>${icon("st-mana")}What It Does</h2><p class="story-text">${card.effect||""}</p></div>`}

    ${extraSections}
    ${gameTipHtml}
    ${helperBlock}
    ${relatedHtml}

    <div class="detail-footer-nav">
      <button class="btn btn-ghost" data-card="${prev.id}">${icon("i-arrow-left")}${t("prev_card")}</button>
      <button class="btn btn-primary" data-card="${next.id}">${t("next_card")}${icon("i-arrow-right")}</button>
    </div>
  `;

    document.getElementById("cardModalOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
    const modalOverlay = document.getElementById("cardModalOverlay");
    if(modalOverlay) modalOverlay.scrollTop = 0;
}
function openSupportModal(c){
    const wrap = document.getElementById("detailContent");
    const k = KINDS[c.kind], o = ORIGINS[c.origin], cond = CONDITIONS[c.condition];
    const ids = state.lastIds.includes(c.id) ? state.lastIds : SUPPORT_CARDS.map(x=>x.id);
    const i = ids.indexOf(c.id), prev = ids[(i-1+ids.length)%ids.length], next = ids[(i+1)%ids.length];
    const atua = cond.trait ? CARDS.filter(a=>a.supertype === "atua" && a.trait===cond.trait && a.art && a.art.type === "image") : [];
    const sibs = SUPPORT_CARDS.filter(s=>s.condition===c.condition && s.id!==c.id).slice(0,6);
    const R = SUPPORT_REFS[c.origin];
    const refs = Array.isArray(R) ? R : (R[c.condition]||[]);
    wrap.innerHTML = `
    <div class="detail-top" style="--cc:${o.color};--cc-l:${o.light}">
      <div>
        <div class="detail-art sup-art" style="background:${k.light};color:${k.color}"><img src="${supportArtPath(c)}" alt="${k.label} card artwork for ${c.conditionLabel}" loading="lazy"></div>
        <div class="detail-artist">${o.label} collection · ${c.code}</div>
      </div>
      <div>
        <div class="detail-badges">
          <span class="pill" style="background:${k.light};color:${k.color}">${icon(k.icon)}${k.label}</span>
          <span class="pill" style="background:${o.light};color:${o.color}">${icon(o.icon)}${o.label}</span>
        </div>
        <h1 class="detail-name">${c.title||c.conditionLabel}</h1>
        ${c.title?`<div class="detail-epithet">${c.conditionLabel}</div>`:""}
        <p class="sup-text">${c.text}</p>
        ${c.extra?`<p class="sup-text">${c.extra}</p>`:""}
        ${c.kind==="accommodation"?`<div class="sup-compat">${icon("i-shield")}Compatible with ${c.conditionLabel}</div>`:""}
      </div>
    </div>
    ${atua.length?`<div class="ability-block"><h2>${icon("st-atua")}Atua who share this</h2><div class="related-grid">${atua.map(cardTileHtml).join("")}</div></div>`:""}
    ${sibs.length?`<div class="ability-block"><h2>${icon("st-kotahi")}More for ${cond.label}</h2><div class="related-grid">${sibs.map(cardTileHtml).join("")}</div></div>`:""}
    <div class="ability-block">
      <h2>${icon("i-info")}For grown-ups</h2>
      <p class="sup-text" style="margin-top:0">${o.sub} · ${o.note}</p>
      ${c.cause?`<p class="sup-text">Environmental mapping: ${c.cause}</p>`:""}
      ${c.adapted?`<p class="sup-text">${c.adapted}</p>`:""}
      <details class="source-details" ${refs.length<=2?"open":""}><summary>${icon("i-link")} Sources (${refs.length})</summary><ul>${refs.map(r=>`<li>${r}</li>`).join("")}</ul></details>
    </div>
    <div class="detail-footer-nav">
      <button class="btn btn-ghost" data-card="${prev}">${icon("i-arrow-left")}${t("prev_card")}</button>
      <button class="btn btn-primary" data-card="${next}">${t("next_card")}${icon("i-arrow-right")}</button>
    </div>`;
    document.getElementById("cardModalOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
    const modalOverlay = document.getElementById("cardModalOverlay");
    if(modalOverlay) modalOverlay.scrollTop = 0;
}
function closeCardModal(){
    const overlay = document.getElementById("cardModalOverlay");
    if(overlay) overlay.classList.remove("open");
    if(!document.getElementById("disclaimerModalOverlay") || !document.getElementById("disclaimerModalOverlay").classList.contains("open")){
        document.body.style.overflow = "";
    }
}
const modalCloseBtn = document.getElementById("modalCloseBtn");
if(modalCloseBtn) modalCloseBtn.addEventListener("click", closeCardModal);
const cardModalOverlay = document.getElementById("cardModalOverlay");
if(cardModalOverlay) cardModalOverlay.addEventListener("click", (e)=>{
    if(e.target.id === "cardModalOverlay") closeCardModal();
});
document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape"){
        closeCardModal();
        closeDisclaimerModal();
    }
});

// ---------------------------------------------------------------------
// DEMO DISCLAIMER MODAL
// ---------------------------------------------------------------------
let homeDisclaimerShownThisSession = false;

function renderDisclaimer(){
    const title = document.getElementById("disclaimerTitle");
    if(title) title.textContent = t("disclaimer_title");
    const tagline = document.getElementById("disclaimerTagline");
    if(tagline) tagline.textContent = t("disclaimer_tagline");
    const lead = document.getElementById("disclaimerLead");
    if(lead) lead.innerHTML = t("disclaimer_lead");
    const note = document.getElementById("disclaimerNote");
    if(note) note.textContent = t("disclaimer_note");
    const btn = document.getElementById("disclaimerBtnLabel");
    if(btn) btn.textContent = t("disclaimer_btn");
    const dontShow = document.getElementById("disclaimerDontShowLabel");
    if(dontShow) dontShow.textContent = t("disclaimer_dont_show");
    const openLink = document.getElementById("openDisclaimerBtn");
    if(openLink) openLink.textContent = t("disclaimer_link");
}

function openDisclaimerModal(){
    const overlay = document.getElementById("disclaimerModalOverlay");
    if(!overlay) return;
    renderDisclaimer();
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    const btn = document.getElementById("disclaimerAcknowledgeBtn");
    if(btn) btn.focus();
}

function closeDisclaimerModal(){
    homeDisclaimerShownThisSession = true;
    const overlay = document.getElementById("disclaimerModalOverlay");
    if(!overlay) return;
    overlay.classList.remove("open");
    if(!document.getElementById("cardModalOverlay").classList.contains("open")){
        document.body.style.overflow = "";
    }
    const chk = document.getElementById("disclaimerDontShowAgain");
    if(chk && chk.checked){
        try { localStorage.setItem("atua_disclaimer_never_show", "true"); } catch(e){}
    }
}

function checkHomeDisclaimer(){
    if(!document.getElementById("disclaimerModalOverlay")) return;
    if(homeDisclaimerShownThisSession) return;
    try {
        if(localStorage.getItem("atua_disclaimer_never_show") === "true") return;
    } catch(e){}

    homeDisclaimerShownThisSession = true;
    setTimeout(()=>{
        if(routeName() === "" && !document.getElementById("cardModalOverlay").classList.contains("open")){
            openDisclaimerModal();
        }
    }, 250);
}


// ---------------------------------------------------------------------
// GAME RULES VIEW
// ---------------------------------------------------------------------
function renderRules(){
    const steps = [
        { t:"Pick Your Team", d:"Choose Atua, Tūpuna, and Kotahi cards to build a team of six." },
        { t:"Power Them Up", d:"Use Mana cards to give your Atua the Ahi, Wai, Hiko, Kōwhai, or Pō power they need to act." },
        { t:"Use Their Gift", d:"Every Atua has a Pūmanawa — a gift that makes them strong. That's their best move." },
        { t:"Give Support", d:"Play a Manaakitanga — a way to help — to support your Atua exactly when they need it." },
        { t:"Plan Around the Challenge", d:"Every Atua has a Werohanga too — a challenge. A good team plans around it, together." },
        { t:"Win Together", d:"The first team to help all of their Atua shine takes the win." },
    ];
    const stepsHtml = steps.map((s,i)=>`
    <div class="step-item">
      <div class="step-num">${i+1}</div>
      <div><h3>${s.t}</h3><p>${s.d}</p></div>
    </div>`).join("");

    const typeLegend = Object.entries(SUPERTYPES).map(([k,s])=>{
        const c = SUPERTYPE_COLOR[k];
        return `<div class="legend-item" style="--lc:${c.c};--lc-l:${c.l}"><div class="badge-icon">${icon(s.icon)}</div><b>${s.label}</b><span>${s.gloss}</span></div>`;
    }).join("");

    const elementLegend = Object.entries(ELEMENTS).map(([k,e])=>{
        return `<div class="legend-item" style="--lc:${e.color};--lc-l:${e.light}"><div class="badge-icon">${icon(e.icon)}</div><b>${e.label}</b><span>${e.gloss}</span></div>`;
    }).join("");

    const sideExplain = [
        { icon:"ic-gift", c:"#2f9e6e", l:"#d9f0e4", name:"Ngā Pūmanawa — A Gift", d:"Something this Atua is naturally brilliant at." },
        { icon:"ic-help", c:"#2688c2", l:"#dcf0fb", name:"Te Manaakitanga — A Way to Help", d:"Something that supports this Atua to do their best." },
        { icon:"ic-challenge", c:"#ff6a5c", l:"#ffe1dc", name:"Ngā Werohanga — A Challenge", d:"Something that's genuinely hard for this Atua sometimes." },
    ].map(x=>`<div class="trait-explain"><div class="badge-icon" style="--tc:${x.c};--tc-l:${x.l}">${icon(x.icon)}</div><div><h4>${x.name}</h4><p>${x.d}</p></div></div>`).join("");

    const traitExplain = Object.entries(TRAITS).map(([k,tr])=>{
        const card = CARDS.find(c=>c.trait===k);
        return `<div class="trait-explain" style="--tc:${tr.color};--tc-l:${tr.light}">
      <div class="badge-icon">${icon(tr.icon)}</div>
      <div><h4>${tr.label} — ${card.name}</h4><p>${card.abilities[0].text}</p></div>
    </div>`;
    }).join("");

    document.getElementById("rulesContent").innerHTML = `
    <div class="rules-hero">
      <h1>How to Play</h1>
      <p>Atua TCG is a card game about the gods of Māori stories — and about the different ways all our brains work.</p>
    </div>

    <div class="step-list">${stepsHtml}</div>

    <div class="rules-section-title">${icon("i-cards")}<h2>Card Types</h2></div>
    <div class="legend-grid">${typeLegend}</div>

    <div class="rules-section-title">${icon("i-shield")}<h2>Helper Cards</h2></div>
    <div class="legend-grid">${Object.values(KINDS).map(k=>`<div class="legend-item" style="--lc:${k.color};--lc-l:${k.light}"><div class="badge-icon">${icon(k.icon)}</div><b>${k.label}</b><span>${k.desc}</span></div>`).join("")}</div>

    <div class="rules-section-title">${icon("st-mana")}<h2>The Five Elements</h2></div>
    <div class="legend-grid">${elementLegend}</div>

    <div class="rules-section-title">${icon("i-bulb")}<h2>Every Atua Has Three Sides</h2></div>
    ${sideExplain}

    <div class="rules-section-title">${icon("i-star")}<h2>The Four Trait Cards</h2></div>
    ${traitExplain}

    <div class="rules-section-title">${icon("i-trophy")}<h2>How to Win</h2></div>
    <div class="win-box">${icon("i-trophy")}<p>The first player to get every Atua on their team to use their Pūmanawa (gift) at full strength wins the round. There's no wrong way to build your team — just like there's no one right way for a brain to work.</p></div>
  `;
}

// ---------------------------------------------------------------------
// ABOUT VIEW
// ---------------------------------------------------------------------
function renderAbout(){
    const team = [
        { role:"Dr. Tony Clear", note:"Supervisor and mentor" },
        { role:"Dr. Hazel Abraham", note:"Te reo Māori & tikanga review" },
        { role:"Anthony Rawlinson", note:"Rules & card mechanics, Back-end Developer" },
        { role:"Lucas McKinney", note:"Data analyst and ontology architect, Full-stack Developer" },
        { role:"Yatharth Haldar", note:"Art direction and website designer, Front-end Developer" },
    ];
    const teamHtml = team.map(m=>`
    <div class="team-card">
      <div class="avatar">${icon("i-users")}</div>
      <b>${m.role}</b><span>${m.note}</span>
    </div>`).join("");

    const timeline = [
        { y:"Concept", d:"The first idea" },
        { y:"Research", d:"Learning together with advisors" },
        { y:"Prototype", d:"First cards & wireframes" },
        { y:"Today", d:"This demo site" },
    ];
    const timelineHtml = timeline.map(x=>`
    <div class="timeline-item"><div class="timeline-dot"></div><b>${x.y}</b><span>${x.d}</span></div>`).join("");

    document.getElementById("aboutContent").innerHTML = `
    <div class="about-hero">
      <h1>About Atua TCG</h1>
      <p style="color:var(--ink-soft);max-width:56ch;margin:10px auto 0;">A card game made to celebrate Māori stories and neurodiverse brains, side by side.</p>
    </div>

    <div class="about-block">
      <h2>${icon("i-flag")}Our Mission</h2>
      <p>We want every kid to see themselves as having a gift, a way they like to be helped, and a challenge they're working on — atua included. This game brings te ao Māori (the Māori world) and neurodiversity-affirming ideas together, in one place, made for kids.</p>
    </div>

    <div class="about-block">
      <h2>${icon("i-users")}The Atua TCG Team</h2>
      <div class="team-grid">${teamHtml}</div>
      <div class="advisory-box">
        <p>Every Māori word and macron on this site has been checked against Te Aka Māori Dictionary and reviewed with care. We're not a fluent-speaker translation team yet, so full-sentence te reo translations of every page are still a work in progress — we'd rather say that plainly than get it wrong.</p>
      </div>
    </div>

    <div class="about-block">
      <h2>${icon("i-calendar")}Project Timeline</h2>
      <div class="timeline">${timelineHtml}</div>
    </div>

    <div class="about-block">
      <h2>${icon("i-info")}Join the Kaupapa</h2>
      <div class="community-list">
        <div class="row">${icon("i-link")}Official website — coming soon</div>
        <div class="row">${icon("i-users")}Community forum — coming soon</div>
      </div>
    </div>
  `;
}

// ---------------------------------------------------------------------
// ROUTER
// ---------------------------------------------------------------------
function showView(name){
    document.querySelectorAll(".view").forEach(v=>v.classList.remove("active"));
    const target = document.getElementById("view-"+name);
    if(target) target.classList.add("active");
}
function route(){
    const parts = currentRoute();
    renderNav();
    const filterPanel = document.getElementById("filterPanel");
    if(filterPanel) filterPanel.classList.remove("open");

    if(parts[0]==="cards"){
        showView("cards");
        if(document.getElementById("view-cards")) renderCardsPage();
    } else if(parts[0]==="rules"){
        showView("rules");
        if(document.getElementById("rulesContent")) renderRules();
    } else if(parts[0]==="about"){
        showView("about");
        if(document.getElementById("aboutContent")) renderAbout();
    } else {
        showView("home");
        if(document.getElementById("view-home")) { renderHome(); checkHomeDisclaimer(); }
    }
    // Page navigation already starts at the top; condition filters don't call route().
    if(!document.getElementById("filterCondition")) window.scrollTo({top:0,left:0,behavior:"auto"});
}
window.addEventListener("hashchange", route);

// ---------------------------------------------------------------------
// LANGUAGE TOGGLE
// ---------------------------------------------------------------------
document.getElementById("langToggle").addEventListener("click", ()=>{
    state.lang = state.lang === "en" ? "mi" : "en";
    document.getElementById("langLabel").textContent = state.lang === "en" ? "EN / MI" : "MI / EN";
    document.documentElement.lang = state.lang;
    renderDisclaimer();
    route();
});

// ---------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------
const cardTabsEl = document.getElementById("cardTabs");
if(cardTabsEl) cardTabsEl.addEventListener("click", e=>{
    const b = e.target.closest("[data-tab]"); if(!b) return;
    state.tab = b.dataset.tab; state.sort = "number"; renderCardsPage();
});
document.addEventListener("click", e=>{
    const sc = e.target.closest("[data-support-condition]");
    if(sc){
        state.tab = "support"; state.query = "";
        state.support = { kinds:new Set(), origins:new Set(), conditions:new Set([sc.dataset.supportCondition]) };
        closeCardModal();
        if(routeName()==="cards") renderCardsPage(); else window.location.href = `cards.html?tab=support&condition=${encodeURIComponent(sc.dataset.supportCondition)}`;
    }
    const pk = e.target.closest("[data-preset-kind]");
    if(pk){ state.tab = "support"; state.support.kinds = new Set([pk.dataset.presetKind]); }
});

const disclaimerCloseBtn = document.getElementById("disclaimerCloseBtn");
if(disclaimerCloseBtn) disclaimerCloseBtn.addEventListener("click", closeDisclaimerModal);
const disclaimerAcknowledgeBtn = document.getElementById("disclaimerAcknowledgeBtn");
if(disclaimerAcknowledgeBtn) disclaimerAcknowledgeBtn.addEventListener("click", closeDisclaimerModal);
const disclaimerOverlay = document.getElementById("disclaimerModalOverlay");
if(disclaimerOverlay) disclaimerOverlay.addEventListener("click", (e)=>{
    if(e.target.id === "disclaimerModalOverlay") closeDisclaimerModal();
});
const openDisclaimerBtn = document.getElementById("openDisclaimerBtn");
if(openDisclaimerBtn){
    openDisclaimerBtn.addEventListener("click", openDisclaimerModal);
}

const routePreset = new URLSearchParams(location.search);
if(routePreset.get("tab") === "support") state.tab = "support";
if(routePreset.get("type")) state.filters.types = new Set([routePreset.get("type")]);
if(routePreset.get("element")) state.filters.elements = new Set([routePreset.get("element")]);
if(routePreset.get("kind")) state.support.kinds = new Set([routePreset.get("kind")]);
if(routePreset.get("condition")) state.support.conditions = new Set([routePreset.get("condition")]);
route();
