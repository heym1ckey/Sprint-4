import './styles/index.css';
// теперь картинки можно импортировать,
// вебпак добавит в переменные правильные пути
import jordanImage from './images/jordan.jpg';
import jamesImage from './images/james.jpg';
import bryantImage from './images/bryant.jpg';

const whoIsTheGoat = [
  // меняем исходные пути на переменные
  { name: 'Michael Jordan', link: jordanImage },
  { name: 'Lebron James', link: jamesImage },
  { name: 'Kobe Bryant', link: bryantImage },
]; 

console.log("Hello World!");

const numbers = [2, 3, 5];

const doubledNumbers = numbers.map((number) => number * 2);

console.log(doubledNumbers);
