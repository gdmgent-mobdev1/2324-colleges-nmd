(() => {
  // number
  const age: number = 31;
  // string
  const name: string = "Michael";
  // boolean
  const isTeacher: boolean = true;

  const showAge = (age: number) => {
    console.log(`Age is ${age}`);
  };

  showAge(age);

  // objects
  type Lector = {
    name: string;
    lastName: string;
    age: number;
    city: string;
    hobbies: string[];
  };

  const lector: Lector = {
    name: "Evelien",
    lastName: "Rutsaert",
    city: "Melle",
    age: 34,
    hobbies: ["boksen", "muurklimmen"],
  };

  const logPerson = (lector: Lector) => {
    console.log(`${lector.name} is ${lector.age} years old`);
  };

  logPerson(lector);
})();
