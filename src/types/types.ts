export type Data = {
  [key: string]: any;
};

export type PassengerType = 'adults' | 'children' | 'infants'

export interface FlightsParams {
  date?: string;
  returnDate?: string;
  originSkyId?: string;
  originEntityId?: string;
  destinationSkyId?: string;
  destinationEntityId?: string;
  cabinClass?: string;
  [key: string]: any;
}