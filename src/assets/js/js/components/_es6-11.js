console.log("BBBBBBBBBBBBBBB");
const student = { name: 'Anna', level: 3, };
const { name, level } = student;
console.log(name, level);

const colors = ['red', 'white', 'yellow']
const [first, second, third] = colors; // const이름은 뭐든 가능한듯...
console.log(first, second, third);
// 원하는 곳만 할당이 가능하다
const [ , second2] = colors;
console.log(second2); // white

const arr = [1,2,3,4,5];
const [a, ...b] = arr;
const [, , ...c] = arr;

console.log(a, b); // 1 [ 2, 3, 4, 5 ]
console.log(c); // [ 3, 4, 5 ]

const pageNumber = 1; const pageSize = 10;
// 기존
console.log('현재 페이지 번호는: ' + pageNumber + ' 이고 페이지 사이즈는: ' + pageSize + '입니다.');
// Template Literals
console.log(`현재 페이지 번호는: ${pageNumber} 이고 페이지 사이지는: ${pageSize} 입니다.`);


// 값이 할당 되여 있으면 출력 없으면 뒤에 출력 null undefined
// ex1)
const name2 = '';
const userName = name2 ?? 'Guest';
console.log(userName);
// ex2)
const num = 0;
const message = num ?? 'undefined';
console.log(message);

const num2 = null;
const message2 = num2 ?? 'undefined222222';
console.log(message2);