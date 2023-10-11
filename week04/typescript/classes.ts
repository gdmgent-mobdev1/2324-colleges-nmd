class Animal {
  type: string;

  constructor(type: string) {
    this.type = type;
  }

  sayType() {
    console.log(`I am a ${this.type}`);
  }
}

const animal = new Animal("dog");
animal.sayType();

const animal2 = new Animal("penguin");
animal2.sayType();

console.log(animal2.type);
animal2.type = "Zebra";
animal2.sayType();
