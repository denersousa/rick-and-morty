import { InfoModel } from "../../shared/models/Information.model";

export interface CharacterResponseModel {
  results: CharacterModel[];
  info: InfoModel;
}

export interface CharacterModel {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: OriginModel;
  location: LocationModel;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface OriginModel {
  name: string;
  url: string;
}

export interface LocationModel {
  name: string;
  url: string;
}
