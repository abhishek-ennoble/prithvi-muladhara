// src/theme/tokens.ts
// Design language: Sacred geometry meets mineral stillness
// Every decision is intentional — this is a space of devotion

export const Colors = {
  // Base — the void from which form emerges
  void:        '#0D0A06',
  deep:        '#151008',
  ground:      '#1E1508',
  mud:         '#2E2010',
  bark:        '#4A3520',

  // Earth tones — Prithvi's own palette
  ochre:       '#C17D3C',
  gold:        '#D4A843',
  paleGold:    '#D4B060',
  parchment:   '#EDE3CF',
  cream:       '#F5EED8',

  // Muted signal
  ash:         '#8A7A62',
  stone:       '#5A4E3A',
  sage:        '#6B7C5E',

  // Chakra
  muladhara:   '#B03020',   // deep red — root
  svadhisthana:'#C05520',   // orange — sacral
  manipura:    '#C09020',   // yellow — solar
  anahata:     '#3A7A4A',   // green — heart
  vishuddha:   '#2A6A9A',   // blue — throat
  ajna:        '#4A3A9A',   // indigo — third eye
  sahasrara:   '#7A3A9A',   // violet — crown

  // Status
  verified:    '#3A7A4A',
  dharmic:     '#D4A843',
  observed:    '#8A4A3A',

  // Healing frequencies (visualisation colors)
  freq174:     '#1A3A5A',   // 174 Hz — foundation
  freq285:     '#1A4A3A',   // 285 Hz — tissue
  freq396:     '#4A1A1A',   // 396 Hz — liberation/root
  freq417:     '#3A2A1A',   // 417 Hz — change
  freq528:     '#1A4A2A',   // 528 Hz — DNA/love
  freq639:     '#1A2A4A',   // 639 Hz — connection
  freq741:     '#2A1A4A',   // 741 Hz — expression
  freq852:     '#3A1A4A',   // 852 Hz — intuition
  freq963:     '#4A1A4A',   // 963 Hz — crown
} as const;

export const Typography = {
  // Display — Yatra One (Sanskrit feel, earthy weight)
  // We load as web font fallback; in RN use system serif
  display: {
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  // Body — system serif, contemplative reading
  body: {
    fontFamily: 'serif',
    lineHeight: 28,
  },
  // Mono — data, labels, measurements
  mono: {
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
} as const;

export const Spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  40,
  xxl: 64,
} as const;

export const Radius = {
  sm:  4,
  md:  8,
  lg:  16,
  pill:40,
  full:999,
} as const;

export const Shadow = {
  subtle: {
    shadowColor: '#D4A843',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  glow: {
    shadowColor: '#D4A843',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 8,
  },
  chakraGlow: {
    shadowColor: '#B03020',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 6,
  },
} as const;

export type ColorName = keyof typeof Colors;
export type SpacingName = keyof typeof Spacing;
export type RadiusName = keyof typeof Radius;
