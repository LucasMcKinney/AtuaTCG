// =====================================================================
// ATUA TCG — DATA
// =====================================================================

const I18N = {
    en: {
        nav_home:"Home", nav_cards:"Cards", nav_rules:"Game Rules", nav_about:"About",
        search_ph:"Search cards…", sign_in:"Sign In",
        filters:"Filters", type:"Card Type", trait:"Trait", element:"Element", rarity:"Rarity", clear:"Clear all",
        results:"cards found", back_list:"Back to Cards", next_card:"Next Card", prev_card:"Previous Card",
        gift:"A Gift", help:"A Way to Help", challenge:"A Challenge",
        things_help:"Things That Help", our_story:"Our Atua Story", learn_more:"Want to Learn More?",
        game_tip:"Game Tip", related:"More Cards Like This", fun_fact:"Did You Know?",
        home_title:"Every Atua has *a gift*.", home_sub:"Meet the gods of Māori stories — and see how their strengths, needs, and challenges are a bit like ours.",
        view_cards:"See All Cards", learn_rules:"Learn to Play",
        disclaimer_title:"Notice: Demonstration Art",
        disclaimer_tagline:"Demonstration & Educational Purposes",
        disclaimer_lead:"Welcome to <strong>Atua TCG</strong>! Please note that all images and artwork displayed on this site are for <strong>demonstration purposes only</strong>.",
        disclaimer_note:"Original illustrations remain the property of their respective artists (including card artwork by Māori Mermaid). Cards without custom art feature symbolic element emblems to honour the living atua of Māori tradition.",
        disclaimer_btn:"I Understand",
        disclaimer_dont_show:"Don't show again on this device",
        disclaimer_link:"Image Disclaimer"
    },
    mi: {
        nav_home:"Kāinga", nav_cards:"Kāri", nav_rules:"Ngā Ture Tākaro", nav_about:"Mō Mātou",
        search_ph:"Rapua he kāri…", sign_in:"Takiuru",
        filters:"Tātari", type:"Momo Kāri", trait:"Āhuatanga", element:"Huanga", rarity:"Rarity", clear:"Ūkuia",
        results:"kāri kitea", back_list:"Hoki ki ngā Kāri", next_card:"Kāri e Whai Ake", prev_card:"Kāri o Mua",
        gift:"He Pūmanawa", help:"He Manaakitanga", challenge:"He Werohanga",
        things_help:"Ngā Mea Āwhina", our_story:"Tō Mātou Kōrero", learn_more:"Hiahia Ako Anō?",
        game_tip:"Tohutohu Tākaro", related:"Ētahi Atu Kāri Pēnei", fun_fact:"Mōhio Koe?",
        home_title:"Every Atua has *a gift*.", home_sub:"Meet the gods of Māori stories — and see how their strengths, needs, and challenges are a bit like ours.",
        view_cards:"Tirohia Ngā Kāri", learn_rules:"Ako ki te Tākaro",
        disclaimer_title:"He Pānui: Whakaaturanga Toi",
        disclaimer_tagline:"Mō ngā kaupapa whakaatu kau anake",
        disclaimer_lead:"Nau mai ki <strong>Atua TCG</strong>! Kia mōhio mai koutou, ko ngā whakaahua katoa kei tēnei pae he mea <strong>whakaatu kau noa iho</strong>.",
        disclaimer_note:"Kei ngā ringatoi tonu te mana o ngā toi tūturu (tae atu ki ngā toi nā Māori Mermaid). Mō ngā kāri kāore he whakaahua, he tohu huanga kē hei whakanui i ngā atua Māori.",
        disclaimer_btn:"Kua Mārama Au",
        disclaimer_dont_show:"Kaua e whakaatu anō ki tēnei pūrere",
        disclaimer_link:"Pānui Whakaahua"
    }
};

const ELEMENTS = {
    ahi:    { label:"Ahi",    gloss:"Fire",     color:"#e8583a", light:"#ff8f6b", icon:"el-ahi" },
    wai:    { label:"Wai",    gloss:"Water",    color:"#2688c2", light:"#6fc3ea", icon:"el-wai" },
    hiko:   { label:"Hiko",   gloss:"Electric", color:"#7c5cff", light:"#b3a1ff", icon:"el-hiko" },
    kowhai: { label:"Kōwhai", gloss:"Light",    color:"#e8a628", light:"#ffce6b", icon:"el-kowhai" },
    po:     { label:"Pō",     gloss:"Night",    color:"#4b4368", light:"#8b7fb8", icon:"el-po" },
};

const TRAITS = {
    adhd:       { label:"ADHD",       color:"#ff6a3c", light:"#ffb094", icon:"tr-adhd" },
    autism:     { label:"Autism",     color:"#1fb6c9", light:"#8be3ec", icon:"tr-autism" },
    dyslexia:   { label:"Dyslexia",   color:"#9a5cd6", light:"#cfaeef", icon:"tr-dyslexia" },
    hyperfocus: { label:"Hyperfocus", color:"#e8a628", light:"#ffce6b", icon:"tr-hyperfocus" },
};

const SUPERTYPES = {
    atua:   { label:"Atua",   gloss:"Gods & Guardians", icon:"st-atua" },
    tupuna: { label:"Tūpuna", gloss:"Ancestors",         icon:"st-tupuna" },
    kotahi: { label:"Kotahi", gloss:"Together",          icon:"st-kotahi" },
    mana:   { label:"Mana",   gloss:"Power",             icon:"st-mana" },
};

const RARITY = {
    common:    { label:"Common",    icon:"ra-common" },
    rare:      { label:"Rare",      icon:"ra-rare" },
    legendary: { label:"Legendary", icon:"ra-legendary" },
};

const SETS = {
    "te-ao-marama": { label:"Te Ao Mārama", gloss:"The World of Light", note:"Base set" }
};

const SOURCES = {
    adhd:       [{name:"ADHD New Zealand", url:"https://www.adhd.org.nz"}],
    autism:     [{name:"Autism New Zealand", url:"https://www.autismnz.org.nz"}],
    dyslexia:   [{name:"Dyslexia Foundation of New Zealand", url:"https://dfnz.org.nz"}],
    hyperfocus: [{name:"ADHD New Zealand", url:"https://www.adhd.org.nz"}],
    maori:      {name:"Te Ara — The Encyclopedia of New Zealand", url:"https://teara.govt.nz"}
};

// ---------------------------------------------------------------------
// CARDS
// ---------------------------------------------------------------------
const CARDS = [

    // ================= SIGNATURE ATUA (with real art + trait tag) =================
    {
        id:"tawhirimatea", number:1, supertype:"atua", set:"te-ao-marama",
        name:"Tāwhirimātea", epithet:"Atua of Wind and Storms",
        trait:"adhd", elements:["po","hiko"], mana:8, rarity:"legendary",
        art:{ type:"image", src:"tawhirimatea" }, artist:"Māori Mermaid",
        abilities:[
            { kind:"gift", name:"Crisis Thrive", text:"When things get big and stressful, Tāwhirimātea gets stronger, not weaker." },
            { kind:"help", name:"Now Milestones", text:"Breaking a big job into small steps he can finish right now." },
            { kind:"challenge", name:"Time Blindness", text:"Sometimes it's hard to feel how much time has gone by." },
        ],
        accommodations:[
            "Noise-cancelling headphones in loud places",
            "Timers and reminders to help track time",
            "Breaking big tasks into small steps",
            "Movement breaks when sitting still gets hard"
        ],
        story:"Tāwhirimātea is the atua of wind and storms. When his brothers agreed to separate their parents, he refused — he stayed wild and full of energy, and to this day he moves fast and feels everything strongly. His storms aren't a flaw. They're power.",
        gameTip:"Best played when the game is fast and changing — Tāwhirimātea loves chaos.",
    },
    {
        id:"hinemoana", number:2, supertype:"atua", set:"te-ao-marama",
        name:"Hine-moana", epithet:"Guardian of the Ocean",
        trait:"autism", elements:["wai"], mana:7, rarity:"legendary",
        art:{ type:"image", src:"hinemoana" }, artist:"Māori Mermaid",
        abilities:[
            { kind:"gift", name:"Bottom-Up Shield", text:"Notices tiny details everyone else misses, and builds a plan piece by piece." },
            { kind:"help", name:"SOP Pathway", text:"Loves clear steps and routines that stay the same every time." },
            { kind:"challenge", name:"Sensory Overwhelm", text:"Loud noise, bright light, or a big crowd can feel like too much all at once." },
        ],
        accommodations:[
            "Noise-reduction tools in busy spaces",
            "Clear, step-by-step instructions",
            "A predictable daily routine",
            "A calm space to take a break"
        ],
        story:"Hine-moana is a guardian of the ocean. The sea notices everything — every current, every creature, every ripple. Like the ocean, paying close attention to detail is a kind of strength, not something to fix.",
        gameTip:"Best played with a clear plan — set her up early and she gets stronger every turn.",
    },
    {
        id:"mahuika", number:3, supertype:"atua", set:"te-ao-marama",
        name:"Mahuika", epithet:"Keeper of Fire",
        trait:"dyslexia", elements:["ahi"], mana:6, rarity:"rare",
        art:{ type:"image", src:"mahuika" }, artist:"Māori Mermaid",
        abilities:[
            { kind:"gift", name:"Non-Linear Sight", text:"Sees the whole picture and spots connections other people miss." },
            { kind:"help", name:"Mind-Map Overlay", text:"Thinks in pictures and big-idea maps instead of straight lines of text." },
            { kind:"challenge", name:"Decoding Delay", text:"Reading small letters and words can take extra time." },
        ],
        accommodations:[
            "Audiobooks and text-to-speech tools",
            "Mind-maps and pictures instead of long text",
            "Extra time for reading and writing",
            "Fonts and spacing that are easier to read"
        ],
        story:"Mahuika is the keeper of fire, holding flame inside her own fingertips. She doesn't need to read a map to find her way — she carries the fire herself, and everyone else follows the light. Thinking in pictures and big ideas is its own kind of light.",
        gameTip:"Great at connecting cards on the board that don't obviously belong together.",
    },
    {
        id:"maui", number:4, supertype:"atua", set:"te-ao-marama",
        name:"Māui-tikitiki-a-Taranga", epithet:"The Trickster Demigod",
        trait:"hyperfocus", elements:["kowhai","ahi"], mana:9, rarity:"legendary",
        art:{ type:"image", src:"mauiDyspraxia" },
        abilities:[
            { kind:"gift", name:"Deep Dive Drive", text:"Once locked on, he can work for hours on one big idea without stopping." },
            { kind:"help", name:"Flow Anchor", text:"Doing one thing at a time, somewhere calm, helps the focus last." },
            { kind:"challenge", name:"Switch Static", text:"Stopping one task to start a new one can feel really hard." },
        ],
        accommodations:[
            "Gentle timers to remember to eat, drink and rest",
            "A calm, quiet space with few distractions",
            "A heads-up before it's time to switch tasks",
            "A notebook nearby to jot down other ideas"
        ],
        story:"Māui was famous for chasing one big idea at a time — slowing the sun, fishing up islands, stealing fire — and giving it everything he had until it was done. That kind of deep, total focus is a gift, even when it's hard to switch off.",
        gameTip:"Save him for one big final push — he hits hardest when he's had time to focus.",
    },

    // ================= SUPPORTING ATUA (no trait tag) =================
    {
        id:"ranginui", number:5, supertype:"atua", set:"te-ao-marama",
        name:"Ranginui", epithet:"The Sky Father",
        trait:null, elements:["kowhai"], mana:9, rarity:"legendary",
        art:{ type:"symbolic", domain:"kowhai" },
        abilities:[
            { kind:"gift", name:"Endless Sky", text:"Can see everything happening below, all at once." },
            { kind:"help", name:"Steady Watch", text:"Watches over the whole world, calm and constant." },
            { kind:"challenge", name:"Far Away", text:"Being so high up means he's far from the people he loves." },
        ],
        funFact:"Ranginui and Papatūānuku, the Earth Mother, held each other so close that their children lived in the dark between them — until their son Tāne pushed them apart and let in the light.",
        gameTip:"A steady, dependable card — put him down early and build around him.",
    },
    {
        id:"papatuanuku", number:6, supertype:"atua", set:"te-ao-marama",
        name:"Papatūānuku", epithet:"The Earth Mother",
        trait:null, elements:["po","kowhai"], mana:9, rarity:"legendary",
        art:{ type:"symbolic", domain:"po" },
        abilities:[
            { kind:"gift", name:"Ever Steady", text:"Holds everything up, no matter how heavy it gets." },
            { kind:"help", name:"Grows Anything", text:"Feeds every forest, every root, every living thing." },
            { kind:"challenge", name:"Deep Ache", text:"She still misses Ranginui, high above her." },
        ],
        funFact:"Every tree, plant, and living thing on land grows from Papatūānuku, the Earth Mother.",
        gameTip:"Slow to bring out, but very hard for opponents to knock down.",
    },
    {
        id:"tanemahuta", number:7, supertype:"atua", set:"te-ao-marama",
        name:"Tāne Mahuta", epithet:"Atua of Forests and Birds",
        trait:null, elements:["wai","kowhai"], mana:7, rarity:"rare",
        art:{ type:"symbolic", domain:"wai" },
        abilities:[
            { kind:"gift", name:"Forest Push", text:"Strong enough to push his own parents apart and make room for light." },
            { kind:"help", name:"Grows the Green", text:"Fills the world with trees, birds, and living forests." },
            { kind:"challenge", name:"Heavy Lifting", text:"Holding up the sky is tiring work." },
        ],
        funFact:"Tāne Mahuta pushed his parents Ranginui and Papatūānuku apart, letting the first light spill into the world.",
        gameTip:"Grows stronger the longer he stays on the board.",
    },
    {
        id:"tangaroa", number:8, supertype:"atua", set:"te-ao-marama",
        name:"Tangaroa", epithet:"Atua of the Sea",
        trait:null, elements:["wai"], mana:7, rarity:"rare",
        art:{ type:"symbolic", domain:"wai" },
        abilities:[
            { kind:"gift", name:"Tide Caller", text:"Commands every wave and current in the sea." },
            { kind:"help", name:"Ocean Keeper", text:"Looks after every fish, whale, and creature in the water." },
            { kind:"challenge", name:"Restless Water", text:"The sea never stays still, not even for a moment." },
        ],
        funFact:"Tangaroa is father to every creature that swims — fish, whales, and everything in between.",
        gameTip:"Pairs well with other Wai cards for a steady, flowing strategy.",
    },
    {
        id:"ruaumoko", number:9, supertype:"atua", set:"te-ao-marama",
        name:"Rūaumoko", epithet:"Atua of Earthquakes and Volcanoes",
        trait:null, elements:["ahi","po"], mana:8, rarity:"rare",
        art:{ type:"symbolic", domain:"ahi" },
        abilities:[
            { kind:"gift", name:"Deep Rumble", text:"Still growing, and every move he makes shakes the ground." },
            { kind:"help", name:"Warms the Earth", text:"His fire keeps the inside of the earth warm." },
            { kind:"challenge", name:"Still Waiting", text:"He's still in his mother's arms, waiting to be born." },
        ],
        funFact:"Rūaumoko is still inside his mother Papatūānuku — when he turns over, the ground shakes.",
        gameTip:"A slow-burn card that hits hardest late in the game.",
    },
    {
        id:"hinenuitepo", number:10, supertype:"atua", set:"te-ao-marama",
        name:"Hine-nui-te-pō", epithet:"Guardian of the Night",
        trait:null, elements:["po"], mana:8, rarity:"legendary",
        art:{ type:"symbolic", domain:"po" },
        abilities:[
            { kind:"gift", name:"Gentle Guide", text:"Helps guide people safely into the night." },
            { kind:"help", name:"Safe Passage", text:"Makes sure no one has to travel through the dark alone." },
            { kind:"challenge", name:"Left the Light", text:"She once lived in the daylight, before she chose the night." },
        ],
        funFact:"Hine-nui-te-pō was once the dawn maiden Hine-tītama — now she watches over the night instead.",
        gameTip:"A powerful late-game card, best played after the board has filled up.",
    },

    // ================= TŪPUNA (archetypal guide figures) =================
    {
        id:"te-kaiwhakatere", number:11, supertype:"tupuna", set:"te-ao-marama",
        name:"Te Kaiwhakatere", epithet:"The Wayfinder",
        trait:null, elements:["wai","hiko"], mana:5, rarity:"rare",
        art:{ type:"symbolic", domain:"wai" },
        abilities:[
            { kind:"gift", name:"Star Reading", text:"Never gets lost — the stars always show the way." },
            { kind:"help", name:"Steady Hand", text:"Keeps everyone calm, even in a storm." },
            { kind:"challenge", name:"Long Journeys", text:"The way home is sometimes very, very far." },
        ],
        funFact:"This card honours the great navigators who guided waka across the Pacific using stars, currents, and the flight of birds.",
        gameTip:"Use early to guide your other cards into a strong position.",
    },
    {
        id:"te-kaitiaki-ngahere", number:12, supertype:"tupuna", set:"te-ao-marama",
        name:"Te Kaitiaki o te Ngahere", epithet:"The Forest Keeper",
        trait:null, elements:["kowhai","wai"], mana:5, rarity:"rare",
        art:{ type:"symbolic", domain:"kowhai" },
        abilities:[
            { kind:"gift", name:"Quiet Eyes", text:"Notices everything moving in the forest." },
            { kind:"help", name:"Gentle Hands", text:"Cares for every plant and creature, one at a time." },
            { kind:"challenge", name:"Slow Growing", text:"Good things in the forest take time to grow." },
        ],
        funFact:"Kaitiaki means guardian — this card represents the many quiet guardians who care for the forests, in stories and in real life.",
        gameTip:"Patient but reliable — plays well in a slow, careful strategy.",
    },

    // ================= KOTAHI (unity / co-occurring traits) =================
    {
        id:"kotahi-audhd", number:13, supertype:"kotahi", set:"te-ao-marama",
        name:"Kotahi: Wai me te Hiko", epithet:"Together: Water and Lightning",
        trait:null, elements:["wai","hiko"], mana:10, rarity:"legendary",
        art:{ type:"symbolic", domain:"hiko" },
        abilities:[
            { kind:"gift", name:"Storm & Still", text:"Can be full of energy and deeply focused, both at once." },
            { kind:"help", name:"Two-Sided Support", text:"Needs both quiet routines and room to move." },
            { kind:"challenge", name:"Push and Pull", text:"Sometimes wanting stillness and excitement feels like a tug-of-war." },
        ],
        funFact:"This card represents having both autism and ADHD together — sometimes called AuDHD. Two sets of strengths, needs, and challenges, all in one person.",
        gameTip:"A flexible card that can adapt to either a fast or a careful strategy.",
    },
    {
        id:"kotahi-dyslexia-hyperfocus", number:14, supertype:"kotahi", set:"te-ao-marama",
        name:"Kotahi: Ahi me te Kōwhai", epithet:"Together: Fire and Light",
        trait:null, elements:["ahi","kowhai"], mana:10, rarity:"legendary",
        art:{ type:"symbolic", domain:"ahi" },
        abilities:[
            { kind:"gift", name:"Big Picture Blaze", text:"Sees the whole idea first, then dives all the way in." },
            { kind:"help", name:"One Idea at a Time", text:"Works best with one big project, not ten small ones." },
            { kind:"challenge", name:"Slow Start", text:"Getting started can take longer than finishing." },
        ],
        funFact:"This card represents dyslexia and hyperfocus together — big-picture thinking paired with deep, total focus once started.",
        gameTip:"Slow to open with, but unstoppable once it gets going.",
    },

    // ================= MANA (energy cards) =================
    { id:"mana-ahi", number:15, supertype:"mana", set:"te-ao-marama", name:"Ahi Mana", epithet:"Fire Power",
        trait:null, elements:["ahi"], rarity:"common", art:{type:"symbolic", domain:"ahi"},
        effect:"Gives an Atua card a burst of Ahi power.", funFact:"Ahi means fire — the warmth of a hearth, and the strength of a volcano." },
    { id:"mana-wai", number:16, supertype:"mana", set:"te-ao-marama", name:"Wai Mana", epithet:"Water Power",
        trait:null, elements:["wai"], rarity:"common", art:{type:"symbolic", domain:"wai"},
        effect:"Gives an Atua card a burst of Wai power.", funFact:"Wai means water — rivers, rain, and the sea, all connected." },
    { id:"mana-hiko", number:17, supertype:"mana", set:"te-ao-marama", name:"Hiko Mana", epithet:"Electric Power",
        trait:null, elements:["hiko"], rarity:"common", art:{type:"symbolic", domain:"hiko"},
        effect:"Gives an Atua card a burst of Hiko power.", funFact:"Hiko means electric — the quick spark of lightning across the sky." },
    { id:"mana-kowhai", number:18, supertype:"mana", set:"te-ao-marama", name:"Kōwhai Mana", epithet:"Light Power",
        trait:null, elements:["kowhai"], rarity:"common", art:{type:"symbolic", domain:"kowhai"},
        effect:"Gives an Atua card a burst of Kōwhai power.", funFact:"Kōwhai is a golden-yellow native tree, and the Māori word for the colour yellow." },
    { id:"mana-po", number:19, supertype:"mana", set:"te-ao-marama", name:"Pō Mana", epithet:"Night Power",
        trait:null, elements:["po"], rarity:"common", art:{type:"symbolic", domain:"po"},
        effect:"Gives an Atua card a burst of Pō power.", funFact:"Pō means night — the quiet, starry dark that comes before every dawn." },
];


// HELPER CARDS (Accommodation / Affirmation / Task) — transcribed from the prototype PDF
const KINDS = {
    accommodation:{ label:"Accommodation", glyph:"✓", icon:"k-accommodation", color:"#2f9e6e", light:"#d9f0e4", desc:"Something that helps a space or a task work better." },
    affirmation:  { label:"Affirmation",   glyph:"✦", icon:"k-affirmation",   color:"#c98812", light:"#fdedc6", desc:"A kind, true thought to hold on to." },
    task:         { label:"Task",          glyph:"1 → 2 → 3", icon:"k-task",  color:"#2688c2", light:"#dcf0fb", desc:"A few small steps to try." },
};
const ORIGINS = {
    genetic:      { label:"Genetic",       sub:"Genetically Caused Neurodivergence",      note:"DNA, Polygenic Scores",           icon:"or-genetic",       color:"#6b5ca5", light:"#e9e4f7", kid:"From the genes we inherit." },
    epigenetic:   { label:"Epigenetic",    sub:"Epigenetically Caused Neurodivergences",  note:"Te Pūtake (The Root)",            icon:"or-epigenetic",    color:"#1f7a54", light:"#d9f0e4", kid:"How life and family history can turn genes up or down." },
    environmental:{ label:"Environmental", sub:"Environmentally Caused Neurodivergences", note:"Toxins, Nutrition, Birth Events", icon:"or-environmental", color:"#9a6a3a", light:"#f3e6d6", kid:"Things in the world around us, before or at birth." },
};
const CONDITIONS = {
    autism:{label:"Autism", teReo:"Takiwātanga", trait:"autism"}, adhd:{label:"ADHD", teReo:"Aroreretini", trait:"adhd"},
    dyslexia:{label:"Dyslexia", teReo:"Tipaopao Kupu", trait:"dyslexia"}, tourette:{label:"Tourette Syndrome"},
    trauma:{label:"Transgenerational trauma", teReo:"Wharanga Tuku Iho"}, dyscalculia:{label:"Dyscalculia"}, dyspraxia:{label:"Dyspraxia"},
    fasd:{label:"FASD", teReo:"Kōpūtanga Waipiro"}, abi:{label:"Acquired brain injury", teReo:"Whara Roro"},
    nas:{label:"Neonatal abstinence syndrome", teReo:"Kōpūtanga Paitini Raau Taero"},
    lead:{label:"Lead-induced neurotoxicity", teReo:"Pāpāngia e te Paitini"}, iodine:{label:"Congenital iodine deficiency", teReo:"He kore tūtohu tūāuri"},
};
const ENV_META = {
    fasd:{cause:"Prenatal alcohol exposure", adapted:"Adapted from FASD-CAN NZ and Parsonson references."},
    abi:{cause:"Birth hypoxia", adapted:"Adapted from Nationwide Children’s Hospital and NINDS references."},
    nas:{cause:"Prenatal substance exposure", adapted:"Adapted from Starship Children’s Health and NSW Health references."},
    lead:{cause:"Lead exposure", adapted:"Adapted from CDC and NIH references."},
    iodine:{cause:"Maternal iodine deficiency", adapted:"Adapted from WHO and Healthdirect Australia references."},
};
const SUPPORT_REFS = {
    epigenetic:{
        autism:["[1.1] Nature Neuroscience. (2025). DNA Methylation and the Synaptic Profile of ASD.","[1.2] Takiwātanga NZ. (2026). The Gift of Takiwātanga: A Māori Perspective on Autism."],
        adhd:["[2.1] Journal of Epigenetics. (2024). Dopaminergic Gene Expression and Environmental Triggers in ADHD.","[2.2] Aroreretini Collective. (2025). Harnessing the Wandering Mind: Strength-based ADHD Support."],
        dyslexia:["[3.1] Molecular Psychiatry. (2026). Epigenetic Influences on Neuronal Migration and Reading Pathways.","[3.2] The Dyslexic Advantage. (2025). Spatial Reasoning and Pattern Recognition in Dyslexic Profiles."],
        tourette:["[4.1] Frontiers in Genetics. (2024). Histamine Pathway Methylation in Tic Disorders.","[4.2] Neurology Today. (2025). The Tourette Profile: Creativity and Motor Reflexes."],
        trauma:["[5.1] Biological Psychiatry. (2026). Epigenetic Inheritance of Stress Response: The NR3C1 Marker.","[5.2] Te Whare Tapa Whā Research. (2025). Wairua and Epigenetics: The impact of historical stress on neurobiology."],
    },
    genetic:{
        dyslexia:["[1.1] Shaywitz, S. E. (2003). Overcoming Dyslexia. New York: Alfred A. Knopf.","[1.2] Peterson, R. L., & Pennington, B. F. (2015). Developmental Dyslexia. Annual Review of Clinical Psychology, 11, 283–307."],
        adhd:["[2.1] Barkley, R. A. (2015). Attention-Deficit Hyperactivity Disorder: A Handbook for Diagnosis and Treatment (4th ed.). Guilford Press.","[2.2] Faraone, S. V., & Larsson, H. (2019). Genetics of Attention Deficit Hyperactivity Disorder. Molecular Psychiatry, 24(4), 562–575."],
        autism:["[3.1] Baron-Cohen, S. (2008). Autism and Asperger Syndrome. Oxford: Oxford University Press.","[3.2] Lord, C., Elsabbagh, M., Baird, G., & Veenstra-VanderWeele, J. (2018). Autism Spectrum Disorder. The Lancet, 392(10146), 508–520."],
        dyscalculia:["[4.1] Butterworth, B. (2005). The Development of Arithmetical Abilities. Journal of Child Psychology and Psychiatry, 46(1), 3–18.","[4.2] Kaufmann, L., & von Aster, M. (2012). The Diagnosis and Management of Dyscalculia. Deutsches Ärzteblatt International, 109(45), 767–778."],
        dyspraxia:["[5.1] Kirby, A., & Sugden, D. (2007). Children with Developmental Coordination Disorders. London: Jessica Kingsley Publishers.","[5.2] Zwicker, J. G., Missiuna, C., Harris, S. R., & Boyd, L. A. (2012). Developmental Coordination Disorder: A Review and Update. European Journal of Paediatric Neurology, 16(6), 573–581."],
    },
    environmental:[
        "[6.1] FASD-CAN NZ. (2025). Understanding FASD: A Brain-Based Perspective.","[6.2] Parsonson, B. (2022). FASD: Building on Strengths. Koru Specialist Services.",
        "[6.3] Ministry of Health NZ. (2025). FASD community engagement insights report.","[6.4] Te Iho Tātai-ā Rongo. (2026). FASD Māori Coalition.",
        "[6.5] Starship Children’s Health. (2026). Infants at risk of withdrawal from antenatal substance exposure.","[6.6] AAP Pediatrics. (2026). Therapeutic Hypothermia for Neonatal HIE.",
        "[6.7] Revista Panamericana de Salud Pública. (2026). Neurotoxicity and aggressiveness triggered by low-level lead.","[6.8] StatPearls / NIH. (2026). Neonatal Abstinence Syndrome Overview.",
        "[6.9] MDPI / Biology. (2025). Iodine Intake and Related Cognitive Function Impairments.","[6.10] Apollo Hospitals. (2026). Brain injury and treatment strategies.",
        "[6.11] Brain Injury NZ. (2022). He aha te wharanga roro?","[6.12] UNICEF. (2024). Iodine Deficiency and Child Development Outcomes.",
        "[6.13] CDC. (2024). Preventing Lead Exposure in Children: Guidelines.","[6.14] NOFASD Australia. (2025). Classroom Strategies for FASD: Support Guide.",
        "[6.15] Mayo Clinic. (2026). HIE: Long term neurological management.","[6.16] NZ Journal of Educational Studies. (2025). Neurodiversity in the classroom: Environmental impacts.",
        "[6.17] WHO. (2025). Micronutrient deficiencies: Iodine and the developing brain.","[6.18] EPA. (2024). Lead in Water: Health implications for neurodevelopment.",
        "[6.19] AOTA. (2025). Sensory Regulation in Infants with NAS.","[6.20] National Organization on FAS. (2025). External Brain Supports for Executive Function.",
        "[6.21] Journal of Pediatric Psychology. (2026). Birth Trauma and Cognitive Fatigue.","[6.22] Harvard Center on the Developing Child. (2025). Toxins and Brain Development.",
        "[6.23] NZ Education Gazette. (2026). Supporting Māori students with FASD.","[6.24] Neurodiversity Hub. (2025). Accommodations for Acquired Brain Injury.",
        "[6.25] Journal of Nutrition. (2026). Cognitive Recovery Post-Iodine Supplementation.",
    ],
};
const _K = {a:"accommodation", f:"affirmation", t:"task"};
let _n = 0;
function _mk(origin, rows){
    return rows.map(([condition,k,code,conditionLabel,title,text,extra])=>{
        const kind=_K[k], m=origin==="environmental"?ENV_META[condition]:{};
        return { id:`${origin}-${condition}-${kind}`, family:"support", number:++_n, origin, condition, kind, code, conditionLabel,
            title:title||null, text, extra:extra||null, cause:m.cause||null, adapted:m.adapted||null, name:title||conditionLabel };
    });
}
const TGT="Transgenerational Trauma / Hypervigilance / Wharanga Tuku Iho";
const SUPPORT_CARDS = [
    ..._mk("epigenetic",[
        ["autism","a","ASD / 01","ASD / Takiwātanga","Standard Operating Procedure (SOP) manual","Use a “SOP” manual and sensory-neutral workspace to reduce cognitive load."],
        ["autism","f","ASD / 02","ASD / Takiwātanga","I trust my own rhythm","When the environment is predictable, my intense focus can move from survival to innovation."],
        ["autism","t","ASD / 03","ASD / Takiwātanga","Create a daily routine checklist","Break the day into small, predictable steps so I can stay focused and move through tasks with more ease."],
        ["adhd","a","ADHD / 01","ADHD / Aroreretini","Body doubling and task sorting","Work alongside someone and sort tasks into “now” vs. “not now” to improve follow-through."],
        ["adhd","f","ADHD / 02","ADHD / Aroreretini","My speed is a strength","With the right support, I can use my speed and creativity to lead, connect, and contribute."],
        ["adhd","t","ADHD / 03","ADHD / Aroreretini","Sort tasks into “now” and “not now”","Break one project into two lists: what needs to happen now, and what can wait until later."],
        ["dyslexia","a","Dyslexia / 01","Dyslexia / Tipaopao Kupu","Speech-to-text and mind maps","Use speech-to-text software and present information through mind maps instead of dense paragraphs."],
        ["dyslexia","f","Dyslexia / 02","Dyslexia / Tipaopao Kupu","My vision is my strength","I communicate best through visual patterns and big-picture thinking, and that is a valuable way to share ideas."],
        ["dyslexia","t","Dyslexia / 03","Dyslexia / Tipaopao Kupu","Turn text into a mind map","Take one dense paragraph and turn it into a visual map so the big picture is easier to see."],
        ["tourette","a","TS / 01","Tourette Syndrome","Tic-neutral zone and ergonomic comfort","Create a “tic-neutral” zone where tics are not acknowledged or judged, and use ergonomic furniture to support physical comfort."],
        ["tourette","f","TS / 02","Tourette Syndrome","My nervous system is highly attuned","My body is capable of creativity, physical expression, and quick reflexes when I am in a safe environment."],
        ["tourette","t","TS / 03","Tourette Syndrome","Find a release activity","Choose one physical activity that helps me release tension, such as movement, drawing, or a short walk."],
        ["trauma","a","TGT / 01",TGT,"Clear communication and low-stakes feedback","Use clear, transparent communication and low-stakes feedback loops to reduce stress triggers."],
        ["trauma","f","TGT / 02",TGT,"I am safe enough to rest","When I feel safe, I can move from survival mode to using my empathy for healing and connection."],
        ["trauma","t","TGT / 03",TGT,"Check in with my nervous system","Take one minute to notice my body and ask myself what I need right now to feel safer."],
    ]),
    ..._mk("genetic",[
        ["dyslexia","a","01 / 15","Dyslexia","Speech-to-text support","Use speech-to-text software for writing tasks, especially when reading speed or spelling accuracy may slow progress."],
        ["dyslexia","f","02 / 15","Dyslexia","Big-picture thinking is a strength","I trust my spatial reasoning and big-picture thinking to guide me through complex ideas.","Recognize that literacy differences do not define the whole person."],
        ["dyslexia","t","03 / 15","Dyslexia","Break reading into smaller steps","Divide a reading task into shorter sections, use a timer, and take a short break between each section.","Use this structure to reduce overwhelm and make progress feel more manageable."],
        ["adhd","a","04 / 15","ADHD","Visual timers and movement breaks","Use visual timers and short movement breaks to help stay focused and support attention during longer tasks."],
        ["adhd","f","05 / 15","ADHD","My energy is a creative force","I am capable of intense focus and creative energy when the right structure is in place.","Notice when high energy becomes a source of momentum instead of distraction."],
        ["adhd","t","06 / 15","ADHD","Chunk a task into 10-minute blocks","Break a task into short, timed blocks with a short break between each one.","Use this rhythm to make progress feel more manageable and reduce overwhelm."],
        ["autism","a","07 / 15","Autism","Advance notice of change","Share schedules, reminders, and changes ahead of time so routines can be prepared for."],
        ["autism","f","08 / 15","Autism","Honest thinking is valuable","My honest and direct communication is a strength that helps teams work clearly.","Trust that precision and clarity are valuable contributions."],
        ["autism","t","09 / 15","Autism","Prepare a sensory plan","Identify one place or tool that helps regulate sensory comfort and keep it nearby.","Use this plan to reduce sensory overload and stay more grounded."],
        ["dyscalculia","a","10 / 15","Dyscalculia","Visual maths tools and calculators","Use visual maths tools, manipulatives, and calculators to support calculations and reduce working-memory pressure."],
        ["dyscalculia","f","11 / 15","Dyscalculia","Alternative reasoning is valid","I can solve problems in ways that feel right to me, even if they are not the most common method.","Welcome creative problem-solving as a strength, not a workaround."],
        ["dyscalculia","t","12 / 15","Dyscalculia","Solve it visually","Practice one maths problem using a visual tool, then explain the steps in your own words.","Use this approach to build confidence with numbers in a way that feels meaningful."],
        ["dyspraxia","a","13 / 15","Dyspraxia","Assistive writing tools","Use assistive writing tools, such as text-to-speech or speech-to-text software, to reduce the physical effort of writing."],
        ["dyspraxia","f","14 / 15","Dyspraxia","Determination is my strength","I am resilient and determined, and those qualities carry me through challenges.","Notice when persistence and creative problem-solving help you find another way forward."],
        ["dyspraxia","t","15 / 15","Dyspraxia","Break motor tasks into steps","Break a motor task into smaller, slower steps and practice one step at a time.","Use this structure to reduce anxiety and make physical tasks feel more manageable."],
    ]),
    ..._mk("environmental",[
        ["fasd","a","01 / 15","FASD / Kōpūtanga Waipiro","","Use visual checklists and 1-on-1 mentoring to help structure planning, impulse control, and follow-through."],
        ["fasd","f","02 / 15","FASD / Kōpūtanga Waipiro","","You are capable of creative, spontaneous thinking and artistic flair. Your energy can be a strength when supported."],
        ["fasd","t","03 / 15","FASD / Kōpūtanga Waipiro","","Choose one task, break it into three visual steps, and check each step with a trusted mentor before moving on."],
        ["abi","a","04 / 15","Acquired Brain Injury / Whara Roro","","Offer untimed assessments and frequent brain breaks so the individual can work at their own pace without overload."],
        ["abi","f","05 / 15","Acquired Brain Injury / Whara Roro","","You bring deep, deliberate focus and high accuracy when given enough time to process and settle into a task."],
        ["abi","t","06 / 15","Acquired Brain Injury / Whara Roro","","Set one task, take a short break, then return to it. This helps build focus without exhausting the brain."],
        ["nas","a","07 / 15","Neonatal Abstinence Syndrome / Kōpūtanga Paitini Raau Taero","","Provide low-sensory zones with noise-canceling headphones and dimmed lighting to reduce overwhelm."],
        ["nas","f","08 / 15","Neonatal Abstinence Syndrome / Kōpūtanga Paitini Raau Taero","","You notice subtle changes in your environment with incredible intuition, and that awareness can be a valuable strength."],
        ["nas","t","09 / 15","Neonatal Abstinence Syndrome / Kōpūtanga Paitini Raau Taero","","Find a quiet space, put on headphones, and complete one small task before moving back into a louder environment."],
        ["lead","a","10 / 15","Lead-Induced Neurotoxicity / Pāpāngia e te Paitini","","Use movement breaks and heavy-work activities to help regulate the nervous system and reduce irritability."],
        ["lead","f","11 / 15","Lead-Induced Neurotoxicity / Pāpāngia e te Paitini","","You have a natural aptitude for hands-on, mechanical, and physical tasks that can be developed with practice."],
        ["lead","t","12 / 15","Lead-Induced Neurotoxicity / Pāpāngia e te Paitini","","Choose a hands-on task, carry a weighted object while working, and take a short movement break before continuing."],
        ["iodine","a","13 / 15","Congenital Iodine Deficiency Syndrome / He kore tūtohu tūāuri","","Break tasks into literal, concrete steps with physical examples so the brain can follow dependable routines."],
        ["iodine","f","14 / 15","Congenital Iodine Deficiency Syndrome / He kore tūtohu tūāuri","","You are reliable and consistent when following established routines and procedures, and that dependability matters."],
        ["iodine","t","15 / 15","Congenital Iodine Deficiency Syndrome / He kore tūtohu tūāuri","","Take a complex task, break it into three literal steps, and complete one step at a time using a physical example."],
    ]),
];

// ---------------------------------------------------------------------
// ILLUSTRATED ATUA SET
// Keep the non-Atua game cards (Tūpuna, Kotahi and Mana), but do not invent
// extra Atua entries without artwork. The supplied illustration files are
// the source of truth for this illustrated set.
// ---------------------------------------------------------------------
const _rawCard = id => CARDS.find(c => c.id === id);
for (let i = CARDS.length - 1; i >= 0; i--) {
    if (["ranginui", "papatuanuku"].includes(CARDS[i].id)) CARDS.splice(i, 1);
}
const _maui = _rawCard("maui");
_maui.trait = "dyscalculia";
_maui.epithet = "The Trickster Demigod";
_maui.art = { type:"image", src:"mauiDyscalculia" };
_maui.accommodations = [
    "Visual maths tools, manipulatives and calculators",
    "Clear examples for each step",
    "Extra time to work through number problems",
    "A chance to explain a different way to solve a problem"
];
_maui.abilities = [
    { kind:"gift", name:"Creative Number Sense", text:"Finds inventive ways to solve problems, especially when ideas can be seen or handled." },
    { kind:"help", name:"Visual Maths Tools", text:"Pictures, counters and worked examples make number patterns easier to explore." },
    { kind:"challenge", name:"Numbers Take Practice", text:"Mental calculations and number sequences can take more time and effort." },
];
_maui.story = "Māui is known for clever plans and trying a different way when the first idea does not work. This card celebrates creative problem-solving and the value of visual, hands-on ways to explore numbers.";
_maui.gameTip = "Look for patterns and use a visual plan before choosing your next move.";

for (const [id, trait, src] of [
    ["tanemahuta", "nas", "tanemahuta"],
    ["tangaroa", "abi", "tangaroa"],
    ["ruaumoko", "tourette", "ruaumoko"],
    ["hinenuitepo", "trauma", "hinenuitepo"],
]) {
    const c = _rawCard(id);
    if (c) { c.trait = trait; c.art = { type:"image", src }; }
}

const _mauiDyspraxia = {
    id:"maui-dyspraxia", number:20, supertype:"atua", set:"te-ao-marama",
    name:"Māui-tikitiki-a-Taranga", epithet:"The Trickster Demigod · Dyspraxia",
    trait:"dyspraxia", elements:["kowhai","ahi"], mana:8, rarity:"rare",
    art:{type:"image", src:"mauiDyspraxia"},
    abilities:[
        {kind:"gift", name:"Hands-On Ingenuity", text:"Finds creative ways around a problem and keeps trying when a plan needs changing."},
        {kind:"help", name:"Steps That Stick", text:"A clear demonstration and a little practice make a new sequence easier to follow."},
        {kind:"challenge", name:"Coordination Takes Time", text:"Planning and coordinating movements can take extra effort, especially when rushed."},
    ],
    accommodations:["Break movement tasks into small steps", "Show a demonstration before asking for a new skill", "Allow extra time for writing and practical tasks", "Offer tools that reduce physical effort"],
    story:"This version of Māui celebrates persistence, practical creativity and finding another route when a task is difficult. A different pace or approach can still lead to a brilliant result.",
    gameTip:"Try a step-by-step plan and build momentum one move at a time."
};
const _rongo = {
    id:"rongo", number:21, supertype:"atua", set:"te-ao-marama",
    name:"Rongo", epithet:"Atua of Peace and Cultivated Foods",
    trait:"id", elements:["kowhai","wai"], mana:7, rarity:"rare",
    art:{type:"image", src:"rongo"},
    abilities:[
        {kind:"gift", name:"Steady Practice", text:"Builds confidence through familiar routines and meaningful, hands-on activities."},
        {kind:"help", name:"Clear Real-Life Examples", text:"Concrete examples and one step at a time make a new task easier to understand."},
        {kind:"challenge", name:"New Steps Need Time", text:"A new or abstract task may take more time, repetition and support to learn."},
    ],
    accommodations:["Use real-life examples and familiar materials", "Give one clear instruction at a time", "Allow repetition and practice", "Celebrate progress and effort"],
    story:"Rongo is associated with peace and cultivated foods. This card focuses on patient learning, practical examples and the value of routines that help people feel confident.",
    gameTip:"Build a reliable plan using familiar actions before adding something new."
};
const _tawhaki = {
    id:"tawhaki", number:22, supertype:"atua", set:"te-ao-marama",
    name:"Tāwhaki", epithet:"The Sky-Climbing Hero",
    trait:"fasd", elements:["hiko","kowhai"], mana:8, rarity:"legendary",
    art:{type:"image", src:"tawhaki"},
    abilities:[
        {kind:"gift", name:"Creative Spark", text:"Brings imagination and spontaneous ideas to the challenge in front of him."},
        {kind:"help", name:"Visible Checkpoints", text:"Pictures, checklists and a trusted guide help keep each next step clear."},
        {kind:"challenge", name:"Many Steps at Once", text:"Planning, remembering and finishing a multi-step task can take extra support."},
    ],
    accommodations:["Use visual checklists", "Break tasks into a few concrete steps", "Check in with a trusted support person", "Keep important routines consistent"],
    story:"Tāwhaki is remembered in stories of an extraordinary journey skyward. This card highlights imagination and persistence, with practical supports to make a big journey feel manageable.",
    gameTip:"Set visible checkpoints and work towards one goal at a time."
};
const _tumatauenga = {
    id:"tumatauenga", number:23, supertype:"atua", set:"te-ao-marama",
    name:"Tūmatauenga", epithet:"Atua of People and Conflict",
    trait:"ln", elements:["ahi","hiko"], mana:8, rarity:"rare",
    art:{type:"image", src:"tumatauenga"},
    abilities:[
        {kind:"gift", name:"Practical Problem-Solving", text:"Can learn through doing, clear examples and tasks with a meaningful purpose."},
        {kind:"help", name:"One Step at a Time", text:"A calm pace and a simple sequence make it easier to work out what comes next."},
        {kind:"challenge", name:"Processing Takes Time", text:"Too many instructions at once can make it harder to remember the next step."},
    ],
    accommodations:["Use clear, concrete instructions", "Show an example of the finished task", "Break a task into small steps", "Allow extra time and check understanding"],
    story:"Tūmatauenga is an important figure in Māori traditions. This card is designed around practical learning, clear instructions and the idea that people can succeed in different ways.",
    gameTip:"Keep the plan visible and focus on the next clear action."
};
const _firstTupuna = CARDS.findIndex(c => c.supertype === "tupuna");
CARDS.splice(_firstTupuna < 0 ? CARDS.length : _firstTupuna, 0, _mauiDyspraxia, _rongo, _tawhaki, _tumatauenga);
CARDS.forEach((c, i) => { c.number = i + 1; });
CARDS.forEach(c=>{ c.family="atua"; });
const ALL_CARDS = [...CARDS, ...SUPPORT_CARDS];

const IMAGES = {
    tawhirimatea: "assets/images/tawhirimatea_god_adhd.png",
    hinemoana: "assets/images/hinemoana_god_asd.png",
    mahuika: "assets/images/mahuika_god_dyslexia.png",
    hinenuitepo: "assets/images/hinenuitepo_god_trauma.png",
    ruaumoko: "assets/images/ruaumoko_tour_god.png",
    tawhaki: "assets/images/tawhaki_fasd_god.png",
    tangaroa: "assets/images/tangaroa_tbi_god.png",
    tanemahuta: "assets/images/tanemahuta_nas_god.png",
    tumatauenga: "assets/images/tumatauenga_ln_god.png",
    rongo: "assets/images/rongo_id_god.png",
    mauiDyscalculia: "assets/images/maui_dyscalculia_god.png",
    mauiDyspraxia: "assets/images/maui_dyspraxia_god.png"
};