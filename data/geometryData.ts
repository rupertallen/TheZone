
export interface GeometryLesson {
  id: string;
  category: 'Angles' | 'Symmetry' | 'Shapes';
  title: string;
  content: string;
  points: string[];
  visualId: string;
}

export interface GeometryQuestion {
  id: string;
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export const GEOMETRY_LESSONS: GeometryLesson[] = [
  {
    id: 'gl-01',
    category: 'Angles',
    title: 'Types of Angles',
    content: 'An angle measures the amount of turn between two lines meeting at a point called the vertex.',
    points: [
      'Acute: Less than 90°',
      'Right: Exactly 90°',
      'Obtuse: Between 90° and 180°',
      'Straight: Exactly 180°',
      'Reflex: More than 180°'
    ],
    visualId: 'angle-types'
  },
  {
    id: 'gl-02',
    category: 'Angles',
    title: 'Angles in Shapes',
    content: 'Shapes have rules about their internal angles that never change!',
    points: [
      'The angles in any triangle always add up to 180°.',
      'The angles in any quadrilateral (4-sided shape) add up to 360°.',
      'Angles on a straight line add up to 180°.',
      'Angles around a full point add up to 360°.'
    ],
    visualId: 'angle-sums'
  },
  {
    id: 'gl-03',
    category: 'Symmetry',
    title: 'Line Symmetry',
    content: 'A shape has line symmetry if one half is a mirror image of the other half.',
    points: [
      'A Square has 4 lines of symmetry.',
      'A Rectangle has 2 lines of symmetry.',
      'A Circle has infinite lines of symmetry!',
      'An Equilateral Triangle has 3 lines of symmetry.'
    ],
    visualId: 'line-symmetry'
  },
  {
    id: 'gl-04',
    category: 'Symmetry',
    title: 'Rotational Symmetry',
    content: 'Rotational symmetry is when a shape looks the same after being turned less than a full circle.',
    points: [
      'The "Order" is how many times it looks the same in one full 360° turn.',
      'A Square has rotational symmetry of order 4.',
      'An Equilateral Triangle has rotational symmetry of order 3.',
      'A non-square Rectangle has rotational symmetry of order 2.'
    ],
    visualId: 'rotational-symmetry'
  },
  {
    id: 'gl-05',
    category: 'Shapes',
    title: 'Triangles & Quadrilaterals',
    content: 'Shapes are classified by their sides and angles.',
    points: [
      'Equilateral: All sides equal, all angles 60°.',
      'Isosceles: Two sides equal, two angles equal.',
      'Scalene: No sides equal, no angles equal.',
      'Parallelogram: Opposite sides parallel and equal.',
      'Trapezium: Exactly one pair of parallel sides.'
    ],
    visualId: 'shape-types'
  }
];

export const GEOMETRY_QUESTIONS: GeometryQuestion[] = [
  {
    id: 'gq-01',
    question: 'What is an angle of 120° called?',
    options: ['Acute', 'Right', 'Obtuse', 'Reflex'],
    answer: 'Obtuse',
    explanation: 'Obtuse angles are larger than 90° but smaller than 180°.'
  },
  {
    id: 'gq-02',
    question: 'The angles in a triangle always add up to...',
    options: ['90°', '180°', '270°', '360°'],
    answer: '180°',
    explanation: 'No matter the size or shape of the triangle, its three internal angles always sum to 180°.'
  },
  {
    id: 'gq-03',
    question: 'How many lines of symmetry does a rectangle have?',
    options: ['1', '2', '4', 'Infinite'],
    answer: '2',
    explanation: 'A rectangle has two lines of symmetry: one horizontal and one vertical through the center.'
  },
  {
    id: 'gq-04',
    question: 'What is a triangle with two equal sides called?',
    options: ['Equilateral', 'Isosceles', 'Scalene', 'Right-angled'],
    answer: 'Isosceles',
    explanation: 'An isosceles triangle has two equal sides and two equal base angles.'
  },
  {
    id: 'gq-05',
    question: 'What is the sum of angles in a quadrilateral?',
    options: ['180°', '360°', '540°', '720°'],
    answer: '360°',
    explanation: 'A quadrilateral can be split into two triangles (180° each), so the total is 360°.'
  },
  {
    id: 'gq-06',
    question: 'Which shape has an infinite number of lines of symmetry?',
    options: ['Square', 'Hexagon', 'Circle', 'Oval'],
    answer: 'Circle',
    explanation: 'Any line passing through the center of a circle is a line of symmetry.'
  },
  {
    id: 'gq-07',
    question: 'What is the rotational symmetry order of an equilateral triangle?',
    options: ['1', '2', '3', '6'],
    answer: '3',
    explanation: 'It looks the same at 0°, 120°, and 240° turns.'
  },
  {
    id: 'gq-08',
    question: 'A right angle is exactly how many degrees?',
    options: ['45°', '90°', '180°', '360°'],
    answer: '90°',
    explanation: 'A right angle forms a "square corner" of exactly 90°.'
  }
];
