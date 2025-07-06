// pages/api/coordinates.ts
import type { NextApiRequest, NextApiResponse } from "next";

type FullAddress = {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address: FullAddress = req.body;

  const queryParts = [
    address.street,
    address.neighborhood,
    address.city,
    address.state,
    address.postalCode,
    "Brasil",
  ];
  const query = encodeURIComponent(queryParts.filter(Boolean).join(", "));

  const apiKey = process.env.OPENCAGE_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  const url = `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&countrycode=br&language=pt&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results?.length) {
      return res.status(404).json({ error: "Address not found" });
    }

    const { lat, lng } = data.results[0].geometry;
    return res.status(200).json({ lat, lon: lng });
  } catch (err) {
    console.error("Erro ao buscar coordenadas:", err);
    return res.status(500).json({ error: "Fetch failed" });
  }
}
