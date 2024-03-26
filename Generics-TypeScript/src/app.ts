// const names: Array<string> = []; //string[] 과 같은 표기 => 제네릭 타입(다른 타입에 연결된 타입) 다른 타입이 무엇인지 명시되어 타입스크립트가 더 안정적으로 작동
// // names[0].split(' ');

// const promise: Promise<string> = new Promise((resolve, reject)=> {
//   setTimeout(()=>{
//     resolve(10);
//   }, 2000);
// });

// promise.then(data => {
//   data.split(' ');
// })

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}


const mergedObj = merge({name: 'Max', hobbies: ['Sports']}, {age: 25});
console.log(mergedObj);
// mergedObj.age;   //생성한 merge 함수로 병합한 객체의 프로퍼티에 접근할 수 없음 -> 타입스크립트는 객체 하나가 반환되는 것은 추론하나 모든 정보가 담겨있는 것은 아님

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string]{
  let descritionText = 'Got no value.';
  if (element.length === 1) {
    descritionText = 'Got 1 element.';
  } else if (element.length > 1) {
    descritionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descritionText];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['Sports', 'Cooking']));

function extractAndConvert<T extends Object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' +obj[key];
}

extractAndConvert({name: 'Max'}, 'name');

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {     // 해당하는 객체가 없는 경우 동작하지 않도록 막는 행위 추가
      return;
    }
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Manu');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

const objStorage = new DataStorage<Object>();  // 제네릭 타입에 객체가 들어가면 같은 형태의 객체더라도 주소 값이 달라서 제대로 동작하지 않는 문제가 발생
const maxObj = {name: 'Max'};                  // 객체를 추가해 같은 주소 값의 객체로 동작하도록 수정하는 방법이 유일  or 제네릭 클래스를 string number boolean으로 제한해서 해결할 수도 있음
objStorage.addItem(maxObj);
objStorage.addItem({name: 'Manu'});

objStorage.removeItem(maxObj);
console.log(objStorage.getItems());

// 유틸리티 타입 (Partial<> , Readonly<>)

interface CouresGoal {
  title: string;
  descrition: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string, 
  descrition: string, 
  date:Date
  ): CouresGoal {
  let courseGoal: Partial<CouresGoal> = {};    // Partial<> 타입은 모든 속성이 옵션이 되는 객체 타입으로 변경해줌
  courseGoal.title = title;
  courseGoal.descrition = descrition;
  courseGoal.completeUntil = date;
  return courseGoal as CouresGoal;
}

const names: Readonly<string[]> = ['Max', 'Anna'];  // Readonly<> 타입은 해당 데이터를 더 이상 변경할 수 없도록 함 (문자열에만 국한되지 않고 객체 등 가능)
// names.push('Manu');

