type EstimateInput = Record<string, FormDataEntryValue>;

export const calculateEstimate = (
  data: EstimateInput,
  distancia: number = 0
): number => {
  const basePorTipo: Record<string, number> = {
    "Alimentos Perecíveis": 50,
    Medicamentos: 60,
    "Flores e Plantas": 45,
    "Produtos Químicos": 70,
    "Material Biológico": 65,
    "Eletrônicos Sensíveis": 65,
    Outros: 40,
  };

  const tarifaKm = 1.2;
  const tarifaKg = 0.75;
  const tarifaM3 = 10;

  const tiposSelecionados = Array.isArray(data["Tipo de Transporte"])
    ? data["Tipo de Transporte"]
    : String(data["Tipo de Transporte"]).split(",");

  const initial =
    tiposSelecionados.reduce((acc, tipo) => {
      const val = basePorTipo[tipo.trim()] || 40;
      return val > acc ? val : acc;
    }, 0) || 40;

  const peso = parseFloat(String(data["Peso"]).replace(",", ".")) || 0;
  const volume = parseFloat(String(data["Volume"]).replace(",", ".")) || 0;
  const refrigerado = String(data["Refrigerado"]).toLowerCase() === "sim";
  const emergency = String(data["Emergência"]).toLowerCase() === "sim";

  const base =
    initial + distancia * tarifaKm + peso * tarifaKg + volume * tarifaM3;

  const total = base * 1.15;

  const final =
    refrigerado && emergency
      ? total * 1.25
      : refrigerado
      ? total * 1.15
      : emergency
      ? total * 1.1
      : total;

  return Math.round(final * 100) / 100;
};
