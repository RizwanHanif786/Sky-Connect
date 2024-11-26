import { Data } from "../types/types";

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export const getFormattedDuration = (durationInMinutes: number) => {
  return `${Math.floor(durationInMinutes / 60)} hr ${
    durationInMinutes % 60
  } min`;
};

export const getFormattedTime = (time: string) => {
  return new Date(time).toLocaleTimeString();
}

export const getFormattedFlights = (flights: Data[]) => {
  if(flights?.length === 0) return [];

 return flights?.map((flight) => {
    return {
      duration: getFormattedDuration(flight?.legs?.[0]?.durationInMinutes),
      price: flight?.price?.formatted,
      departure: getFormattedTime(flight?.legs?.[0]?.departure),
      arrival: getFormattedTime(flight?.legs?.[0]?.arrival),
      origin: flight?.legs?.[0]?.origin?.name,
      destination: flight?.legs?.[0]?.destination?.name,
      stops: flight?.legs?.[0]?.segments?.length - 1,
    };
  });
};
