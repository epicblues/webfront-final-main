let foo = 1; //전역 변수

const person = {
  name: "baka",
  hello: 1,
  func() {
    return "hello";
  },
};

console.log(Object.getOwnPropertyDescriptor(person, "func")); // 객체의 property attribute를 전달하는 PropertyDescriptor

const person2 = {
  // data property
  firstName: "Minsung",
  lastName: "Kim",

  // access property (외부에서는 .연산자로 접근/할당 하지만 실제로는 함수를 호출하는)
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(name) {
    [this.firstName, this.lastName] = name.split(" "); // 배열 destructuring
  },
};

console.log(person2.fullName); // getter 함수 호출
person2.fullName = "Na YoungJae"; // setter 함수 호출
console.log(person2.fullName);
