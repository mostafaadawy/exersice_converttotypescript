Implicit Typing and Explicit Typing

TypeScript offers two types of typing:
Implicit Typing

TypeScript will automatically assume types of objects if the object is not typed. It is best practice to allow TypeScript to type immutable variables and simple functions implicitly.

const myNum = 3; // TypeScript implicitly types myNum as a number based on the variable

Implicit Typing is a best practice when the app is self-contained (meaning that it does not depend on other applications or APIs) or variables are immutable.
In Implicit Typing TypeScript assumes the type

Implicit Typing
Explicit Typing

The developer does explicit typing. The developer explicitly applies a type to the object.

let myVar: number = 3; // myVar has been explicitly typed as a number 

With Explicit Typing the Developer sets the type

Explicit Typing
Basic Types

string - used for string types, textual data

let studentName:string;
studentName = 'Dae Lee'

number - used for number types including integers and decimals

let studentAge: number;
studentAge = 10;

boolean - used for true/false types

let studentEnriched: boolean;
studentEnriched = true;

Union Types - used when more than one type can be used

let studentPhone: (number | string);
studentPhone = '(555) 555 - 5555';
studentPhone = 5555555555;

null - used when an object or variable is intentionally null, typically only functionally found in union types

const getCapitals = (str:string):string[] | null => {
  const capitals = str.match(/[A-Z]/);
  return capitals;
}

console.log(getCapitals('something'));
// returns null
console.log(getCapitals('Something'));
// returns ['S']

undefined - used when a variable has yet to be defined

const myFunc = (student: string | undefined) => {
  if ( student === undefined ){
    // do something
  } 
};

More Basic Types
void - used as a return type when the function returns nothing

const myFunc = (student: string): void {
  console.log(student);
};

never - used as a return type when the function will never return anything, such as with functions that throw errors or infinite loops

const myError = (err: string): never {
  throw new Error(err); 
}

any - should be avoided. Used when the type of the item being typed can be anything

const myFunc = (student: any): any => {
  // do something
};

unknown - used when the type of the thing being typed is unknown. Used heavily for type assertion

const myFunc = (student: unknown): string => {
  // do something
}

Type Assertions

Type Assertions are used to tell TypeScript that even though TypeScript thinks it should be one type, it is actually a different type. Common to see when a type is unknown

const myFunc = (student: unknown): string => {
  newStudent = student as string;
  return newStudent;
}

typeof

If you run into a situation where you have an ambiguous function, and you don't know exactly what it's doing, or you're working with a third-party library, and type definitions are missing, and you quickly want to access the type, one way of doing so is using typeof. This won't work for every type, such as null returning an object, but it will work for most.

console.log(typeof myFunc(param));

Object-Like Types

Arrays are critical data structures to JavaScript, so it makes sense that with TypeScript, there are multiple ways of creating them depending on the content that goes inside. TypeScript offers 2 ways of working with arrays and a third that can feel more like an array or an object depending on how it is used.

Array - to type as an array, use the type, followed by square brackets. Union types can be used to allow for multiple types in an array.

let arr: string[]; // only accepts strings
let arr2: (string | number)[]; // accepts strings or numbers

Tuple - tuples are not native to JavaScript. When you know exactly what data will be in the array, and you will not be adding to the array or modifying the type for any value, you can use a tuple.

let arr: [string, number, string]; // ['cat', 7, 'dog']

enum - enums are not native to JavaScript but are similar to enumeration used in other languages like C++ and Java. You use an enum when you have a constant set of values that will not be changed. By default, the values in an enum are also given a numeric value starting at 0. However, the numeric value can manually be set to any number explicitly or by calculation. Uses PascalCase to name the type.

enum Weekend {
  Friday,
  Saturday,
  Sunday
}

Working With Objects in TypeScript
Objects and Interfaces

Objects are easily created in JavaScript due to JavaScript's weak typing. With TypeScript, they take a bit more work. It is possible to create an object in TypeScript, but TypeScript offers better tools for doing so.

Object - creating an object requires defining the object before setting values. Once you have defined the object, additional properties cannot be added to the type definition, making it unhelpful when you need to add more properties after creation.

let student:{ name: string, age: number, enrolled: boolean} = {name: 'Maria', age: 10, enrolled: true};

interface - Interfaces are a concept not native to javascript, but similar concepts exist in other languages like Java, C++, and Python, where you create an abstract class as an interface for creating classes. With TypeScript, interfaces are simply used as the blueprint for the shape of something. Interfaces can be used to create functions but are most commonly seen to create objects.

Interfaces have the ability to be added too without the need to be extended. Meaning, if you have an interface, you can declare that interface a second time and add additional properties to it. This allows you to easily work with third-party interfaces that may need additional properties.

Use PascalCase for naming interfaces.

interface Student { 
  name: string, 
  age: number, 
  enrolled: boolean
};
let newStudent:Student = {name: 'Maria', age: 10, enrolled: true};

Duck Typing

Duck Typing is a programming concept that tests if an object meets the duck test: "If it walks like a duck and it quacks like a duck, then it must be a duck."

TypeScript uses duck typing for interfaces, meaning that even though you may say a function takes in an argument of interface A, if interface B has the same properties of A, it will also accept B. Interface A is the duck, and Interface B walks and quacks like a duck, so we'll accept it as a duck too.
Optional and Readonly Properties

Typescript gives the ability to create both optional and read-only properties when working with object-like data.

Optional - use when an object may or may not have a specific property by adding a ? at the end of the property name.

interface Student { 
  name: string, 
  age: number, 
  enrolled: boolean,
  phone?: number // phone becomes optional
};

readonly - use when a property should not be able to be modified after the object has been created. Keep in mind that this will only produce TypeScript errors and that the actual properties can still technically be changed as read-only does not exist in JavaScript. The closest thing in JavaScript is Object.freeze which will make all properties of the object unable to be modified.

interface Student { 
  name: string, 
  age: number, 
  enrolled: boolean,
  readonly id: number // id is readonly
};

Type Aliases, TypeScript Classes and Factory Functions
Type Aliases

Type aliases do not create a new type; they rename a type. Therefore, you can use it to type an object and give it a descriptive name. But like the object type, once a type alias is created, it can not be added to; it can only be extended. Meaning, if you wanted to create an object from a type alias and then a second with additional properties, you would need to extend the type alias and make your second object with the extended alias. This makes interfaces the preferred method for creating objects.

Type aliases become very useful when you would like a shorthand for something like a specific union type or a tuple with a specific meaning. For example, if I needed to create multiple arrays of coordinates, I could create a tuple that accepts 2 numbers, call it Coordinate and create multiple arrays of type Coordinate.

type Student = { 
  name: string; 
  age: number;
  enrolled: boolean;
};

let newStudent:Student = {name: 'Maria', age: 10, enrolled: true};

Classes

TypeScript classes look and behave very much like the classes introduced in ES6. A class in programming is made up of member variables and member functions/methods. The same goes for TypeScript, with the big difference being our variables (properties) are typed, as are the parameters and return types for our constructor and methods.

class Student {
  studentGrade: number;
  studentId: number;
  constructor(grade: number, id: number) {
    this.studentGrade = grade;
    this.studentId = id;
  }
}

Access Modifiers

The biggest addition to TypeScript classes is the addition of access modifiers. Access modifiers are used in most object-oriented programming languages to declare how accessible a variable should be.

public - by default, all properties of a TypeScript class are public, and it's commonplace to leave off the modifier to denote that it's public. Public properties can be accessed outside of the class.

private - private properties can only be accessed and modified from the class itself. TypeScript uses the keyword private, but you can also use the # symbol now available for privatizing fields in EcmaScript. Remember that private properties are only private in TypeScript; there are no true private properties in JavaScript classes, so a private property can still be changed if you ignore the error.

protected - protected properties can be accessed by the class itself and child classes.

class Student {
  protected studentGrade: number;
  private studentId: number;
  public constructor(grade: number, id: number) {
    this.studentGrade = grade;
    this.studentId = id;
  }
  id(){
    return this.studentId;
  }
}

class Graduate extends Student {
  studentMajor: string; // public by default
  public constructor(grade: number, id: number, major: string ){
      super(grade, id);
      this.studentId = id; // TypeScript Error: Property 'studentId' is private and only accessible within class 'Student'.
      this.studentGrade = grade; // Accessable because parent is protected
      this.studentMajor = major;
  }
}

const myStudent = new Graduate(3, 1234, 'computer science');

console.log(myStudent.id()); //  prints 1234
myStudent.studentId = 1235; // TypeScript Error: Property 'studentId' is private and only accessible within class 'Student'.
console.log(myStudent.id()); // prints 1235

Factory Functions

If Factory Functions remain your preferred way of creating JavaScript objects, they are still useable within TypeScript. To create a factory function with explicit typing, create an interface with the object's properties and methods and use the interface as the return type for the function.

interface Student {
  name: string;
  age: number
  greet(): void;
}

const studentFactory = (name: string, age: number): Student =>{ 
  const greet = ():void => console.log('hello'); 
  return { name, age, greet };
}

const myStudent = studentFactory('Hana', 16);

Further Reading

More information on working with classes and objects in TypeScript from SitePen. Advanced TypeScript 4.0 Concepts: Classes and Types.
New Terms
Term 	Definition
Access Modifier 	Used in classes to declare how a property or method can be accessed from the application
Duck typing 	A programming paradigm where if two or more structures (functions, interfaces, objects) have the same properties, they can be used interchangeably regardless of any type declarations
Enumerated type 	A set of constants that are automatically indexed and can be called by their name or index
Interface 	Used as a blueprint to declare the shape of something reuseable such as functions, objects, and classes
Tuple 	A data type of an array with a set number of values where all value types are known
;







To Complete This Exercise

    Convert all file extensions to .ts

    index.js // already done in workspace
    arrays.ts
    strings.ts
    numbers.ts

    Convert all CommonJS modules to ES6 modules index.ts

    import arrays from './utilities/arrays.js';
    import numbers from './utilities/numbers.js';
    import strings from './utilities/strings.js';

    arrays.ts

    export default {
    concatArr,
    addArr,
    lgNum,
    cut3,
    };

    numbers.ts

    export default {
    multiply,
    subtract,
    divide,
    sum,
    square
    };

    strings.ts

    export default {
    concat,
    capitalize,
    upperCase,
    lowerCase
    };

    Gather TypeScript errors:

    npm run build

    Explicitly type all functions in utilities folder paying close attention to the array file where the arrays take in both numbers and strings. (string | number)[]

    Fix the two issues in index.ts including myNum and using type assertion to type it as a number and adjust number 5 so that it can be multiplied. ('15' as unknown) as number

    Run npm run build again to assure there are no errors left.

Solution Code

index.ts

// NOTE: This code has not been converted to TypeScript yet
import arrays from './utilities/arrays.js';
import numbers from './utilities/numbers.js';
import strings from './utilities/strings.js';

const numArr = [3, 4, 5, 6];
const wordArr = ['cat', 'dog', 'rabbit', 'bird'];
const arrSum = arrays.addArr(numArr);
const mixArr = arrays.concatArr(numArr, wordArr);
const myNum = ('15' as unknown) as number % 2;
const five = parseInt('5');

// results of function calls
console.log(arrays.cut3(mixArr));
console.log(numbers.sum(arrSum, myNum)); 
console.log(strings.capitalize('the quick brown fox'));
console.log(numbers.multiply(five, 8));
console.log(arrays.lgNum(mixArr));

arrays.ts

// Concatenate two arrays

const concatArr = (arr1: (string | number)[], arr2: (string | number)[]): (string | number)[] => {
  return [...arr1, ...arr2];
};

// Add numbers in an array

const addArr = (arr: number[]): number => {
  let total = 0;
  arr.forEach((x) => {
    total += x;
  });
  return total;
};

// Find the largest number in an array
const lgNum = (arr: (string | number)[]): number => {
  let largest = 0 as number;
  arr.forEach((x) => {
    if (x > largest) {
      largest = x as number;
    }
  });
  return largest;
};

// Remove the 3rd item from an array
const cut3 = (arr: (string | number)[]): (string | number)[] => {
  arr.splice(2, 1);
  return arr;
};

export default {
  concatArr,
  addArr,
  lgNum,
  cut3,
};

numbers.ts

// multiply

const multiply = (num1: number, num2: number ): number  => {
    return num1 * num2;
};

// add
const sum = (num1: number , num2: number ): number  => {
    return num1 + num2;
};

// divide
const divide = (num1: number , num2: number ): number  => {
    return num1 / num2;
};

// subtract
const subtract = (num1: number , num2: number ): number  => {
    return num1 - num2;
};

// square
const square = (num: number ): number  => {
    return num * num;
};

export default {
    multiply,
    subtract,
    divide,
    sum,
    square
  };

strings.ts

const concat = (str1: string , str2: string): string =>{
    return str1 + str2;
};

const capitalize = (str: string): string => {
    const newStr = str.split(' ')
    .map(word => word[0].toUpperCase() + word.substr(1))
    .join(' ');
    return newStr;
};

const upperCase = (str: string): string => {
    return str.toUpperCase();
};

const lowerCase = (str: string): string => {
    return str.toLowerCase();
};

export default {
    concat,
    capitalize,
    upperCase,
    lowerCase
};

