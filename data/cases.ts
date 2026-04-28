
import { CaseList } from '../types';

export const CASE_LISTS: CaseList[] = [
  {
    id: 'latin-puella-cases',
    year: 'Year 5',
    term: 'Spring',
    name: 'Latin: Puella Declension',
    description: 'Declension of the 1st declension noun "puella".',
    rootWord: 'girl',
    // Removed duplicate properties: year and term
    cases: [
      { id: 401, caseName: 'Nominative', latinSingular: 'puella', latinPlural: 'puellae' },
      { id: 402, caseName: 'Vocative', latinSingular: 'puella', latinPlural: 'puellae' },
      { id: 403, caseName: 'Accusative', latinSingular: 'puellam', latinPlural: 'puellas' },
      { id: 404, caseName: 'Genitive', latinSingular: 'puellae', latinPlural: 'puellarum' },
      { id: 405, caseName: 'Dative', latinSingular: 'puellae', latinPlural: 'puellis' },
      { id: 406, caseName: 'Ablative', latinSingular: 'puella', latinPlural: 'puellis' },
    ]
  },
  {
    id: 'latin-servus-cases',
    year: 'Year 5',
    term: 'Summer',
    name: 'Latin: Week 2 - Servus Declension',
    description: 'Declension of the 2nd declension noun "servus" (slave/servant).',
    rootWord: 'slave/servant',
    cases: [
      { id: 411, caseName: 'Nominative', latinSingular: 'servus', latinPlural: 'servi' },
      { id: 412, caseName: 'Vocative', latinSingular: 'serve', latinPlural: 'servi' },
      { id: 413, caseName: 'Accusative', latinSingular: 'servum', latinPlural: 'servos' },
      { id: 414, caseName: 'Genitive', latinSingular: 'servi', latinPlural: 'servorum' },
      { id: 415, caseName: 'Dative', latinSingular: 'servo', latinPlural: 'servis' },
      { id: 416, caseName: 'Ablative', latinSingular: 'servo', latinPlural: 'servis' },
    ]
  }
];