import { InfoModel } from "./Information.model";

export interface LocationResponseModel{
  results: LocationModel[];
  info: InfoModel;
}

export interface LocationModel {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: string[];
  url: string;
  created: string;
}
