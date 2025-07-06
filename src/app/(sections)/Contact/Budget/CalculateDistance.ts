type FullAddress = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
};

type Coordinates = { lat: number; lon: number };

const getCoordinatesFromServer = async (
  address: FullAddress
): Promise<Coordinates | null> => {
  try {
    const response = await fetch("/api/coordinates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });

    if (!response.ok) {
      console.error("Erro ao buscar coordenadas:", await response.text());
      return null;
    }

    const data = await response.json();
    return { lat: data.lat, lon: data.lon };
  } catch (err) {
    console.error("Erro ao buscar coordenadas do servidor:", err);
    return null;
  }
};

const haversineDistance = (
  coord1: Coordinates,
  coord2: Coordinates
): number => {
  const toRad = (value: number) => (value * Math.PI) / 180;

  const R = 6371;
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lon - coord1.lon);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

export const calculateDistanceByAddress = async (
  origin: FullAddress,
  destination: FullAddress
): Promise<number | null> => {
  const coord1 = await getCoordinatesFromServer(origin);
  const coord2 = await getCoordinatesFromServer(destination);

  if (!coord1 || !coord2) return null;

  return haversineDistance(coord1, coord2);
};
