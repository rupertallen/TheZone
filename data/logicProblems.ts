
export interface LogicProblem {
  id: string;
  title: string;
  question: string;
  answer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hint: string;
  explanation: string;
}

export const LOGIC_PROBLEMS: LogicProblem[] = [
  // --- EASY (1-35) ---
  {
    id: 'lp-01',
    title: 'The Snail Climb',
    question: 'A snail is at the bottom of a 5-meter well. Each day it climbs up 3 meters and each night it slides down 2 meters. How many days will it take to reach the top?',
    answer: '3',
    difficulty: 'Easy',
    hint: 'Think about what happens on the very last day.',
    explanation: 'On Day 1, it reaches 3m and slides to 1m. On Day 2, it reaches 4m and slides to 2m. On Day 3, it climbs 3m and reaches 5m - the top! It does not slide back because it is already out.'
  },
  {
    id: 'lp-02',
    title: 'Number Sequence',
    question: 'What is the next number in this sequence? 2, 4, 8, 16, 32, ...',
    answer: '64',
    difficulty: 'Easy',
    hint: 'Look at how each number relates to the one before it.',
    explanation: 'Each number is exactly double the previous one. 32 x 2 = 64.'
  },
  {
    id: 'lp-03',
    title: 'Fruit Math',
    question: 'If 3 apples cost $1.50, how much does 1 apple cost in cents?',
    answer: '50',
    difficulty: 'Easy',
    hint: 'Divide the total cost by the number of apples.',
    explanation: '$1.50 is 150 cents. 150 divided by 3 is 50 cents.'
  },
  {
    id: 'lp-04',
    title: 'The Farmer',
    question: 'A farmer has 17 sheep. All but 9 ran away. How many sheep are left?',
    answer: '9',
    difficulty: 'Easy',
    hint: 'Read the wording carefully.',
    explanation: '"All but 9" means only 9 stayed. So 9 are left.'
  },
  {
    id: 'lp-05',
    title: 'Leg Count',
    question: 'In a farmyard, there are some chickens and cows. There are 10 heads and 28 legs in total. How many cows are there?',
    answer: '4',
    difficulty: 'Easy',
    hint: 'Cows have 4 legs, chickens have 2.',
    explanation: 'If all were chickens, there would be 20 legs. The extra 8 legs must come from the 4 cows (since each cow adds 2 extra legs compared to a chicken).'
  },
  {
    id: 'lp-06',
    title: 'Weight Logic',
    question: 'Which is heavier: a kilogram of feathers or a kilogram of lead?',
    answer: 'neither',
    difficulty: 'Easy',
    hint: 'Compare the actual weights given.',
    explanation: 'Both weigh exactly one kilogram.'
  },
  {
    id: 'lp-07',
    title: 'Time Puzzle',
    question: 'If it takes 5 minutes to boil one egg, how many minutes does it take to boil 5 eggs in the same pot together?',
    answer: '5',
    difficulty: 'Easy',
    hint: 'The eggs are boiled simultaneously.',
    explanation: 'They all boil at the same time in the same water.'
  },
  {
    id: 'lp-26',
    title: 'Double Down',
    question: 'If a doctor gives you 3 pills and tells you to take one every half hour, how many minutes will the pills last?',
    answer: '60',
    difficulty: 'Easy',
    hint: 'When do you take the first pill?',
    explanation: 'You take the first at 0 mins, the second at 30 mins, and the third at 60 mins. Total time is 60 minutes.'
  },
  {
    id: 'lp-27',
    title: 'Halfway There',
    question: 'How many times can you subtract 10 from 100?',
    answer: '1',
    difficulty: 'Easy',
    hint: 'What happens after the first subtraction?',
    explanation: 'After you subtract 10 once, you are no longer subtracting from 100, you are subtracting from 90.'
  },
  {
    id: 'lp-28',
    title: 'Monthly Madness',
    question: 'How many months have 28 days?',
    answer: '12',
    difficulty: 'Easy',
    hint: 'Does February have 28 days? Do other months?',
    explanation: 'All 12 months have AT LEAST 28 days.'
  },
  {
    id: 'lp-29',
    title: 'The Taller Brother',
    question: 'James is taller than Kevin. Kevin is taller than Leo. Who is the tallest?',
    answer: 'james',
    difficulty: 'Easy',
    hint: 'Think about the order.',
    explanation: 'James > Kevin > Leo. James is at the top.'
  },
  {
    id: 'lp-30',
    title: 'Egg Count',
    question: 'A basket contains 5 eggs. If you take away 3, how many eggs do you HAVE?',
    answer: '3',
    difficulty: 'Easy',
    hint: 'Think about the word "have".',
    explanation: 'You took 3 eggs, so you have 3 eggs in your hand.'
  },
  {
    id: 'lp-31',
    title: 'Half of Eight',
    question: 'If you cut the number 8 in half vertically, what number do you get?',
    answer: '3',
    difficulty: 'Easy',
    hint: 'Imagine looking at the left or right half of the digit 8.',
    explanation: 'Cutting 8 vertically leaves two shapes that look like the number 3.'
  },
  {
    id: 'lp-32',
    title: 'Bus Driver',
    question: 'You are driving a bus. 10 people get on. At the next stop, 5 get off and 3 get on. What is the age of the bus driver?',
    answer: 'mine',
    difficulty: 'Easy',
    hint: 'Read the first sentence again.',
    explanation: '"YOU are driving the bus", so the age is your age!'
  },
  {
    id: 'lp-33',
    title: 'Seven Silly Strings',
    question: 'If you have 7 strings and you cut each one in half, how many pieces of string do you have?',
    answer: '14',
    difficulty: 'Easy',
    hint: 'Each string becomes two pieces.',
    explanation: '7 x 2 = 14.'
  },
  {
    id: 'lp-34',
    title: 'Zero Sum',
    question: 'What is 5 + 5 x 0 + 5?',
    answer: '10',
    difficulty: 'Easy',
    hint: 'Remember the order of operations (BODMAS/PEMDAS).',
    explanation: 'Multiplication comes first: 5 x 0 = 0. Then 5 + 0 + 5 = 10.'
  },
  {
    id: 'lp-35',
    title: 'Penny Wise',
    question: 'How many pennies are in a dozen?',
    answer: '12',
    difficulty: 'Easy',
    hint: 'What does "a dozen" mean?',
    explanation: 'A dozen always means twelve.'
  },

  // --- MEDIUM (8, 9-16, 36-70) ---
  {
    id: 'lp-08',
    title: 'Brother & Sister',
    question: 'A boy has as many sisters as brothers, but each sister has only half as many sisters as brothers. How many brothers are there?',
    answer: '4',
    difficulty: 'Medium',
    hint: 'Try testing small numbers. Start with 3 or 4 brothers.',
    explanation: 'There are 4 brothers and 3 sisters. A boy has 3 brothers and 3 sisters. A girl has 4 brothers and 2 sisters.'
  },
  {
    id: 'lp-09',
    title: 'Missing Number',
    question: 'Find the missing number: 1, 4, 9, 16, ?, 36',
    answer: '25',
    difficulty: 'Medium',
    hint: 'These are "square" numbers.',
    explanation: 'The sequence is 1x1, 2x2, 3x3, 4x4, 5x5, 6x6. 5x5 = 25.'
  },
  {
    id: 'lp-10',
    title: 'Water Lily',
    question: 'A water lily doubles in size every day. If it takes 30 days to cover a whole lake, on which day was the lake exactly half covered?',
    answer: '29',
    difficulty: 'Medium',
    hint: 'Work backwards from the 30th day.',
    explanation: 'If it doubles every day, then the day before it was full, it must have been half full.'
  },
  {
    id: 'lp-11',
    title: 'Shared Birthday',
    question: 'What is the minimum number of people needed in a room to guarantee that at least two of them were born in the same month?',
    answer: '13',
    difficulty: 'Medium',
    hint: 'How many months are in a year?',
    explanation: 'There are 12 months. With 13 people, even if the first 12 have different months, the 13th person must share a month with someone.'
  },
  {
    id: 'lp-12',
    title: 'Bridge Crossing',
    question: 'Three people need to cross a river in a boat that can only carry two people. How many trips across the river are needed to get everyone to the other side? (Each way counts as one trip)',
    answer: '3',
    difficulty: 'Medium',
    hint: 'Someone has to bring the boat back.',
    explanation: 'Trip 1: Two people go across. Trip 2: One person comes back. Trip 3: The last two people go across.'
  },
  {
    id: 'lp-13',
    title: 'Candle Math',
    question: 'You have 10 candles burning. A wind blows out 3. Later, the wind blows out another 2. Assuming no one relights them, how many candles will you have left the next morning?',
    answer: '5',
    difficulty: 'Medium',
    hint: 'What happens to candles that keep burning?',
    explanation: 'The 5 candles that were NOT blown out will melt away completely. Only the 5 that were blown out will remain.'
  },
  {
    id: 'lp-14',
    title: 'Double Trouble',
    question: 'A bat and a ball cost $1.10 in total. The bat costs $1.00 more than the ball. How many cents does the ball cost?',
    answer: '5',
    difficulty: 'Medium',
    hint: 'If the ball was 10 cents, the bat would be $1.10, total $1.20.',
    explanation: 'Ball = x, Bat = x + 100. x + x + 100 = 110. 2x = 10, so x = 5 cents.'
  },
  {
    id: 'lp-15',
    title: 'Dice Probability',
    question: 'If you roll a standard six-sided die, what is the probability (as a fraction like 1/2) of rolling a number greater than 4?',
    answer: '1/3',
    difficulty: 'Medium',
    hint: 'Which numbers on a die are greater than 4?',
    explanation: 'The numbers 5 and 6 are greater than 4. That is 2 out of 6 possibilities, which simplifies to 1/3.'
  },
  {
    id: 'lp-16',
    title: 'Age Gap',
    question: 'When I was 6 years old, my sister was half my age. Now I am 70. How old is my sister?',
    answer: '67',
    difficulty: 'Medium',
    hint: 'Does the age difference change over time?',
    explanation: 'When I was 6, she was 3. The difference is 3 years. So she is 70 - 3 = 67.'
  },
  {
    id: 'lp-36',
    title: 'Alphabet Order',
    question: 'What is the 10th letter of the alphabet?',
    answer: 'j',
    difficulty: 'Medium',
    // Added missing hint for lp-36
    hint: 'Count from A to J.',
    explanation: 'A(1), B(2), C(3), D(4), E(5), F(6), G(7), H(8), I(9), J(10).'
  },
  {
    id: 'lp-37',
    title: 'The Mirror Time',
    question: 'If a clock shows 3:00, what time would it show if you looked at its reflection in a mirror?',
    answer: '9:00',
    difficulty: 'Medium',
    hint: 'Imagine flipping the clock horizontally.',
    explanation: 'The 3 swaps with the 9 in a mirror reflection.'
  },
  {
    id: 'lp-38',
    title: 'Duck Walk',
    question: 'Two ducks are in front of a duck, two ducks are behind a duck, and one duck is in the middle. How many ducks are there in total?',
    answer: '3',
    difficulty: 'Medium',
    hint: 'Try arranging them in a line.',
    explanation: 'Three ducks in a row: 1st, 2nd, 3rd. 2nd is the middle. 1st has two behind (2nd, 3rd). 3rd has two in front (1st, 2nd).'
  },
  {
    id: 'lp-39',
    title: 'Triangle Sum',
    question: 'What is the sum of the interior angles of a triangle?',
    answer: '180',
    difficulty: 'Medium',
    hint: 'It is a well-known geometric fact.',
    explanation: 'The three angles of any triangle always add up to 180 degrees.'
  },
  {
    id: 'lp-40',
    title: 'Prime Time',
    question: 'What is the smallest prime number?',
    answer: '2',
    difficulty: 'Medium',
    hint: 'A prime number is only divisible by 1 and itself.',
    explanation: '1 is not considered prime. 2 is the first prime and the only even prime.'
  },
  {
    id: 'lp-41',
    title: 'Cake Cut',
    question: 'What is the minimum number of straight cuts needed to divide a round cake into 8 equal pieces?',
    answer: '4',
    difficulty: 'Medium',
    hint: 'Think about cutting it like a pizza.',
    explanation: 'Each cut through the center doubles the number of pieces. 1 cut = 2, 2 cuts = 4, 3 cuts = 6? No, 3 cuts through center = 6 pieces. To get 8, you need 4 cuts through the center.'
  },
  {
    id: 'lp-42',
    title: 'Speed Check',
    question: 'If a plane is flying at 500 mph and the wind is blowing against it at 50 mph, what is its actual speed over the ground?',
    answer: '450',
    difficulty: 'Medium',
    hint: 'Subtract the wind speed.',
    explanation: '500 - 50 = 450 mph.'
  },
  {
    id: 'lp-43',
    title: 'Bird Catch',
    question: 'If 5 birds can catch 5 flies in 5 minutes, how many minutes does it take 1 bird to catch 1 fly?',
    answer: '5',
    difficulty: 'Medium',
    hint: 'Think about the rate per bird.',
    explanation: 'Each bird catches one fly every 5 minutes.'
  },
  {
    id: 'lp-44',
    title: 'The Staircase',
    question: 'A building has 10 floors. Each floor has 20 stairs. How many stairs do you climb to get from the 1st floor to the 3rd floor?',
    answer: '40',
    difficulty: 'Medium',
    hint: 'How many flights of stairs are there between floors?',
    explanation: '1st to 2nd is one flight (20). 2nd to 3rd is another flight (20). Total 40.'
  },
  {
    id: 'lp-45',
    title: 'Leg Count 2',
    question: 'In a room, there are 5 stools with 3 legs each and 3 chairs with 4 legs each. How many legs are there in total (exclude humans)?',
    answer: '27',
    difficulty: 'Medium',
    // Added missing hint for lp-45
    hint: 'Calculate (5x3) + (3x4).',
    explanation: '(5 x 3) + (3 x 4) = 15 + 12 = 27.'
  },
  {
    id: 'lp-46',
    title: 'Reverse Name',
    question: 'If a name is spelt the same forwards and backwards, it is called a palindrome. Is the name "HANNAH" a palindrome?',
    answer: 'yes',
    difficulty: 'Medium',
    // Added missing hint for lp-46
    hint: 'Try spelling it backwards.',
    explanation: 'H-A-N-N-A-H backwards is H-A-N-N-A-H.'
  },
  {
    id: 'lp-47',
    title: 'The Centipede',
    question: 'A centipede has 50 pairs of legs. How many legs does it have in total?',
    answer: '100',
    difficulty: 'Medium',
    hint: 'A pair means two.',
    explanation: '50 x 2 = 100.'
  },
  {
    id: 'lp-48',
    title: 'Half a Dozen',
    question: 'If you have half a dozen donuts and you eat 2, how many do you have left?',
    answer: '4',
    difficulty: 'Medium',
    hint: 'How many is a dozen?',
    explanation: 'Half a dozen is 6. 6 - 2 = 4.'
  },
  {
    id: 'lp-49',
    title: 'Rectangle Area',
    question: 'A rectangle has a length of 8cm and a width that is half the length. What is its area in cm²?',
    answer: '32',
    difficulty: 'Medium',
    hint: 'Area = length x width.',
    explanation: 'Width = 4cm. Area = 8 x 4 = 32.'
  },
  {
    id: 'lp-50',
    title: 'The Coin Toss',
    question: 'If you toss a coin 3 times and it comes up Heads every time, what is the probability (as a fraction) that the next toss is Heads?',
    answer: '1/2',
    difficulty: 'Medium',
    hint: 'Do past tosses affect the future ones?',
    explanation: 'Every toss is independent. The probability is always 1/2.'
  },
  {
    id: 'lp-51',
    title: 'Days in a Leap Year',
    question: 'How many days are in a leap year?',
    answer: '366',
    difficulty: 'Medium',
    // Added missing hint for lp-51
    hint: 'It happens every four years and adds one day.',
    explanation: 'A normal year has 365. A leap year adds one day to February.'
  },
  {
    id: 'lp-52',
    title: 'Missing Logic',
    question: 'If 1=5, 2=25, 3=125, 4=625, then 5=?',
    answer: '1',
    difficulty: 'Medium',
    hint: 'Look at the first equation.',
    explanation: 'If 1=5, then 5=1 by simple equality.'
  },
  {
    id: 'lp-53',
    title: 'The Red House',
    question: 'A red house is made of red bricks, and a blue house is made of blue bricks. What is a greenhouse made of?',
    answer: 'glass',
    difficulty: 'Medium',
    hint: 'Think about where plants grow.',
    explanation: 'A greenhouse is a structure made of glass for growing plants.'
  },
  {
    id: 'lp-54',
    title: 'Brother\'s Age',
    question: 'I am 10 years old. My brother is half my age. When I am 20, how old will he be?',
    answer: '15',
    difficulty: 'Medium',
    hint: 'Think about the age gap.',
    explanation: 'He is 5 years younger than me. 20 - 5 = 15.'
  },
  {
    id: 'lp-55',
    title: 'String length',
    question: 'If you have a 10m piece of string and cut 1m off every minute, how long until you have 10 pieces of 1m?',
    answer: '9',
    difficulty: 'Medium',
    hint: 'What happens when you make the last cut?',
    explanation: 'The 9th cut creates both the 9th and 10th piece simultaneously.'
  },
  {
    id: 'lp-56',
    title: 'Side Count',
    question: 'How many sides does a hexagon have?',
    answer: '6',
    difficulty: 'Medium',
    // Added missing hint for lp-56
    hint: 'How many sides does a hexagonal stop sign have?',
    explanation: 'Hexa means six.'
  },
  {
    id: 'lp-57',
    title: 'Double Digit',
    question: 'What is the largest two-digit number?',
    answer: '99',
    difficulty: 'Medium',
    // Added missing hint for lp-57
    hint: 'It is one less than 100.',
    explanation: 'The next number is 100, which has three digits.'
  },
  {
    id: 'lp-58',
    title: 'Odd One Out',
    question: 'Which number is the odd one out: 1, 3, 5, 8, 9?',
    answer: '8',
    difficulty: 'Medium',
    hint: 'Think about even and odd numbers.',
    explanation: '8 is the only even number in the list.'
  },
  {
    id: 'lp-59',
    title: 'Clock Angles',
    question: 'What is the angle between the hands of a clock at 3:00?',
    answer: '90',
    difficulty: 'Medium',
    // Added missing hint for lp-59
    hint: 'Think about the fraction of a circle.',
    explanation: 'The hour hand is at 3 and the minute hand is at 12, forming a right angle.'
  },
  {
    id: 'lp-60',
    title: 'Penny Pile',
    question: 'If you double a penny every day for 5 days (starting with 1), how many pennies do you have on the 5th day?',
    answer: '16',
    difficulty: 'Medium',
    hint: 'Day 1: 1, Day 2: 2...',
    explanation: '1, 2, 4, 8, 16.'
  },
  {
    id: 'lp-61',
    title: 'Alphabet End',
    question: 'What letter is at the end of the "alphabet"?',
    answer: 't',
    difficulty: 'Medium',
    hint: 'Think about the word "alphabet" itself.',
    explanation: 'The last letter in the word "alphabet" is T.'
  },
  {
    id: 'lp-62',
    title: 'Square Sides',
    question: 'If a square has a perimeter of 24cm, what is the length of one side?',
    answer: '6',
    difficulty: 'Medium',
    // Added missing hint for lp-62
    hint: 'Divide the total perimeter by the four equal sides.',
    explanation: '24 / 4 sides = 6cm.'
  },
  {
    id: 'lp-63',
    title: 'Missing Letter',
    question: 'Which letter comes next? O, T, T, F, F, S, S, E, N, ...',
    answer: 't',
    difficulty: 'Medium',
    hint: 'One, Two, Three...',
    explanation: 'These are the first letters of the numbers 1-10. Next is Ten (T).'
  },
  {
    id: 'lp-64',
    title: 'Mirror Image',
    question: 'If you stand in front of a mirror and raise your right hand, which hand does your reflection raise?',
    answer: 'left',
    difficulty: 'Medium',
    // Added missing hint for lp-64
    hint: 'Mirrors switch directions.',
    explanation: 'A mirror reverses left and right.'
  },
  {
    id: 'lp-65',
    title: 'Odd Sequence',
    question: 'What is the next number: 1, 3, 6, 10, 15, ...',
    answer: '21',
    difficulty: 'Medium',
    hint: 'Look at the difference between numbers.',
    explanation: 'The differences are +2, +3, +4, +5. Next is +6. 15 + 6 = 21.'
  },
  {
    id: 'lp-66',
    title: 'The Library',
    question: 'A book has 100 pages. How many times does the digit 1 appear in the page numbers?',
    answer: '21',
    difficulty: 'Medium',
    hint: 'Don\'t forget page 100.',
    explanation: '1, 10, 11(2), 12, 13, 14, 15, 16, 17, 18, 19 (11 times). 21, 31, 41, 51, 61, 71, 81, 91 (8 times). 100 (1 time). Total = 11+8+1+1(for page 1) = 21. Let\'s recount: 1, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 31, 41, 51, 61, 71, 81, 91, 100. (1, 10, 11, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 31, 41, 51, 61, 71, 81, 91, 100). Yes, 21.'
  },
  {
    id: 'lp-67',
    title: 'Water Fill',
    question: 'A bucket is half full. You add 2 liters and it is now 3/4 full. How many liters can the bucket hold?',
    answer: '8',
    difficulty: 'Medium',
    hint: '3/4 - 1/2 = 1/4.',
    explanation: 'If 2 liters is 1/4 of the bucket, then the whole bucket is 2 x 4 = 8 liters.'
  },
  {
    id: 'lp-68',
    title: 'The Cube',
    question: 'How many faces does a cube have?',
    answer: '6',
    difficulty: 'Medium',
    // Added missing hint for lp-68
    hint: 'How many sides does a box have?',
    explanation: 'Think of a standard die.'
  },
  {
    id: 'lp-70',
    title: 'Word Play',
    question: 'If "CAT" is 3-1-20 in a code, what is "DOG"?',
    answer: '4-15-7',
    difficulty: 'Medium',
    hint: 'Use the alphabet positions.',
    explanation: 'D=4, O=15, G=7.'
  },
  {
    id: 'lp-69',
    title: 'Halfway point',
    question: 'If you walk 10 steps forward and 4 steps backward, how many steps are you from where you started?',
    answer: '6',
    difficulty: 'Medium',
    // Added missing hint for lp-69
    hint: 'Subtract the backward steps from the forward steps.',
    explanation: '10 - 4 = 6.'
  },

  // --- HARD (17-25, 71-100) ---
  {
    id: 'lp-17',
    title: 'Triangle Count',
    question: 'How many triangles are there in a square with both diagonals drawn?',
    answer: '8',
    difficulty: 'Hard',
    hint: 'Count small ones and larger ones made of two small ones.',
    explanation: 'There are 4 small triangles and 4 larger triangles (each made of two small ones sharing a side on a diagonal).'
  },
  {
    id: 'lp-18',
    title: 'The Cube Paint',
    question: 'A 3x3x3 cube is painted red on all outside surfaces. It is then cut into 27 small 1x1x1 cubes. How many small cubes have exactly two sides painted red?',
    answer: '12',
    difficulty: 'Hard',
    hint: 'Where are the cubes with two sides painted? (Edges, corners, or centers?)',
    explanation: 'Two sides are painted on the cubes along the edges, but not the corners. Each of the 12 edges has one such cube.'
  },
  {
    id: 'lp-19',
    title: 'Sum of 1 to 100',
    question: 'What is the sum of all integers from 1 to 100?',
    answer: '5050',
    difficulty: 'Hard',
    hint: 'Pair 1 with 100, 2 with 99, 3 with 98...',
    explanation: 'There are 50 pairs that each sum to 101. 50 x 101 = 5050.'
  },
  {
    id: 'lp-20',
    title: 'Halfway Point',
    question: 'A car travels from A to B at 30 mph and returns from B to A at 60 mph. What is the average speed for the entire round trip in mph?',
    answer: '40',
    difficulty: 'Hard',
    hint: 'It is not 45. Average speed is total distance divided by total time.',
    explanation: 'Assume distance is 60 miles. Trip there takes 2 hours. Trip back takes 1 hour. Total distance 120 miles / 3 hours = 40 mph.'
  },
  {
    id: 'lp-21',
    title: 'Sock Logic',
    question: 'In a dark room, you have 10 blue socks and 10 red socks. What is the minimum number of socks you must grab to be 100% sure you have a matching pair?',
    answer: '3',
    difficulty: 'Hard',
    hint: 'How many colors are there?',
    explanation: 'With 3 socks, you must have at least two of one color because there are only two colors.'
  },
  {
    id: 'lp-22',
    title: 'Divisibility Rule',
    question: 'What is the smallest number that is divisible by all integers from 1 to 10?',
    answer: '2520',
    difficulty: 'Hard',
    hint: 'Think about the Least Common Multiple (LCM).',
    explanation: 'The LCM of (1,2,3,4,5,6,7,8,9,10) is 2520.'
  },
  {
    id: 'lp-23',
    title: 'Handshake Puzzle',
    question: 'If there are 5 people in a room and everyone shakes hands with everyone else exactly once, how many handshakes occur in total?',
    answer: '10',
    difficulty: 'Hard',
    hint: 'Person 1 shakes 4 hands. Person 2 shakes 3 (already shook 1\'s hand)...',
    explanation: '4 + 3 + 2 + 1 = 10.'
  },
  {
    id: 'lp-24',
    title: 'Zeroes at the End',
    question: 'How many zeroes are at the end of the number 10! (10 factorial)?',
    answer: '2',
    difficulty: 'Hard',
    hint: 'Zeroes are formed by pairs of 2 and 5.',
    explanation: '10! = 10 x 9 x 8 x 7 x 6 x 5 x 4 x 3 x 2 x 1. There is a 5 in "5" and a 5 in "10". Plenty of 2s. So 2 zeroes.'
  },
  {
    id: 'lp-25',
    title: 'Digit Count',
    question: 'How many times does the digit 7 appear in the numbers from 1 to 100?',
    answer: '20',
    difficulty: 'Hard',
    hint: 'Count them in the units place and then in the tens place.',
    explanation: 'Units: 7, 17, 27, 37, 47, 57, 67, 77, 87, 97 (10 times). Tens: 70, 71, 72, 73, 74, 75, 76, 77, 78, 79 (10 times). 77 is counted twice. Total is 20.'
  },
  {
    id: 'lp-71',
    title: 'The Fence',
    question: 'If you have a 100-meter straight fence and place a post every 10 meters, how many posts do you need?',
    answer: '11',
    difficulty: 'Hard',
    hint: 'Think about both ends of the fence.',
    explanation: 'You need a post at 0m, 10m, ..., 100m. That is 11 posts.'
  },
  {
    id: 'lp-72',
    title: 'The Three Lightbulbs',
    question: 'Three switches are outside a closed room. Each controls one of three lightbulbs inside. You can flip switches but only enter the room once. How do you know which switch is which?',
    answer: 'heat',
    difficulty: 'Hard',
    hint: 'Lightbulbs get hot when they stay on.',
    explanation: 'Turn Switch 1 on for 5 mins, turn it off. Turn Switch 2 on. Enter room. Switch 2 is the glowing bulb. Switch 1 is the warm, off bulb. Switch 3 is the cold, off bulb.'
  },
  {
    id: 'lp-73',
    title: 'Missing Sequence',
    question: 'What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...',
    answer: '13',
    difficulty: 'Hard',
    hint: 'This is the Fibonacci sequence.',
    explanation: 'Each number is the sum of the two preceding it. 5 + 8 = 13.'
  },
  {
    id: 'lp-74',
    title: 'The Wolf and Sheep',
    question: 'A man must cross a river with a wolf, a goat, and a cabbage. The boat can only hold him and one item. If he leaves the wolf and goat, the wolf eats the goat. If he leaves the goat and cabbage, the goat eats the cabbage. What is the minimum number of trips across (one-way)?',
    answer: '7',
    difficulty: 'Hard',
    hint: 'He might have to bring something back.',
    explanation: '1: Man+Goat across. 2: Man back. 3: Man+Wolf across. 4: Man+Goat back. 5: Man+Cabbage across. 6: Man back. 7: Man+Goat across.'
  },
  {
    id: 'lp-75',
    title: 'Digital Clock',
    question: 'How many times in a 12-hour period does a digital clock show only the same digit (e.g., 1:11, 2:22)?',
    answer: '34',
    difficulty: 'Hard',
    hint: 'Think of 1:11, 2:22, up to 12:22? No, check each hour.',
    explanation: '1:11, 2:22, 3:33, 4:44, 5:55 (5). 11:11 (1). Also 10:00? No. Let\'s check: 1:11, 2:22, 3:33, 4:44, 5:55, 10:00 (no), 11:11, 12:22 (no). Wait, same digits: 1:11, 2:22, 3:33, 4:44, 5:55, 11:11. That is 6 per 12 hours? Let\'s check: 1:11, 2:22, 3:33, 4:44, 5:55, 11:11. 6 per 12 hours. Let\'s re-verify: 1:11, 2:22, 3:33, 4:44, 5:55, 11:11. (Maybe the question meant 1:11, 2:22... only digits that are the SAME. Yes, 6.)'
  },
  {
    id: 'lp-76',
    title: 'Sum of Odds',
    question: 'What is the sum of the first 10 odd numbers?',
    answer: '100',
    difficulty: 'Hard',
    hint: '1, 3, 5, 7...',
    explanation: 'The sum of the first N odd numbers is always N². 10² = 100.'
  },
  {
    id: 'lp-77',
    title: 'The Balance',
    question: 'You have 9 identical-looking coins, but one is slightly heavier. Using a balance scale, what is the minimum number of weighings to find the heavy coin?',
    answer: '2',
    difficulty: 'Hard',
    hint: 'Divide them into three groups of three.',
    explanation: 'Weigh 3 vs 3. If balanced, heavy is in the other 3. If not, it\'s in the heavier 3. From 3, weigh 1 vs 1. Done.'
  },
  {
    id: 'lp-78',
    title: 'Circle Area',
    question: 'If you double the radius of a circle, what happens to the area? (Answer "doubles" or "quadruples")',
    answer: 'quadruples',
    difficulty: 'Hard',
    hint: 'Area = πr².',
    explanation: 'Since r is squared, (2r)² = 4r². The area becomes 4 times larger.'
  },
  {
    id: 'lp-79',
    title: 'The Truth Teller',
    question: 'One twin always tells the truth, the other always lies. You come to a fork in the road and can ask one question to find the right path. What do you ask?',
    answer: 'other',
    difficulty: 'Hard',
    hint: 'Think about what both would say about the other.',
    explanation: 'Ask "Which way would your brother say is the right path?". Both will point to the WRONG path. So you take the other one.'
  },
  {
    id: 'lp-80',
    title: 'Square Count',
    question: 'How many squares are on a standard 8x8 chessboard?',
    answer: '204',
    difficulty: 'Hard',
    hint: 'Don\'t forget 2x2, 3x3, and the 8x8 square itself.',
    explanation: '1² + 2² + 3² + 4² + 5² + 6² + 7² + 8² = 204.'
  },
  {
    id: 'lp-81',
    title: 'The Rope Ladder',
    question: 'A rope ladder hangs over the side of a boat. The bottom rung is just touching the water. Rungs are 20cm apart. If the tide rises 60cm, how many rungs will be underwater?',
    answer: '0',
    difficulty: 'Hard',
    hint: 'Boats float.',
    explanation: 'As the tide rises, the boat and the ladder rise with it.'
  },
  {
    id: 'lp-82',
    title: 'Digits in 1000',
    question: 'How many zeroes are there between 1 and 1000?',
    answer: '192',
    difficulty: 'Hard',
    // Added missing hint for lp-82
    hint: 'Count zeroes in each range: 10-90, 100-999, and 1000.',
    explanation: '10-90 (9), 100-199 (20), 200-299 (20), ..., 900-999 (20). Total so far: 9 + (9*20) = 189. Plus 1000 has three: 189 + 3 = 192.'
  },
  {
    id: 'lp-83',
    title: 'The Cube View',
    question: 'How many vertices (corners) does a cube have?',
    answer: '8',
    difficulty: 'Hard',
    // Added missing hint for lp-83
    hint: 'Count the corners of a square and double it for a cube.',
    explanation: '4 on top, 4 on the bottom.'
  },
  {
    id: 'lp-84',
    title: 'The Hat Puzzle',
    question: 'Three hats are red and two are blue. Three people stand in a line, each can only see the people in front of them. The last person says "I don\'t know my hat color". The middle says "I don\'t know my hat color". The first person says "I know my color!". What color is it?',
    answer: 'red',
    difficulty: 'Hard',
    hint: 'If both in front were blue, the last person would know they were red.',
    explanation: 'If the first two were blue, 3rd would know he is red. Since 3rd doesn\'t know, 1st and 2nd aren\'t both blue. If 1st was blue, 2nd would see it and know he must be red (because if he were also blue, 3rd would have known). Since 2nd doesn\'t know, 1st must be red.'
  },
  {
    id: 'lp-85',
    title: 'Age Logic 2',
    question: 'A mother is 40 and her son is 10. In how many years will the mother be exactly twice as old as her son?',
    answer: '20',
    difficulty: 'Hard',
    hint: '40 + x = 2(10 + x).',
    explanation: '40 + 20 = 60. 10 + 20 = 30. 60 is twice 30.'
  },
  {
    id: 'lp-86',
    title: 'Number of Segments',
    question: 'How many line segments are needed to draw a square with its two diagonals?',
    answer: '6',
    difficulty: 'Hard',
    // Added missing hint for lp-86
    hint: 'Count the outline and the internal crossing lines.',
    explanation: '4 sides + 2 diagonals = 6 segments.'
  },
  {
    id: 'lp-87',
    title: 'Perfect Square',
    question: 'What is the smallest three-digit perfect square?',
    answer: '100',
    difficulty: 'Hard',
    // Added missing hint for lp-87
    hint: 'What is 10 times 10?',
    explanation: '10 x 10 = 100.'
  },
  {
    id: 'lp-88',
    title: 'The River crossing 2',
    question: 'A boat can carry 200kg. A father (100kg) and two sons (50kg each) need to cross. What is the minimum number of one-way trips?',
    answer: '5',
    difficulty: 'Hard',
    hint: 'The sons can go together.',
    explanation: '1: Both sons go across. 2: One son back. 3: Father goes across. 4: Other son back. 5: Both sons go across.'
  },
  {
    id: 'lp-89',
    title: 'The Average',
    question: 'The average of three numbers is 10. If two of the numbers are 5 and 10, what is the third number?',
    answer: '15',
    difficulty: 'Hard',
    hint: 'Sum / 3 = 10.',
    explanation: 'Sum must be 30. 5 + 10 = 15. 30 - 15 = 15.'
  },
  {
    id: 'lp-90',
    title: 'Clock Strike',
    question: 'A clock takes 6 seconds to strike 6:00. How many seconds does it take to strike 12:00?',
    answer: '13.2',
    difficulty: 'Hard',
    hint: 'Strikes are separated by intervals. 6 strikes have 5 intervals.',
    explanation: '5 intervals take 6 seconds, so each interval is 1.2s. 12 strikes have 11 intervals. 11 x 1.2 = 13.2 seconds.'
  },
  {
    id: 'lp-91',
    title: 'The Password',
    question: 'If 472 is "A", 915 is "B", and 638 is "C", what is 274?',
    answer: 'A',
    difficulty: 'Hard',
    hint: 'Look at the digits, not the value.',
    explanation: 'The digits are just rearranged. 274 has the same digits as 472.'
  },
  {
    id: 'lp-92',
    title: 'Cube Surface',
    question: 'If the side of a cube is 2cm, what is its total surface area in cm²?',
    answer: '24',
    difficulty: 'Hard',
    hint: 'A cube has 6 faces.',
    explanation: 'Area of one face = 2 x 2 = 4. 4 x 6 faces = 24.'
  },
  {
    id: 'lp-93',
    title: 'Probability 2',
    question: 'You roll two dice. What is the most likely sum?',
    answer: '7',
    difficulty: 'Hard',
    hint: 'Which sum has the most combinations?',
    explanation: 'There are 6 ways to get 7 (1-6, 2-5, 3-4, 4-3, 5-2, 6-1), more than any other sum.'
  },
  {
    id: 'lp-94',
    title: 'Prime Count',
    question: 'How many prime numbers are between 1 and 10?',
    answer: '4',
    difficulty: 'Hard',
    // Added missing hint for lp-94
    hint: 'List numbers 1-10 and check if they have only two factors.',
    explanation: 'The prime numbers are 2, 3, 5, 7.'
  },
  {
    id: 'lp-95',
    title: 'Half of Half',
    question: 'What is half of half of half of 80?',
    answer: '10',
    difficulty: 'Hard',
    // Added missing hint for lp-95
    hint: 'Divide 80 by 2, then divide that by 2, then divide again.',
    explanation: '80 -> 40 -> 20 -> 10.'
  },
  {
    id: 'lp-96',
    title: 'Digit Product',
    question: 'What is the product of all the digits on a standard telephone keypad?',
    answer: '0',
    difficulty: 'Hard',
    hint: 'Include the zero.',
    explanation: 'Anything multiplied by zero is zero.'
  },
  {
    id: 'lp-97',
    title: 'The Staircase 2',
    question: 'If you go up 5 steps, down 2, up 4, and down 1, which step are you on?',
    answer: '6',
    difficulty: 'Hard',
    // Added missing hint for lp-97
    hint: 'Track your position starting from zero.',
    explanation: '5 - 2 + 4 - 1 = 6.'
  },
  {
    id: 'lp-98',
    title: 'The Box',
    question: 'A box has 10 red balls and 10 blue balls. What is the minimum number you must pick to ensure you have two balls of the same color?',
    answer: '3',
    difficulty: 'Hard',
    // Added missing hint for lp-98
    hint: 'What happens if you pick one of each color first?',
    explanation: 'With 3 balls, you must have at least two of the same color.'
  },
  {
    id: 'lp-99',
    title: 'The Year',
    question: 'Which year was 100 years before 2024?',
    answer: '1924',
    difficulty: 'Hard',
    // Added missing hint for lp-99
    hint: 'Subtract 100 from 2024.',
    explanation: '2024 - 100 = 1924.'
  },
  {
    id: 'lp-100',
    title: 'The Century',
    question: 'How many years are in 10 centuries?',
    answer: '1000',
    difficulty: 'Hard',
    // Added missing hint for lp-100
    hint: 'One century is 100 years.',
    explanation: 'A century is 100 years. 10 x 100 = 1000.'
  }
];
