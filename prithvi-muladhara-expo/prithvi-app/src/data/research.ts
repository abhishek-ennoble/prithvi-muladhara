// src/data/research.ts
// Every entry carries its source type:
//   'verified'    — peer-reviewed / institutional data
//   'dharmic'     — traditional / scriptural / ancient record
//   'observed'    — reported, experiential, or emerging research

export type SourceType = 'verified' | 'dharmic' | 'observed';

export interface ResearchFact {
  stat: string;
  desc: string;
  source: string;
  type: SourceType;
}

export interface Era {
  id: string;
  period: string;
  yuga: string;
  title: string;
  summary: string;
  depletion: number;
  facts: ResearchFact[];
  dharmicNote: string;
  dharmicSource: string;
}

export interface Domain {
  id: string;
  icon: string;
  name: string;
  sanskrit: string;
  severity: string;
  severityLabel: string;
  depletionPct: number;
  color: string;
  summary: string;
  facts: ResearchFact[];
  dharmicNote: string;
  dharmicSource: string;
  frequencyNote?: string;
  frequencySource?: string;
  frequencyType?: SourceType;
}

export interface Frequency {
  hz: number;
  name: string;
  color: string;
  element: string;
  chakra: string;
  effect: string;
  connection: string;
  type: SourceType;
  source?: string;
}

export interface Mantra {
  id: string;
  name: string;
  tradition: string;
  chakra: string;
  element: string;
  text: string;
  romanized: string;
  meaning: string;
  duration: number;
  repeats: number;
  frequency: number;
  icon: string;
  why: string;
  whySource: string;
  whyType: SourceType;
}

export interface TraditionPractice {
  name: string;
  desc: string;
  chakra: string;
}

export interface Tradition {
  id: string;
  icon: string;
  name: string;
  color: string;
  practices: TraditionPractice[];
  essence: string;
}

export const ERAS: Era[] = [
  {
    id: 'satya',
    period: 'Pre-8000 BCE',
    yuga: 'Satya Yuga',
    title: 'Prithvi in Fullness',
    summary: 'The Earth at her most complete. Forests at maximum. Soils unbroken. Sacred rivers fed by intact glaciers.',
    depletion: 0.02,
    facts: [
      { stat: '57%', desc: 'of habitable land covered in forest', source: 'FAO / Our World in Data', type: 'verified' },
      { stat: 'Peak', desc: 'Soil carbon undisturbed — humus 30–60cm deep across most landmasses', source: 'Paleosoil studies', type: 'verified' },
      { stat: '<1M', desc: 'Human population globally — minimal ecological footprint', source: 'Demographic historians', type: 'verified' },
      { stat: 'Intact', desc: 'Himalayan glaciers at maximum volume. Great rivers flowing at peak purity', source: 'Vedic geography / glaciological record', type: 'dharmic' },
      { stat: '432 Hz', desc: 'Ancient instruments tuned to 432 Hz — the natural frequency of the Earth\'s vibration. Music aligned with Prithvi.', source: 'Musicological research / traditional tuning', type: 'observed' },
    ],
    dharmicNote: 'In Vedic cosmology, Satya Yuga is described as the age when dharma stood on all four legs — truth, purity, compassion, and generosity. The Earth herself was said to give without being asked.',
    dharmicSource: 'Srimad Bhagavatam',
  },
  {
    id: 'treta',
    period: '8000 – 3000 BCE',
    yuga: 'Treta Yuga',
    title: 'The First Clearing',
    summary: 'Agriculture begins. First cities. Forests begin to fall — but the Earth can still regenerate what is taken.',
    depletion: 0.08,
    facts: [
      { stat: '0.2B ha', desc: 'Forest cleared in first 5,000 years of agriculture — modest but the first wound', source: 'Our World in Data', type: 'verified' },
      { stat: 'Indus', desc: 'Harappan civilization shows earliest evidence of planned urban drainage, sacred wells, ritual bathing — Prithvi still honoured', source: 'Archaeological surveys', type: 'verified' },
      { stat: 'Balance', desc: 'Soil regeneration cycles still matching depletion rates — the Earth healing herself', source: 'Paleoecological record', type: 'verified' },
      { stat: 'Sacred', desc: 'Every clearing preceded by ritual — vanachhedana (tree felling) required propitiation to Vana Devatas', source: 'Vedic ritual texts / Grihyasutras', type: 'dharmic' },
    ],
    dharmicNote: 'In Treta Yuga, dharma had lost one leg — yet humans still retained the instinct to ask permission before taking from the Earth. Every forest clearing was preceded by ritual acknowledgment of Vana Devatas (forest deities).',
    dharmicSource: 'Grihyasutras / Vedic ritual manuals',
  },
  {
    id: 'dwapara',
    period: '3000 BCE – 1700 CE',
    yuga: 'Dwapara Yuga',
    title: 'Slow Erosion Deepens',
    summary: 'Empires rise and burn forests for ships, iron, agriculture. The loss accelerates — but sacred geography still holds.',
    depletion: 0.28,
    facts: [
      { stat: '19M ha', desc: 'Forest lost per decade by 1700 CE — still recoverable, but the balance is tipping', source: 'Williams 2006 / FAO historical', type: 'verified' },
      { stat: '1000 CE', desc: 'Gangetic plain heavily deforested — yet the river herself remains pure, glacier-fed', source: 'Historical ecology studies', type: 'verified' },
      { stat: '1B ha', desc: 'Total forest lost from 8000 BCE to 1900 — the slow bleeding over 9,000 years', source: 'Our World in Data', type: 'verified' },
      { stat: 'Intact', desc: 'Charaka and Vagbhata (Ayurvedic masters, 600 BCE – 600 CE) describe mineral-dense foods, therapeutic soils, living rivers', source: 'Charaka Samhita / Ashtanga Hridayam', type: 'dharmic' },
    ],
    dharmicNote: 'Charaka Samhita (600 BCE) describes medicinal clays, river sediments, and forest herbs with healing properties we can no longer find at the same potency. The texts were written for an Earth that still had these qualities.',
    dharmicSource: 'Charaka Samhita, Sutrasthana',
  },
  {
    id: 'early-kali',
    period: '1700 – 1950 CE',
    yuga: 'Early Kali Yuga',
    title: 'Industrial Assault Begins',
    summary: 'In 100 years, humanity loses as much forest as in the previous 9,000 years combined. The Earth cannot regenerate fast enough.',
    depletion: 0.55,
    facts: [
      { stat: '1B ha', desc: 'Forest lost in 100 years — matching all 9,000 years prior. Kali\'s acceleration made visible.', source: 'Our World in Data', type: 'verified' },
      { stat: '1900', desc: 'Chemical fertilizer era begins — nitrogen fixed artificially, soil biology starts systematic disruption', source: 'FAO historical records', type: 'verified' },
      { stat: '1843', desc: 'Rothamsted experiment begins (world\'s oldest agricultural trial) — will eventually document the mineral collapse starting 1968', source: 'Rothamsted Research', type: 'verified' },
      { stat: 'Begins', desc: 'Gangotri glacier retreat first documented. Sacred source of Ganga showing first measurable withdrawal.', source: 'ISRO / Glaciological surveys', type: 'verified' },
      { stat: '440 Hz', desc: 'In 1939, international standard shifts music tuning from 432 Hz to 440 Hz — disconnecting sound from Earth\'s natural resonance', source: 'ISO 16:1975 / musicological debate', type: 'observed' },
    ],
    dharmicNote: 'The shift from 432 Hz (natural Earth resonance) to 440 Hz (industrial standard, 1939) is one of the most quietly consequential frequency changes of the modern era. Many traditional musicians and researchers consider this the sonic equivalent of what industrial agriculture did to soil.',
    dharmicSource: 'Traditional music theory / ISO standardization history',
  },
  {
    id: 'deep-kali',
    period: '1950 – Present',
    yuga: 'Deep Kali Yuga',
    title: 'Simultaneous Collapse',
    summary: 'For the first time in history, depletion is happening across ALL five forms of Prithvi at once — soil, mineral, forest, body, and sacred geography.',
    depletion: 0.78,
    facts: [
      { stat: '33%', desc: 'Of Earth\'s soils now moderately or highly degraded (FAO/ITPS 2015)', source: 'FAO / ITPS', type: 'verified' },
      { stat: '133 Pg', desc: 'Carbon lost from soils due to agriculture in 12,000 years — majority in last 70 years', source: 'PNAS 2017', type: 'verified' },
      { stat: '−76%', desc: 'Copper in vegetables since 1940. Zinc −59%. Iron −50%. The Annamaya Kosha is starving.', source: 'McCance & Widdowson / UK food composition data', type: 'verified' },
      { stat: '−40%', desc: 'Himalayan glacier area since Little Ice Age. 67% of Himalayan glaciers retreating.', source: 'IITM / Climate studies', type: 'verified' },
      { stat: '296', desc: 'Polluted river stretches in India (2025). Sacred Yamuna biologically dead in Delhi stretch.', source: 'Earth5R / CPCB 2025', type: 'verified' },
      { stat: '528 Hz', desc: 'Dr. Masaru Emoto\'s water crystal research: polluted water vs. water exposed to sacred chanting shows structurally different crystal formation. Purity changes at molecular level.', source: 'Emoto, Messages from Water (1999) — contested but widely cited', type: 'observed' },
    ],
    dharmicNote: 'The Srimad Bhagavatam describes Kali Yuga as the age when "the Earth will yield less nourishment, the rains will be infrequent, rivers will be thin." This is not mythology. It is now a description of measurable physical reality.',
    dharmicSource: 'Srimad Bhagavatam 12.2',
  },
  {
    id: 'projected',
    period: '2025 – 2050',
    yuga: 'The Tipping Point',
    title: 'What Comes Next',
    summary: 'If trajectories hold, the next 25 years will determine whether Prithvi tattva can be restored or whether the withdrawal becomes permanent.',
    depletion: 0.95,
    facts: [
      { stat: '95%', desc: 'Land projected to be degraded by 2050 if current rates continue (UNCCD)', source: 'UNCCD / GEF 2024', type: 'verified' },
      { stat: '−60%', desc: 'Gangotri glacier volume projected to be lost by 2100 under high-emission scenario', source: 'IITM / IPCC projections', type: 'verified' },
      { stat: '2048', desc: 'Peak phosphate projected — phosphate is irreplaceable for food production. 80% of reserves in a single mine.', source: 'Phosphate research community', type: 'observed' },
      { stat: '$23T', desc: 'Projected economic cost of land degradation by 2050 (UNCCD 2018)', source: 'UNCCD 2018', type: 'verified' },
      { stat: '3.2B', desc: 'People whose wellbeing is already compromised by soil erosion and land degradation', source: 'FAO / IPBES 2018', type: 'verified' },
    ],
    dharmicNote: 'And yet — every Yuga cycle ends in renewal. The Puranas describe even the end of Kali Yuga as a prerequisite for Satya\'s return. The question is not whether the Earth heals. It is whether we participate in her healing or simply witness the collapse.',
    dharmicSource: 'Vishnu Purana / Srimad Bhagavatam 12.4',
  },
];

export const DOMAINS: Domain[] = [
  {
    id: 'soil',
    icon: '🌱',
    name: 'Soil / Land',
    sanskrit: 'Bhumi · मिट्टी',
    severity: '33%',
    severityLabel: 'degraded',
    depletionPct: 0.33,
    color: '#6B4A2A',
    summary: 'Healthy soil takes 1,000 years to form 2–3 cm. We lose 24 billion tonnes annually.',
    facts: [
      { stat: '33%', desc: 'All Earth\'s soils moderately or highly degraded', source: 'FAO / ITPS 2015', type: 'verified' },
      { stat: '24B t', desc: 'Fertile soil lost per year globally', source: 'UNCCD / Save Soil 2024', type: 'verified' },
      { stat: '133 Pg', desc: 'Soil carbon lost since start of agriculture (12,000 years)', source: 'PNAS 2017', type: 'verified' },
      { stat: '4 fields/s', desc: '4 football fields of healthy soil degraded every second', source: 'Earth.Org 2024', type: 'verified' },
      { stat: '61%', desc: 'European soils currently unhealthy', source: 'EU Soil Atlas', type: 'verified' },
      { stat: '95%', desc: 'Land projected to be degraded by 2050', source: 'UNCCD / GEF', type: 'verified' },
    ],
    dharmicNote: 'The Atharva Veda\'s Bhumi Sukta (Earth Hymn) opens with: "Truth, high and potent Law, the Consecrated, Fervour, Brahma, and Sacrifice uphold the Earth." Soil is not inert matter — it is 95% microbial life. The loss of soil is the loss of a living being.',
    dharmicSource: 'Atharva Veda 12.1 — Bhumi Sukta',
    frequencyNote: 'Healthy soil resonates at frequencies between 432–440 Hz. Degraded, chemically treated soils show disrupted electromagnetic signatures. The Schumann Resonance (Earth\'s natural EM frequency) is directly influenced by soil health.',
    frequencySource: 'Schumann, 1952 / emerging geophysics research',
    frequencyType: 'observed',
  },
  {
    id: 'minerals',
    icon: '⛏️',
    name: 'Minerals / Ore',
    sanskrit: 'Ratna Garbha · रत्न गर्भ',
    severity: '<20yr',
    severityLabel: 'gold left',
    depletionPct: 0.72,
    color: '#5A3A1A',
    summary: 'The Earth\'s jewel-womb took millions of years to form. We are emptying it in decades.',
    facts: [
      { stat: '~20yr', desc: 'Gold reserves remaining at current 3,000 tonne/yr extraction rate', source: 'USGS / Oregon Group', type: 'verified' },
      { stat: '−84%', desc: 'South Africa\'s gold output since 1970 peak (1,000t → 157t by 2017)', source: 'Oregon Group / S&P Global', type: 'verified' },
      { stat: '0', desc: 'Major gold discoveries ≥2 million oz in 2023 or 2024', source: 'S&P Global 2024', type: 'verified' },
      { stat: '2048', desc: 'Peak phosphate projected — critical for all food production globally', source: 'Wikipedia / phosphate researchers', type: 'observed' },
      { stat: '80%', desc: 'Of world phosphate reserves concentrated in a single mine', source: 'Resource depletion research', type: 'observed' },
    ],
    dharmicNote: 'Arthashastra of Kautilya describes Earth as Ratna Garbha — the womb of jewels. Minerals are sthavara prana — stationary life. Not dead matter, but the Earth\'s intelligence in its most crystallised form. Mining without ritual is the removal of Prithvi\'s immune system.',
    dharmicSource: 'Arthashastra / Kautilya (300 BCE)',
    frequencyNote: 'Crystalline minerals (quartz, gold, copper) are piezoelectric — they generate measurable electrical frequencies under pressure. Ancient temples were built on quartz-rich ground specifically because the rock generates a standing frequency. Depleting these minerals changes Earth\'s energetic landscape.',
    frequencySource: 'Piezoelectric research / archaeoacoustics', 
    frequencyType: 'observed',
  },
  {
    id: 'forests',
    icon: '🌳',
    name: 'Forest / Biomass',
    sanskrit: 'Vana · वन',
    severity: '−⅓',
    severityLabel: 'in 10k years',
    depletionPct: 0.55,
    color: '#2A4A2A',
    summary: 'From 57% forest cover 10,000 years ago to ~30% today. Half of that loss happened in the last 100 years.',
    facts: [
      { stat: '2B ha', desc: 'Total forest lost in 10,000 years — area twice the size of the United States', source: 'FAO / Our World in Data', type: 'verified' },
      { stat: '1B ha', desc: 'Lost in 20th century alone — matching all 9,000 years of prior loss combined', source: 'Our World in Data', type: 'verified' },
      { stat: '10M ha', desc: 'Forest deforested annually (current rate)', source: 'FAO 2024', type: 'verified' },
      { stat: '17%', desc: 'Amazon rainforest lost in the last 50 years', source: 'WWF / Global Forest Watch', type: 'verified' },
      { stat: '27 fields/min', desc: 'Rate of forest loss — 27 football fields every minute', source: 'Global Forest Watch', type: 'verified' },
    ],
    dharmicNote: 'The Aranyakas (Forest Texts) of the Upanishads were deliberately composed in forests — not in cities. The forest environment was considered a prerequisite for receiving certain transmissions of knowledge. The Ashwattha (Peepal) is Vishnu. The Bilva is Shiva. The Neem is Devi. Deforestation is not environmental damage. It is the destruction of divine embodiment.',
    dharmicSource: 'Aranyaka Upanishads / Bhagavad Gita 10.26',
    frequencyNote: 'Old-growth forests generate measurable infrasound (0.1–10 Hz) through wind in their canopies. These frequencies overlap with human brain theta waves (4–8 Hz) — the state of deep meditation and healing. The destruction of ancient forests removes a natural meditation-inducing frequency field.',
    frequencySource: 'Forest acoustics research / bioacoustics', 
    frequencyType: 'observed',
  },
  {
    id: 'body',
    icon: '🧬',
    name: 'Human Body',
    sanskrit: 'Annamaya Kosha · अन्नमय कोश',
    severity: '−76%',
    severityLabel: 'copper lost',
    depletionPct: 0.76,
    color: '#4A2A2A',
    summary: 'The food your grandparents ate had measurably more of Earth\'s gift. The Annamaya Kosha is built from what Earth offers.',
    facts: [
      { stat: '−76%', desc: 'Copper in vegetables (UK data, 1940–1991)', source: 'McCance & Widdowson', type: 'verified' },
      { stat: '−59%', desc: 'Zinc in food crops (1978–1991)', source: 'Thomas 1994', type: 'verified' },
      { stat: '−50%', desc: 'Iron in food (1940–2019, Mayer et al.)', source: 'Journal of American College of Nutrition', type: 'verified' },
      { stat: '−38%', desc: 'Riboflavin (B2) decline across 43 crops over 70 years', source: 'Davis et al. 2004', type: 'verified' },
      { stat: '1968', desc: 'Year grain mineral decline begins at Rothamsted — the exact year Green Revolution\'s soil impact registers', source: 'Rothamsted Research / Chemistry World 2024', type: 'verified' },
      { stat: 'Declining', desc: 'Bone mineral density falling in North America (NHANES 2013–14) — age-adjusted', source: 'NHANES / PubMed 2018', type: 'verified' },
    ],
    dharmicNote: 'Charaka Samhita: "Purushopi cha loke panchabhoutikaḥ" — the human being is composed of the five elements. When Prithvi weakens in the soil, it weakens in the body. The hollow bone, the depleted immunity, the chronic anxiety — these are Prithvi withdrawing from within us.',
    dharmicSource: 'Charaka Samhita, Sutrasthana 1',
    frequencyNote: 'The human body\'s natural resting frequency is approximately 7.5 Hz — nearly identical to the Schumann Resonance (Earth\'s electromagnetic heartbeat at 7.83 Hz). Mineral depletion in the body disrupts bioelectric signalling. A mineral-deficient body literally vibrates at a lower coherence.',
    frequencySource: 'Bioresonance research / Schumann 1952', 
    frequencyType: 'observed',
  },
  {
    id: 'sacred',
    icon: '🏔️',
    name: 'Sacred Geographies',
    sanskrit: 'Tirtha Kshetra · तीर्थ',
    severity: '−40%',
    severityLabel: 'glacier area',
    depletionPct: 0.40,
    color: '#2A3A4A',
    summary: 'The Himalaya is Himavat — Earth\'s highest expression. When sacred places degrade, the portal between dense matter and consciousness closes.',
    facts: [
      { stat: '−40%', desc: 'Himalayan glacier area since Little Ice Age. 67% are retreating.', source: 'IITM / Climate studies', type: 'verified' },
      { stat: '−60%', desc: 'Gangotri glacier volume projected lost by 2100 (high emission scenario)', source: 'IITM / IPCC', type: 'verified' },
      { stat: '296', desc: 'Polluted river stretches in India (2025)', source: 'Earth5R / CPCB', type: 'verified' },
      { stat: '500M', desc: 'People who could face water shortage if Ganga loses glacier meltwater', source: 'WWF Himalayan report', type: 'verified' },
      { stat: 'Dead', desc: 'Yamuna river declared biologically dead in Delhi stretch', source: 'CPCB / National Green Tribunal', type: 'observed' },
    ],
    dharmicNote: 'The Skanda Purana names 64 major tirthas — not as tourist destinations, but as points of maximum pranic density. Specific arrangements of mountains, rivers, and rock create conditions for elevated consciousness. Ancient temples were built at these exact geological junctions. Their power is not mythological — it is geophysical.',
    dharmicSource: 'Skanda Purana / Tirtha Mahatmya',
    frequencyNote: 'Pilgrim sites across traditions correlate with regions of elevated geomagnetic activity and quartz-rich geology. Cathedral sites in Europe, Hindu tirthas, and indigenous sacred sites show measurably different electromagnetic signatures from surrounding areas. The healing reported at these sites may have a frequency basis.',
    frequencySource: 'Archaeoacoustics / geomagnetic research', 
    frequencyType: 'observed',
  },
];

export const FREQUENCIES: Frequency[] = [
  {
    hz: 174,
    name: 'Foundation',
    color: '#1A3A5A',
    element: 'Prithvi — Earth',
    chakra: 'Pre-root — physical grounding',
    effect: 'Reduces pain. Gives organs a sense of security and love. Acts as a natural anesthetic.',
    connection: 'This frequency resonates with the densest physical matter — bone, stone, heavy minerals. It is the sound equivalent of Prithvi at its most elemental.',
    type: 'observed',
  },
  {
    hz: 285,
    name: 'Tissue Renewal',
    color: '#1A4A3A',
    element: 'Prithvi — cellular',
    chakra: 'Physical body / Annamaya Kosha',
    effect: 'Influences energy fields. Restructures damaged tissue. Leaves body rejuvenated.',
    connection: 'As the Annamaya Kosha loses its mineral foundation, 285 Hz is said to act on the cellular level — restoring structural integrity to depleted tissue.',
    type: 'observed',
  },
  {
    hz: 396,
    name: 'Liberation',
    color: '#5A1A1A',
    element: 'Fire within Earth',
    chakra: 'Muladhara — Root',
    effect: 'Liberates fear and guilt. Cleanses traumatic experiences from cells. Turns grief to joy.',
    connection: 'The Muladhara frequency. Directly addresses the survival fear that emerges when Earth\'s security is threatened. The frequency of releasing what binds us to depletion patterns.',
    type: 'observed',
  },
  {
    hz: 417,
    name: 'Change',
    color: '#4A3A1A',
    element: 'Transition',
    chakra: 'Svadhisthana — Sacral',
    effect: 'Facilitates change. Cleanses traumatic experiences. Undoes destructive influences of past events.',
    connection: 'The frequency that enables transition from depletion to restoration. Cannot restore without first being willing to change the relationship with Earth.',
    type: 'observed',
  },
  {
    hz: 528,
    name: 'Love / DNA',
    color: '#1A5A2A',
    element: 'Life force',
    chakra: 'Manipura / Heart bridge',
    effect: 'Known as the "miracle tone." Repairs DNA. Brings transformation and miracles. Love frequency.',
    connection: 'Dr. Masaru Emoto documented that water crystals exposed to this frequency form the most coherent, beautiful structures. Since soil and the human body are 60–70% water, this has direct implications for restoration.',
    type: 'observed',
  },
  {
    hz: 432,
    name: 'Earth Tuning',
    color: '#3A2A1A',
    element: 'Prithvi resonance',
    chakra: 'Full spectrum — natural alignment',
    effect: 'Natural tuning of the universe. Mathematically consistent with patterns in nature. Fibonacci sequence, sacred geometry, cosmic cycles.',
    connection: 'Until 1939, most music globally was tuned to 432 Hz. This is the frequency at which the Schumann Resonance (Earth\'s EM heartbeat at 7.83 Hz) harmonically resolves to through octave scaling. Ancient Vedic instruments were tuned to this. The shift to 440 Hz (1939 ISO standard) is a verifiable historical break from Earth\'s natural frequency.',
    type: 'observed',
  },
  {
    hz: 7.83,
    name: 'Schumann Resonance',
    color: '#2A4A2A',
    element: 'Earth\'s heartbeat',
    chakra: 'Earth–body coherence',
    effect: 'The electromagnetic resonance of Earth\'s surface. Human brain theta waves (4–8 Hz) overlap with this range — the same state as deep meditation, healing, and intuition.',
    connection: 'Astronauts who spent time in early spacecraft without Schumann Resonance generators experienced physical and psychological deterioration. NASA now includes them as standard equipment. This is perhaps the most verified evidence that the human body needs Earth\'s frequency to function properly.',
    type: 'verified',
  },
];

export const MANTRAS: Mantra[] = [
  {
    id: 'lam',
    name: 'Lam Beej Mantra',
    tradition: 'Vedic',
    chakra: 'Muladhara — Root',
    element: 'Prithvi',
    text: 'लं',
    romanized: 'LAM',
    meaning: 'The seed sound (beej) of Earth element. Activates and clears the root chakra. Restores the body\'s primal connection to Prithvi tattva.',
    duration: 180,
    repeats: 108,
    frequency: 396,
    icon: '🌍',
    why: 'LAM is the single most direct sound intervention for a depleted Muladhara. Each repetition sends a 396 Hz-adjacent vibration through the base of the spine, where the root chakra resides physically in the perineal body.',
    whySource: 'Tantric yoga / traditional Nada Yoga',
    whyType: 'dharmic',
  },
  {
    id: 'gayatri',
    name: 'Gayatri Mantra',
    tradition: 'Vedic · Rigveda 3.62.10',
    chakra: 'All chakras — begins with Muladhara (Bhu)',
    element: 'All five elements — Bhu first',
    text: 'ॐ भूर्भुवः स्वः\nतत्सवितुर्वरेण्यम्\nभर्गो देवस्य धीमहि\nधियो यो नः प्रचोदयात्',
    romanized: 'Om Bhur Bhuvah Svah\nTat Savitur Varenyam\nBhargo Devasya Dhimahi\nDhiyo Yo Nah Prachodayat',
    meaning: 'We meditate on the divine light of the Sun. May it illuminate our intellect and inspire us on the right path. The opening "Bhu" (Earth) grounds the entire mantra in Prithvi before ascending.',
    duration: 450,
    repeats: 108,
    frequency: 432,
    icon: '☀️',
    why: 'The Gayatri begins with the Vyahritis — Bhu, Bhuvah, Svah (Earth, Atmosphere, Cosmos). This is not incidental. Every recitation begins by invoking and grounding in Prithvi. The mantra is a chakra map from root to crown, completed in sound. Traditionally chanted at 432 Hz — Earth tuning.',
    whySource: 'Rigveda 3.62.10 / Gayatri Upanishad',
    whyType: 'dharmic',
  },
  {
    id: 'bhumi-sukta',
    name: 'Bhumi Sukta',
    tradition: 'Vedic · Atharva Veda 12.1',
    chakra: 'Muladhara / Earth body',
    element: 'Prithvi — direct invocation',
    text: 'माता भूमिः पुत्रोऽहं पृथिव्याः',
    romanized: 'Mata Bhumih Putroham Prithivyah',
    meaning: 'Earth is my mother. I am her son / child.',
    duration: 600,
    repeats: 21,
    frequency: 174,
    icon: '🌏',
    why: 'This is the declaration of relationship. The Bhumi Sukta\'s 63 verses are a complete ceremony of acknowledgment and reciprocity toward the Earth. In Vedic understanding, simply stating this relationship truthfully — "Earth is my mother" — begins the restoration of the energetic bond between Muladhara and Prithvi.',
    whySource: 'Atharva Veda 12.1 / Bhumi Sukta',
    whyType: 'dharmic',
  },
];

export const TRADITIONS: Tradition[] = [
  {
    id: 'vedic',
    icon: '🕉️',
    name: 'Vedic / Hindu',
    color: '#C9962A',
    practices: [
      { name: 'Lam Beej Mantra', desc: 'Seed sound of Earth element — Muladhara activation', chakra: 'Root' },
      { name: 'Gayatri Mantra', desc: 'All-chakra healing, begins with Bhu (Earth)', chakra: 'All' },
      { name: 'Bhumi Sukta', desc: 'Direct invocation of Earth as mother — 63 verses', chakra: 'Root' },
      { name: 'Prithvi Mantra', desc: 'Om Bhu Bhuvah Svah — the three Earth planes', chakra: 'Root' },
      { name: 'Shiva Tandava', desc: 'Dance of destruction and renewal — Kali cycle in sound', chakra: 'Base' },
    ],
    essence: 'The Vedic approach recognises that sound (Nada) is the first manifestation of Brahman into matter. Every mantra is a specific frequency intervention on a specific level of being.',
  },
  {
    id: 'buddhist',
    icon: '☸️',
    name: 'Buddhist',
    color: '#3A7A9A',
    practices: [
      { name: 'Earth-touching Mudra', desc: 'The gesture of the Buddha\'s enlightenment — calling Earth to witness', chakra: 'Root' },
      { name: 'Metta (Loving Kindness)', desc: 'Extending compassion to all beings — including the Earth', chakra: 'Heart' },
      { name: 'Om Mani Padme Hum', desc: 'The jewel in the lotus — form emerging from Earth', chakra: 'All' },
      { name: 'Breathing with Earth', desc: 'Vipassana ground-rooting practice', chakra: 'Root' },
    ],
    essence: 'Buddhist practice recognises all form as Mahabhuta (great elements). Earth healing is inseparable from the recognition of interdependence — that self and world are not separate.',
  },
  {
    id: 'jewish',
    icon: '✡️',
    name: 'Jewish / Kabbalistic',
    color: '#4A6A4A',
    practices: [
      { name: 'Psalm 104', desc: 'The great Earth Psalm — "You make springs gush forth in the valleys"', chakra: 'All' },
      { name: 'Tikkun Olam', desc: 'Repair of the world — the central obligation of healing what is broken', chakra: 'All' },
      { name: 'Adamah prayers', desc: 'Adamah (Earth/soil) invocations — the same root as Adam', chakra: 'Root' },
    ],
    essence: 'In Kabbalah, the Earth is Malkuth — the Kingdom, the lowest Sephirot on the Tree of Life, which is the foundation on which all others rest. Healing the world begins at Malkuth. Tikkun Olam is perhaps the oldest ecological repair framework.',
  },
  {
    id: 'christian',
    icon: '✝️',
    name: 'Christian / Sufi',
    color: '#4A3A5A',
    practices: [
      { name: 'Canticle of Creatures', desc: 'Francis of Assisi — "Praised be Thou, my Lord, through Sister Earth"', chakra: 'Heart' },
      { name: 'Sufi Dhikr', desc: 'Ya Allah Al-Ard — remembrance through Earth qualities of the Divine', chakra: 'All' },
      { name: 'Hesychast breathing', desc: 'Orthodox Christian body-prayer rooted in physical presence', chakra: 'Root' },
    ],
    essence: 'Francis of Assisi\'s "Sister Earth" and Rumi\'s "be like Earth — patient, receiving all, giving forth life" share the same insight: the ground beneath our feet is a teacher of spiritual qualities, not merely a resource.',
  },
  {
    id: 'islamic',
    icon: '☪️',
    name: 'Islamic',
    color: '#2A5A4A',
    practices: [
      { name: 'Subhanallah', desc: 'Glory of creation — repeated 33x traditionally, activates awareness of Earth\'s miracle', chakra: 'Heart' },
      { name: 'Khilafah dhikr', desc: 'Stewardship / vicegerency remembrance — human as Earth\'s caretaker', chakra: 'All' },
      { name: 'Prostration (Sujud)', desc: 'The most intimate contact of the human body with the Earth — forehead to ground', chakra: 'Root/Crown' },
    ],
    essence: 'In the Quran, humans are described as Khalifa (stewards/vicegerents) of the Earth — entrusted, not owning. Sujud (prostration in prayer) is perhaps the most ancient and universal act of returning the human body to the Earth, five times daily.',
  },
  {
    id: 'indigenous',
    icon: '🌿',
    name: 'Indigenous / Earth',
    color: '#4A5A2A',
    practices: [
      { name: 'Pachamama invocations', desc: 'Andean Earth Mother ceremonies — direct relationship with living Earth', chakra: 'Root' },
      { name: 'Aboriginal Songlines', desc: 'Songs that literally describe and maintain the landscape — the Earth is a musical score', chakra: 'All' },
      { name: 'Native American Earth songs', desc: 'Songs of gratitude sung to specific landscapes, rivers, mountains', chakra: 'Root' },
      { name: 'Siberian Tuvan throat singing', desc: 'Overtone singing that mimics natural frequencies — rivers, wind, mountains', chakra: 'Throat/Root' },
    ],
    essence: 'Indigenous traditions worldwide share one understanding that modern ecology is only now reaching: the Earth is alive, has memory, and responds to how she is addressed. The Australian Aboriginal concept of Songlines proposes that the entire continent is maintained by songs — and that failing to sing them contributes to its decline.',
  },
];
