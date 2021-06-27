function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}

Person.prototype.getInfo = function () {
    return `Name:${this.name}\nAge:${this.age}\nSex:${this.sex}`
}


function Student(name, age, sex, id) {
    Person.call(this, name, age, sex)
    this.id = id;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.getStudentInfo = function () {
    const info = this.getInfo();
    return `${info}\nID:${this.id}`
}


const s1 = new Student('Per', 18, 'man', '9527');

console.log(s1.getInfo())
// Name:Per
// Age:18
// Sex:man

console.log(s1.getStudentInfo())
// Name:Per
// Age:18
// Sex:man
// ID:9527

console.log(s1 instanceof Student) // true
console.log(s1 instanceof Person) // true