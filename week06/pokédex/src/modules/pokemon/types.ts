export type PokeType = {
  name: string;
  url: string;
};

export type Sprite = {
  front_default: string;
};

export type SpriteSet = {
  [key: string]: Sprite;
};

export type Pokemon = {
  name: string;
  weight: number;
  height: number;
  base_experience: number;
  order: number;
  sprites: Sprite & {
    other: SpriteSet;
  };
  types: {
    slot: number;
    type: PokeType;
  }[];
};
