
import { VerbList } from '../types';

export const VERB_LISTS: VerbList[] = [
  {
    id: 'latin-verbs-autumn-week6',
    year: 'Year 5',
    term: 'Autumn',
    name: 'Latin: Autumn - Person and Number',
    description: 'Learn verb endings for person and number (1st conjugation).',
    verbs: [
        { id: 1, person: '1st person', number: 'singular', latin: 'amo', english: 'I love / I am loving' },
        { id: 2, person: '2nd person', number: 'singular', latin: 'amas', english: 'You love / you are loving' },
        { id: 3, person: '3rd person', number: 'singular', latin: 'amat', english: 'He, she, it, loves / he, she, it is loving' },
        { id: 4, person: '1st person', number: 'plural', latin: 'amamus', english: 'We love / we are loving' },
        { id: 5, person: '2nd person', number: 'plural', latin: 'amatis', english: 'You love / you are loving' },
        { id: 6, person: '3rd person', number: 'plural', latin: 'amant', english: 'They love / they are loving' },
    ]
  },
  {
    id: 'latin-verbs-spring-week3-moneo',
    year: 'Year 5',
    term: 'Spring',
    name: 'Latin: Spring Week 3 - Moneo',
    description: 'Learn conjugation of moneo (2nd conjugation).',
    verbs: [
        { id: 201, person: '1st person', number: 'singular', latin: 'moneo', english: 'I warn' },
        { id: 202, person: '2nd person', number: 'singular', latin: 'mones', english: 'You (sg) warn' },
        { id: 203, person: '3rd person', number: 'singular', latin: 'monet', english: 'He/she/it warns' },
        { id: 204, person: '1st person', number: 'plural', latin: 'monemus', english: 'We warn' },
        { id: 205, person: '2nd person', number: 'plural', latin: 'monetis', english: 'You (pl) warn' },
        { id: 206, person: '3rd person', number: 'plural', latin: 'monent', english: 'They warn' },
    ]
  }
];
