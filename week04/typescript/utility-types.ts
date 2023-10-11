// partial
type Computer = {
  model: string;
  readonly brand: string;
  ram: number;
  cpu: string;
  weight: number;
};

const laptop: Partial<Computer> = {
  brand: "Dell",
};
// niet aanpasbaar
// laptop.brand = "d";

const laptop2: Omit<Computer, "weight"> = {
  model: "test",
  brand: "test",
  ram: 48,
  cpu: "test",
};
