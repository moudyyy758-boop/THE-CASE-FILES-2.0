import { MysteryCase } from './types';

export const INITIAL_CASES: MysteryCase[] = [
  {
    id: 'the-last-toast',
    fileNumber: 'FILE #402-A',
    title: 'The Last Toast',
    subtitle: 'A celebratory evening ends with an unexpected death. Six guests remain, each with something to hide.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpb5tIhIS6X4ou5RDH0ceNdYwQFsLCEfN0QZfOZniwVBQqqpAfKbcfA_udshU1ng4W4fXUsESMFjSB2Z0Dcl2CJnTwOV14DXCdc5ApLgBpq4r4HlxiMNTuZUE0zNv-Azyuz7PPo8AycOJ8_RaMt1iMzgXg-Q_vZ5VeZ92apLE8CnjGsA7jx25Pj7c_puKCeBxBEPvnque82-vfnZTVvELQI4YnLVUdPALsoMD8RMKm4vQtLqzKURw',
    price: 24.99,
    originalPrice: 29.99,
    difficulty: 'Seasoned',
    playerCount: '4–8 Players',
    minPlayers: 4,
    maxPlayers: 8,
    durationMinutes: '90–120 min',
    minDurationMinutes: 90,
    recommendedAge: '13+',
    setting: 'Mansion',
    style: 'Whodunit',
    tags: ['Dinner Party', 'Prohibition Era', 'Wealth & Secrets'],
    isFeatured: true,
    rating: 4.9,
    reviewCount: 142,
    premise: 'A celebratory evening at the grand Sterling Estate ends in tragedy when the host, renowned industrialist Arthur Sterling, collapses after raising his crystal glass. Suspicion falls on everyone in the room. Was it business, pleasure, or something far more sinister?',
    settingDescription: 'October 1947. The high-society dining room of Sterling Manor, filled with velvet drapes, mahogany furniture, and crystal glassware under heavy chandeliers.',
    whatsNeeded: [
      '4 to 8 players (1 host, 3-7 investigators)',
      '90 to 120 minutes of investigation time',
      'Digital devices or printed case files',
      'A quiet, atmospheric setting (champagne optional!)'
    ],
    whatsIncluded: [
      'Interactive Host Command Dashboard',
      '6 Detailed Player Dossiers & Private Secrets',
      '14 High-Resolution Archival Evidence Cards',
      'Interactive Event Timeline with Contradiction Tracking',
      'Progressive 3-Tier Hint System',
      'Official Solution Dossier & Case Scoring System'
    ],
    difficultyExplanation: 'Requires cross-referencing timeline statements with physical evidence and identifying a subtle discrepancy in financial records.',
    characters: [
      {
        id: 'char-eleanor',
        name: 'Eleanor Vance',
        role: 'Socialite & Heiress',
        age: 32,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        background: 'Longtime acquaintance of Arthur Sterling. Known for her extravagant lifestyle and recent disputes regarding estate trust funds.',
        relationships: 'Daughter of Sterling’s former business partner. Secretly engaged to Julian Croft.',
        knownInfo: 'Was seen arguing near the study at 8:05 PM regarding a missing ledger.',
        personalObjectives: [
          'Ensure the torn letter is not linked to your family trust',
          'Find out if Julian brought the antique vial'
        ],
        secrets: 'Signed a secret agreement to sell her shares to Arthur’s rival prior to the dinner.',
        privateClues: [
          'You noticed Julian slipping something into his coat pocket near the bar cart at 7:50 PM.',
          'Arthur threatened to disinherit you if you proceeded with the sale.'
        ]
      },
      {
        id: 'char-julian',
        name: 'Julian Croft',
        role: 'Chief Chemist & Business Associate',
        age: 41,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        background: 'Oversees chemical developments at Sterling Industries. A quiet intellectual with debt issues.',
        relationships: 'Employee and confidant of Arthur Sterling.',
        knownInfo: 'Brought the vintage cognac used for the toast.',
        personalObjectives: [
          'Protect your laboratory research notes',
          'Deflect suspicion regarding chemical compounds'
        ],
        secrets: 'Was being blackmailed by Arthur regarding unapproved chemical trials.',
        privateClues: [
          'The glass Arthur drank from was coated with cyanide derivative from your lab.',
          'You saw Beatrice near the serving tray moments before dinner.'
        ],
        isCulprit: true,
        culpritMotive: 'Arthur discovered Julian was selling industrial formulas to a competitor and was planning to turn him over to federal authorities that night.'
      },
      {
        id: 'char-beatrice',
        name: 'Beatrice Sterling',
        role: 'Arthur’s Estranged Sister',
        age: 48,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
        background: 'Returned from London after five years. Claims to seek family reconciliation.',
        relationships: 'Sister to the victim. Has unresolved estate claims.',
        knownInfo: 'Poured the drinks at the head table.',
        personalObjectives: [
          'Prove your return was out of goodwill',
          'Expose Julian’s shady laboratory dealings'
        ],
        secrets: 'Her travel debts exceed $50,000.',
        privateClues: [
          'You found a crushed pill casing under the dining table after Arthur collapsed.'
        ]
      },
      {
        id: 'char-victor',
        name: 'Victor Hayes',
        role: 'Estate Attorney',
        age: 55,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
        background: 'Custodian of the Sterling Estate will and confidential agreements for over twenty years.',
        relationships: 'Legal advisor to Arthur Sterling.',
        knownInfo: 'Carried the locked leather briefcase during dinner.',
        personalObjectives: [
          'Prevent the unreleased will from being destroyed',
          'Verify timestamps of every guest'
        ],
        secrets: 'Discovered Arthur was changing his will to leave everything to a charity fund.',
        privateClues: [
          'The updated will was removed from your briefcase between 8:15 PM and 8:30 PM.'
        ]
      }
    ],
    evidence: [
      {
        id: 'ev-014',
        number: 'EVIDENCE #014',
        title: 'The Torn Letter',
        type: 'Document',
        foundAt: 'Arthur’s Private Study Desk',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvrCIWYZfHrf9xFcmZIfgafDPlFCUE9ikWuWwpCO8eMaRUb_eKhGr6qN-49dXjnJ8klNNU7F-UFN6FZaM-Y42xBeiT8ko2RXffTrCs_Bc9EnzMOm50en77YtqO0ZrWlfH28ysglQqdKOa1j1L4w4LmwKt0ABbSdNGo9kmKmWa06K-MdJ6Av4ShYUE4ZstpGPTrMhRTNU7LMqqXGSrBDVJSrZZ-TEM_IWpJQLlk2F3CyNC5dO_URyE',
        description: 'A torn piece of parchment recovered from the study trash bin, handwritten in dark ink.',
        transcription: '...cannot go on like this. The arrangement we made was temporary, yet you continue to press for more.\n\n[Illegible text, possibly "tonight"]\n\nIf he finds out about the ledger, we are both ruined. Meet me where we discussed.\n\n- E.',
        relatedSuspectIds: ['char-eleanor', 'char-julian'],
        relatedObjects: ['The Ledger', 'Study Desk']
      },
      {
        id: 'ev-018',
        number: 'EVIDENCE #018',
        title: 'Tipped Crystal Coupe',
        type: 'Physical',
        foundAt: 'Dining Table, Seat #1',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpb5tIhIS6X4ou5RDH0ceNdYwQFsLCEfN0QZfOZniwVBQqqpAfKbcfA_udshU1ng4W4fXUsESMFjSB2Z0Dcl2CJnTwOV14DXCdc5ApLgBpq4r4HlxiMNTuZUE0zNv-Azyuz7PPo8AycOJ8_RaMt1iMzgXg-Q_vZ5VeZ92apLE8CnjGsA7jx25Pj7c_puKCeBxBEPvnque82-vfnZTVvELQI4YnLVUdPALsoMD8RMKm4vQtLqzKURw',
        description: 'Heavy lead crystal glass used for the midnight toast. A faint bitter almond aroma residue remains around the rim.',
        relatedSuspectIds: ['char-julian', 'char-beatrice'],
        relatedObjects: ['Vintage Cognac', 'Cyanide Compound']
      },
      {
        id: 'ev-022',
        number: 'EVIDENCE #022',
        title: 'Lab Shipment Invoice #882',
        type: 'Financial',
        foundAt: 'Julian Croft’s Coat Pocket',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa0Gw3A18P-mIxxD-uH8dPut4wl3d64AdKr5c2klAuhx6Xl_uNYPm703zymiFPjlHP5q1SyCsJR7MXuwG6JAY6qUc-QZ-vOZwPmN2_HtM35WAm3W9dNSKtcCLuO9ZQsbDuA0hVuMlFJBA1P9wbvg_LuxvTspALXSYCz_qxRcnu9iI22Yj41BHnDiNTSoyWtdLQnCYo6lwjfJS2cjXsanoAx5rhPjyClaZSFXLvkeNv5RErEMDauOw',
        description: 'Shipping manifest showing a transfer of restricted chemical reagents to a private box under the alias "J. C. Laboratories".',
        transcription: 'Item: Potassium Cyanide 500mg. Destination: Bureau Box 402. Status: Delivered Oct 11.',
        relatedSuspectIds: ['char-julian'],
        relatedObjects: ['Sterling Chemicals', 'PO Box 402']
      }
    ],
    timeline: [
      {
        id: 'tl-1',
        timestamp: '6:00 PM',
        title: 'Guests Arrive at Manor',
        description: 'All eight invited guests arrive and gather in the grand parlor for welcome drinks.',
        location: 'Grand Parlor',
        involvedSuspectIds: ['char-eleanor', 'char-julian', 'char-beatrice', 'char-victor']
      },
      {
        id: 'tl-2',
        timestamp: '7:15 PM',
        title: 'Dinner Served',
        description: 'Formal dinner begins in the main hall. Beatrice assists in serving drinks.',
        location: 'Dining Room',
        involvedSuspectIds: ['char-beatrice', 'char-victor']
      },
      {
        id: 'tl-3',
        timestamp: '8:05 PM',
        title: 'Argument Heard Near Study',
        description: 'Elevated voices heard between a man and a woman near the study corridor.',
        location: 'Study Corridor',
        involvedSuspectIds: ['char-eleanor', 'char-julian'],
        hasContradiction: true,
        contradictionNote: 'Julian claimed he was in the coat room from 8:00 to 8:15 PM, but Evidence #014 places him near the study.'
      },
      {
        id: 'tl-4',
        timestamp: '8:30 PM',
        title: 'The Midnight Toast',
        description: 'Arthur Sterling raises his glass to toast the guests. Within 30 seconds of sipping, he collapses.',
        location: 'Dining Room Table',
        involvedSuspectIds: ['char-eleanor', 'char-julian', 'char-beatrice', 'char-victor']
      }
    ],
    hints: [
      {
        id: 1,
        levelName: 'Gentle',
        text: 'Pay close attention to who had direct access to Sterling Industries laboratory compounds and shipment records.'
      },
      {
        id: 2,
        levelName: 'Moderate',
        text: 'Compare Julian Croft’s alibi at 8:05 PM with the initials on the torn letter found in the study (Evidence #014).'
      },
      {
        id: 3,
        levelName: 'Strong',
        text: 'Julian Croft poisoned Arthur’s glass using Potassium Cyanide from Invoice #882 after Arthur threatened to expose his formula theft.'
      }
    ],
    solution: {
      culpritId: 'char-julian',
      culpritName: 'Julian Croft',
      motive: 'Exposing formula theft and blackmail regarding chemical trials.',
      howItHappened: 'Julian coated the inner rim of Arthur’s crystal coupe with a fast-acting potassium cyanide derivative synthesized at his lab. During the 8:30 PM toast, Arthur drank directly from the prepared glass and collapsed immediately.',
      keyEvidence: ['EVIDENCE #014 (Torn Letter)', 'EVIDENCE #018 (Coupe with residue)', 'EVIDENCE #022 (Chemical Invoice #882)'],
      breakdown: 'Julian’s initial alibi fell apart when the shipment invoice #882 proved he personally ordered restricted cyanide. Combined with the torn letter revealing his clash with Arthur over the stolen ledger, the motive and physical evidence conclusively convict him.'
    },
    reviews: [
      {
        id: 'rev-1',
        author: 'Detective Margaret F.',
        rating: 5,
        date: 'October 14, 2025',
        title: 'Incredible atmosphere and solid logic!',
        comment: 'Hosted this for six friends on a rainy Saturday. The character dossiers were rich and the evidence felt authentic. Highly recommend!',
        verified: true,
        containsSpoilers: false
      },
      {
        id: 'rev-2',
        author: 'Arthur P.',
        rating: 5,
        date: 'November 2, 2025',
        title: 'The timeline tool made hosting a breeze',
        comment: 'Great pacing! We spent almost two hours analyzing the torn letter and invoice. The reveal moment was super satisfying.',
        verified: true,
        containsSpoilers: false
      }
    ]
  },
  {
    id: 'the-midnight-syndicate',
    fileNumber: 'FILE #993-A',
    title: 'The Midnight Syndicate',
    subtitle: 'A prominent bootlegger is found dead in his own establishment. The suspects are many, the alibis are thin.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT9_Z-duRHjDPM4Dq0D9iKkqdZvrica42z3et4M-732_lX2dL-dicATpVmNbnv1QS9kpj9Qdf7ruaDU4RFo3MdSuz-w9fvhoQsY38NyZ6-3wMx6ZDUtrwY1AUgha7zwV1zuQ1N4ICd1fXUAF6L6Vn2RU5Kyjpb7nEdx5wfuD0NCBtFa12VoCAMA4y4W0I2jXgYlrzi2_3jh-n73qsUuGDYSdsA5D0SVaSMwyiTqnQqbEDZCcLnxLc',
    price: 34.99,
    difficulty: 'Seasoned',
    playerCount: '5–8 Players',
    minPlayers: 5,
    maxPlayers: 8,
    durationMinutes: '120–180 min',
    minDurationMinutes: 120,
    recommendedAge: '16+',
    setting: 'Hotel',
    style: 'Detective',
    tags: ['Speakeasy', 'Noir', 'Mafia', 'Chicago 1928'],
    rating: 4.8,
    reviewCount: 98,
    premise: 'Unravel the web of deceit in prohibition-era Chicago before the police raid the building. Owner "Lucky" Vito’s body was found in the back room behind a locked door.',
    settingDescription: 'Chicago 1928, a underground speakeasy hidden behind a tailor shop.',
    whatsNeeded: ['5-8 Players', '120-180 Mins', 'Printed dossiers or tablets'],
    whatsIncluded: ['Host Guide', '8 Character Files', 'Underground Map', 'Ledger Evidence'],
    difficultyExplanation: 'Complex financial record keeping and hidden safe combinations.',
    characters: [
      {
        id: 'char-vito-jr',
        name: 'Vito Jr.',
        role: 'Speakeasy Manager',
        age: 29,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
        background: 'Son of Lucky Vito, eager to take over the syndicate.',
        relationships: 'Rival to the head accountant.',
        knownInfo: 'Held the master keys to the office.',
        personalObjectives: ['Claim ownership of the speakeasy'],
        secrets: 'Owes $10,000 to the rival syndicate.',
        privateClues: ['Found the back exit door unbolted at 1:00 AM.']
      }
    ],
    evidence: [
      {
        id: 'ev-speakeasy-1',
        number: 'EVIDENCE #101',
        title: 'Overturned Cocktail Glass',
        type: 'Physical',
        foundAt: 'Speakeasy Velvet Booth #3',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT9_Z-duRHjDPM4Dq0D9iKkqdZvrica42z3et4M-732_lX2dL-dicATpVmNbnv1QS9kpj9Qdf7ruaDU4RFo3MdSuz-w9fvhoQsY38NyZ6-3wMx6ZDUtrwY1AUgha7zwV1zuQ1N4ICd1fXUAF6L6Vn2RU5Kyjpb7nEdx5wfuD0NCBtFa12VoCAMA4y4W0I2jXgYlrzi2_3jh-n73qsUuGDYSdsA5D0SVaSMwyiTqnQqbEDZCcLnxLc',
        description: 'Traces of sedative drug mixed with whiskey.',
        relatedSuspectIds: ['char-vito-jr'],
        relatedObjects: ['Whiskey Bottle']
      }
    ],
    timeline: [
      {
        id: 'tl-s1',
        timestamp: '11:30 PM',
        title: 'Jazz Band Break',
        description: 'Lucky Vito went to his back office alone.',
        location: 'Back Office',
        involvedSuspectIds: ['char-vito-jr']
      }
    ],
    hints: [
      { id: 1, levelName: 'Gentle', text: 'Check who paid off their debts early in the ledger.' }
    ],
    solution: {
      culpritId: 'char-vito-jr',
      culpritName: 'Vito Jr.',
      motive: 'To clear debts with the rival syndicate and claim ownership.',
      howItHappened: 'Vito Jr. spiked his father’s drink during the band break and locked the door from the outside.',
      keyEvidence: ['EVIDENCE #101'],
      breakdown: 'Matching fingerprints on the bottle confirmed Vito Jr. poisoned the glass.'
    },
    reviews: []
  },
  {
    id: 'the-heirloom-poisoning',
    fileNumber: 'FILE #204-V',
    title: 'The Heirloom Poisoning',
    subtitle: 'A foggy Victorian estate hides dark family secrets after an eccentric matriarch leaves her fortune to a stranger.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEgbvbkRcNPSWD8ChSMnUQcNvfcoE309GfEty5nuCLIJ79yhkvcqP-ji1hAy7nULTq8-H-JBBAQdxki4Z0Kagz44fImE_KGQWlH_V1e-ZJ64kVks1AIrzJmmQYQL5hX8JwjSMgms4in0lxSiHKc1U96q2G6rDNIndqcUImMiXAjRPdFVBtnspA4uK8M8ZNk2xCgHMhTVucA3J0APItDyHgv5UPiBxvEnGIqf1UZNKWQCzPw8ReDsY',
    price: 24.99,
    difficulty: 'Rookie',
    playerCount: '3–6 Players',
    minPlayers: 3,
    maxPlayers: 6,
    durationMinutes: '60–90 min',
    minDurationMinutes: 60,
    recommendedAge: '12+',
    setting: 'Victorian',
    style: 'Whodunit',
    tags: ['Victorian', 'Mansion', 'Inheritance', 'Family Mystery'],
    rating: 4.7,
    reviewCount: 76,
    premise: 'When Lady Penelope Blackwood dies abruptly during tea, six relatives in Blackwood Manor fall under immediate suspicion.',
    settingDescription: 'London, 1892. Blackwood Manor’s drawing room shrouded in fog.',
    whatsNeeded: ['3-6 Players', '60-90 Mins', 'Printed dossiers or phones'],
    whatsIncluded: ['Victorian Map', '6 Character Files', 'Tea Set Evidence'],
    difficultyExplanation: 'Perfect entry-level mystery focusing on motive and direct testimony.',
    characters: [],
    evidence: [],
    timeline: [],
    hints: [],
    solution: {
      culpritId: 'char-1',
      culpritName: 'Lord Blackwood',
      motive: 'Financial debt.',
      howItHappened: 'Spiked the Earl Grey tea.',
      keyEvidence: ['Tea Leaves'],
      breakdown: 'Found poison vial in his coat.'
    },
    reviews: []
  },
  {
    id: 'operation-blank-slate',
    fileNumber: 'FILE #771-X',
    title: 'Operation: Blank Slate',
    subtitle: 'Cold war espionage at a high-stakes Berlin summit where a double agent is eliminated inside a secure bunker.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa0Gw3A18P-mIxxD-uH8dPut4wl3d64AdKr5c2klAuhx6Xl_uNYPm703zymiFPjlHP5q1SyCsJR7MXuwG6JAY6qUc-QZ-vOZwPmN2_HtM35WAm3W9dNSKtcCLuO9ZQsbDuA0hVuMlFJBA1P9wbvg_LuxvTspALXSYCz_qxRcnu9iI22Yj41BHnDiNTSoyWtdLQnCYo6lwjfJS2cjXsanoAx5rhPjyClaZSFXLvkeNv5RErEMDauOw',
    price: 39.99,
    difficulty: 'Master Detective',
    playerCount: '6–10 Players',
    minPlayers: 6,
    maxPlayers: 10,
    durationMinutes: '120–180 min',
    minDurationMinutes: 120,
    recommendedAge: '16+',
    setting: 'Corporate',
    style: 'Psychological',
    tags: ['Cold War', 'Espionage', 'Redacted Documents', 'Berlin 1962'],
    rating: 4.95,
    reviewCount: 112,
    premise: 'Inside a subterranean communications post, an operative is dead and secret microfilm is missing.',
    settingDescription: 'Berlin, 1962. A high-security underground concrete bunker.',
    whatsNeeded: ['6-10 Players', '2-3 Hours', 'Redacted Files & Cipher Keys'],
    whatsIncluded: ['Cipher Decoder', 'Redacted Telegrams', 'Audio Files'],
    difficultyExplanation: 'Intense encryption puzzles and deceptive spy tradecraft.',
    characters: [],
    evidence: [],
    timeline: [],
    hints: [],
    solution: {
      culpritId: 'char-spy',
      culpritName: 'Agent Falcon',
      motive: 'Treason and money.',
      howItHappened: 'Used silenced pistol in soundproof room.',
      keyEvidence: ['Microfilm'],
      breakdown: 'Cipher code matched his notebook.'
    },
    reviews: []
  },
  {
    id: 'the-neighborhood-watch',
    fileNumber: 'FILE #112-S',
    title: 'The Neighborhood Watch',
    subtitle: 'Behind white picket fences in 1955 suburbia, a quiet cul-de-sac becomes a crime scene.',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS4sn6XPLBt_6vwPYfNMggHF7L3RqaYzZuYy0_DhIw43s8m3UJeiSj1t1T2DhcSMBlhDnH2Bh6a0ivacWz9uCLa1aYPwkFyPZx7U2KpdErsJuaXH9uzGkCijP06lJlAIAUI2NcylE03g2shViImpr6zzaQ6Zf6sf4pmpDaREYlp-B_Si6gzcLvWWzmG8N-w2nwQBiOl5aDQejuGDqao62FaF1n3h_iWXQQa0EWNjl17DL0W9F_UCk',
    price: 29.99,
    difficulty: 'Seasoned',
    playerCount: '4–7 Players',
    minPlayers: 4,
    maxPlayers: 7,
    durationMinutes: '90–120 min',
    minDurationMinutes: 90,
    recommendedAge: '14+',
    setting: 'Suburban',
    style: 'Social deduction',
    tags: ['1950s', 'Suburbia', 'Gossip', 'Rotary Phone'],
    rating: 4.6,
    reviewCount: 54,
    premise: 'A neighborly barbecue takes a dark turn when local block captain Harold Finch vanishes, leaving behind an off-the-hook rotary phone.',
    settingDescription: '1955 Oakridge Lane, pristine suburbia with dark secrets.',
    whatsNeeded: ['4-7 Players', '90-120 Mins', 'Phone logs and neighbor notes'],
    whatsIncluded: ['Neighborhood Map', '7 Dossiers', 'Rotary Log Cards'],
    difficultyExplanation: 'Requires sifting through suburban gossip to find true timeline facts.',
    characters: [],
    evidence: [],
    timeline: [],
    hints: [],
    solution: {
      culpritId: 'char-suburb',
      culpritName: 'Mrs. Gable',
      motive: 'Blackmail regarding real estate fraud.',
      howItHappened: 'Cut the telephone wire and staged the escape.',
      keyEvidence: ['Wirecutters'],
      breakdown: 'Toolbox key matched her pantry.'
    },
    reviews: []
  },
  {
    id: 'the-phantom-riviera',
    fileNumber: 'FILE #608-R',
    title: 'The Phantom Riviera',
    subtitle: 'A luxury yacht floating off the French Cote d’Azur becomes a gilded trap when a jewel thief and the captain both meet an untimely end.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
    price: 29.99,
    originalPrice: 34.99,
    difficulty: 'Seasoned',
    playerCount: '4–8 Players',
    minPlayers: 4,
    maxPlayers: 8,
    durationMinutes: '90–120 min',
    minDurationMinutes: 90,
    recommendedAge: '14+',
    setting: 'Yacht',
    style: 'Whodunit',
    tags: ['French Riviera', '1930s', 'Missing Jewels', 'High Society'],
    rating: 4.9,
    reviewCount: 38,
    premise: 'Anchored off Nice in the summer of 1934, the super-yacht "L’Etoile" hosted an exclusive midnight gala. By 2:00 AM, the host’s famous 50-carat Sapphire necklace had vanished, and Captain Antoine Bellerose was found lifeless at the helm with a poisoned compass needle.',
    settingDescription: 'French Riviera, July 1934. The glittering deck and teak staterooms of a luxury motor yacht on calm, dark waters.',
    whatsNeeded: [
      '4 to 8 players (1 host, 3-7 investigators)',
      '90 to 120 minutes of investigation time',
      'Yacht floor plan & guest logs'
    ],
    whatsIncluded: [
      'Yacht Deck Layout Diagram',
      '6 Character Dossiers & Confidential Motives',
      '10 Archival Riviera Clue Cards',
      'Interactive Passenger Log & Timeline'
    ],
    difficultyExplanation: 'Requires calculating ship speed, tides, and reading naval passenger manifests to spot who forged the logbook.',
    characters: [
      {
        id: 'char-camille',
        name: 'Camille Laurent',
        role: 'Glamorous Actress & Heiress',
        age: 28,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        background: 'Owner of the missing Blue Riviera Sapphire. Known for her theatrical personality and rising gambling debts in Monte Carlo.',
        relationships: 'Sister to Baron Philippe; former client of Captain Bellerose.',
        knownInfo: 'Was seen on the upper sun deck at 1:15 AM drinking champagne.',
        personalObjectives: [
          'Recover the Sapphire before news reaches Monte Carlo casino creditors',
          'Conceal your pawn shop receipts'
        ],
        secrets: 'The Sapphire was actually a costume glass replica—the real stone was sold six months ago!',
        privateClues: [
          'You saw Baron Philippe hiding a brass key under a potted palm at 1:45 AM.',
          'Captain Bellerose threatened to inform the press about your insurance scam.'
        ]
      },
      {
        id: 'char-philippe',
        name: 'Baron Philippe Laurent',
        role: 'Disgraced Aristocrat',
        age: 36,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
        background: 'Camille’s elder brother. Broke after several failed casino bets.',
        relationships: 'Brother to Camille; owes money to the harbor master.',
        knownInfo: 'Held the duplicate key to the captain’s navigation safe.',
        personalObjectives: [
          'Pin the captain’s murder on the onboard art collector',
          'Protect the secret of the forged insurance policy'
        ],
        secrets: 'Planted the poisoned compass pin to silence Captain Bellerose after Bellerose discovered Philippe was smuggling forged art.',
        privateClues: [
          'You obtained curare poison from a dockside apothecary in Marseilles two days ago.'
        ],
        isCulprit: true,
        culpritMotive: 'Captain Bellerose found Philippe’s forged cargo manifest exposing his illegal art smuggling syndicate.'
      }
    ],
    evidence: [
      {
        id: 'ev-yacht-01',
        number: 'EVIDENCE #201',
        title: 'Poisoned Brass Compass',
        type: 'Physical',
        foundAt: 'Yacht Wheelhouse Helm',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&auto=format&fit=crop&q=80',
        description: 'An antique brass marine compass. The north needle tip is coated with a sticky brown toxic residue (curare resin).',
        relatedSuspectIds: ['char-philippe'],
        relatedObjects: ['Curare Poison', 'Navigation Desk']
      },
      {
        id: 'ev-yacht-02',
        number: 'EVIDENCE #202',
        title: 'Forged Marseilles Shipping Manifest',
        type: 'Document',
        foundAt: 'Captain’s Locked Drawer',
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
        description: 'Shipping document detailing unrecorded crates marked "Antique Glassware" shipped under Baron Philippe’s signature.',
        transcription: 'Cargo: 4 Crates Renaissance Oils. Declared Value: 10,000 Francs. Actual Destination: Private Vault Genoa.',
        relatedSuspectIds: ['char-philippe', 'char-camille'],
        relatedObjects: ['Marseilles Apothecary']
      }
    ],
    timeline: [
      {
        id: 'tl-y1',
        timestamp: '12:30 AM',
        title: 'Sapphire Unveiling',
        description: 'Camille displays the Blue Riviera Sapphire in the main salon before guests.',
        location: 'Main Salon Deck',
        involvedSuspectIds: ['char-camille', 'char-philippe']
      },
      {
        id: 'tl-y2',
        timestamp: '1:15 AM',
        title: 'Heated Argument in Bridge',
        description: 'Shouting heard from the navigation bridge between Captain Bellerose and a male guest.',
        location: 'Navigation Bridge',
        involvedSuspectIds: ['char-philippe'],
        hasContradiction: true,
        contradictionNote: 'Philippe claimed he was sleeping in Stateroom #3, but dockhands saw him on the bridge ladder.'
      },
      {
        id: 'tl-y3',
        timestamp: '1:50 AM',
        title: 'Captain Found Unconscious',
        description: 'The first mate discovers Captain Bellerose collapsed over the ship’s wheel.',
        location: 'Wheelhouse',
        involvedSuspectIds: ['char-philippe', 'char-camille']
      }
    ],
    hints: [
      { id: 1, levelName: 'Gentle', text: 'Examine who visited Marseilles apothecary prior to boarding the yacht.' },
      { id: 2, levelName: 'Moderate', text: 'Cross-reference Baron Philippe’s stateroom alibi with the bridge ladder witness testimony.' },
      { id: 3, levelName: 'Strong', text: 'Baron Philippe poisoned the compass needle with curare to prevent Captain Bellerose from revealing his illegal art smuggling manifest.' }
    ],
    solution: {
      culpritId: 'char-philippe',
      culpritName: 'Baron Philippe Laurent',
      motive: 'Covering up an international art smuggling ring and extortion by the captain.',
      howItHappened: 'Philippe laced the tip of the compass needle with curare poison. When Captain Bellerose adjusted the course at 1:30 AM, the needle pricked his thumb, delivering a fatal dose.',
      keyEvidence: ['EVIDENCE #201 (Poisoned Compass)', 'EVIDENCE #202 (Forged Shipping Manifest)'],
      breakdown: 'A receipt from Marseilles apothecary found in Philippe’s jacket matched the curare sample on the compass needle.'
    },
    reviews: [
      {
        id: 'rev-y1',
        author: 'Lady Genevieve W.',
        rating: 5,
        date: 'December 10, 2025',
        title: 'Gilded age glamor meets tight logic puzzle!',
        comment: 'We played this with French wine and jazz in the background. The yacht setting was incredibly immersive.',
        verified: true,
        containsSpoilers: false
      }
    ]
  },
  {
    id: 'curse-of-blackwood-abbey',
    fileNumber: 'FILE #880-M',
    title: 'Curse of Blackwood Abbey',
    subtitle: 'Highland mists shroud an ancient abbey where a reclusive historian researching Celtic relics is found dead inside a locked stone tower.',
    coverImage: 'https://images.unsplash.com/photo-1548625361-181347071f0d?w=600&auto=format&fit=crop&q=80',
    price: 27.99,
    difficulty: 'Master Detective',
    playerCount: '5–9 Players',
    minPlayers: 5,
    maxPlayers: 9,
    durationMinutes: '120–150 min',
    minDurationMinutes: 120,
    recommendedAge: '15+',
    setting: 'Gothic Abbey',
    style: 'Locked Room Mystery',
    tags: ['Scottish Highlands', 'Gothic', 'Ancient Relics', 'Locked Room'],
    rating: 4.95,
    reviewCount: 62,
    premise: 'During a torrential thunder storm at the secluded 14th-century Blackwood Abbey in the Scottish Highlands, Dr. Archibald Vance was found slain in his 3rd-story study. The heavy oak door was bolted from the inside, and the iron-barred windows were untouched. How was the impossible crime committed?',
    settingDescription: 'Isle of Skye, Scotland 1926. A weather-beaten stone monastery with secret passageways and roaring fireplaces.',
    whatsNeeded: [
      '5 to 9 players',
      '2 to 2.5 hours',
      'Passageway map & blueprint diagrams'
    ],
    whatsIncluded: [
      'Abbey Architectural Blueprint',
      '7 Detailed Character Profiles',
      'Celtic Relic Artifact Index',
      'Locked-Room Mechanism Diagram'
    ],
    difficultyExplanation: 'Features a classic locked-room trick requiring spatial deduction and secret passage mechanism analysis.',
    characters: [
      {
        id: 'char-archibald-jr',
        name: 'Gavin Vance',
        role: 'Nephew & Antiquities Dealer',
        age: 31,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
        background: 'Estranged relative seeking funding for a private expedition to Egypt.',
        relationships: 'Nephew to Dr. Vance.',
        knownInfo: 'Understands ancient mechanical counterweight locks.',
        personalObjectives: ['Locate the hidden gold chalice before police arrive'],
        secrets: 'Owes thousands to a London syndicate.',
        privateClues: ['Knew about the hidden bell tower string pulley mechanism.']
      }
    ],
    evidence: [
      {
        id: 'ev-abbey-1',
        number: 'EVIDENCE #301',
        title: 'Snapped Bell Tower Cord',
        type: 'Physical',
        foundAt: 'Study Fireplace Chimney Flue',
        image: 'https://images.unsplash.com/photo-1548625361-181347071f0d?w=600&auto=format&fit=crop&q=80',
        description: 'Heavy waxed hemp twine routed through the chimney flue, used to slide the door bolt shut from the roof deck.',
        relatedSuspectIds: ['char-archibald-jr'],
        relatedObjects: ['Chimney Flue', 'Door Bolt']
      }
    ],
    timeline: [
      {
        id: 'tl-a1',
        timestamp: '10:15 PM',
        title: 'Thunderstrike & Lights Out',
        description: 'Lightning hits the abbey generator, plunging the halls into total darkness for 20 minutes.',
        location: 'Main Cloister',
        involvedSuspectIds: ['char-archibald-jr']
      }
    ],
    hints: [
      { id: 1, levelName: 'Gentle', text: 'Inspect the chimney flue routing in the abbey architectural blueprint.' }
    ],
    solution: {
      culpritId: 'char-archibald-jr',
      culpritName: 'Gavin Vance',
      motive: 'Inheriting the Celtic relic collection to settle London gambling debts.',
      howItHappened: 'Gavin used a waxed twine loop threaded up the chimney flue to slide the heavy oak bolt shut from the roof deck after escaping, creating the illusion of a sealed locked room.',
      keyEvidence: ['EVIDENCE #301 (Waxed Hemp Twine)'],
      breakdown: 'Wax residue matching Gavin’s climbing gloves was recovered inside the study chimney flue.'
    },
    reviews: []
  }
];
