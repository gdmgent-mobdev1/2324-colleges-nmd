export type PokeType = {
  name: string;
  url: string;
};

export type Pokemon = {
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  order: number;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  types: {
    slot: number;
    type: PokeType;
  }[];
};
