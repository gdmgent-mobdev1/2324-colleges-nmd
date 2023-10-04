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

  const lectors: Lector[] = [
    {
      name: "Evelien",
      lastName: "Rutsaert",
      city: "Melle",
      age: 34,
      hobbies: ["boksen", "muurklimmen"],
    },
    {
      name: "Dieter",
      lastName: "De Weirdt",
      city: "Zulte",
      age: 34,
      hobbies: ["webshops", "fietsen"],
    },
  ];

  type TravelDestination = {
    city: string;
    country: string;
    distance: number;
    coordinates: {
      lat: number;
      long: number;
    };
    rating: Rating;
    popularDish?: string;
  };

  enum Rating {
    Excellent = 5,
    Good = 4,
    Mediocre = 3,
    Bad = 2,
    Awful = 1,
  }

  const destination: TravelDestination = {
    city: "Sanaa",
    country: "Yemen",
    distance: 39399393,
    coordinates: {
      lat: 3.29292929,
      long: 55.4949494,
    },
    rating: Rating.Good,
  };

  destination.popularDish = "fattah";
})();
