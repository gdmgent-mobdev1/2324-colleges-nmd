(() => {
  type People = {
    name: string;
    age: number;
  };

  const people: People[] = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 25 },
  ];

  const filterByProperty = <T extends Object>(
    array: T[],
    property: string,
    value: string | boolean | number | null
  ): T[] => {
    return array.filter((item) => {
      return item[property] === value;
    });
  };

  const filteredPeople = filterByProperty(people, "age", 25);
  console.log(filteredPeople);

  type List<T> = {
    items: T[];
  };

  const list: List<number> = {
    items: [3, 5],
  };
  const list2: List<People> = {
    items: people,
  };
})();
