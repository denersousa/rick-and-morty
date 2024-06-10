import { InfoModel } from "../../shared/models/Information.model";

export interface EpisodeResponseModel{
  results: EpisodeModel[];
  info: InfoModel;
}

export interface EpisodeModel {
  id: number;
  name: string;
  airDate: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}
