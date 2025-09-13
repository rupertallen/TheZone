
import { VerbList } from '../types';

export const VERB_LISTS: VerbList[] = [
  {
    id: 'latin-verbs-week6',
    name: 'Latin: Week 6 - Person and Number',
    description: 'Learn verb endings for person and number.',
    verbs: [
        { id: 1, person: '1st person', number: 'singular', latin: 'amo', english: 'I love / I am loving' },
        { id: 2, person: '2nd person', number: 'singular', latin: 'amas', english: 'You love / you are loving' },
        { id: 3, person: '3rd person', number: 'singular', latin: 'amat', english: 'He, she, it, loves / he, she, it is loving' },
        { id: 4, person: '1st person', number: 'plural', latin: 'amamus', english: 'We love / we are loving' },
        { id: 5, person: '2nd person', number: 'plural', latin: 'amatis', english: 'You love / you are loving' },
        { id: 6, person: '3rd person', number: 'plural', latin: 'amant', english: 'They love / they are loving' },
    ]
  }
];
