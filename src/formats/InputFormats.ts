import { ChangeEvent } from "react";

type Setter = (value: string) => void;

export const formatNumber = (e: ChangeEvent<HTMLInputElement>, set: Setter) => {
  let val = e.target.value.replace(/\D/g, "");

  if (val.length > 10) {
    val = val.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
  } else if (val.length > 6) {
    val = val.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else if (val.length > 2) {
    val = val.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else if (val.length > 0) {
    val = val.replace(/^(\d{0,2})/, "($1");
  }

  set(val);
};

export const formatCPF = (e: ChangeEvent<HTMLInputElement>, set: Setter) => {
  let val = e.target.value.replace(/\D/g, "");

  val = val.replace(/^(\d{3})(\d)/, "$1.$2");
  val = val.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  val = val.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  set(val.slice(0, 14)); // Limita ao máximo do CPF formatado
};

export const formatCNPJ = (e: ChangeEvent<HTMLInputElement>, set: Setter) => {
  let val = e.target.value.replace(/\D/g, "");

  val = val.replace(/^(\d{2})(\d)/, "$1.$2");
  val = val.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  val = val.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4");
  val = val.replace(
    /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/,
    "$1.$2.$3/$4-$5"
  );

  set(val.slice(0, 18));
};

export const formatCEP = (e: ChangeEvent<HTMLInputElement>, set: Setter) => {
  let val = e.target.value.replace(/\D/g, "");

  val = val.replace(/^(\d{5})(\d)/, "$1-$2");

  set(val.slice(0, 9));
};

export const formatCurrency = (
  e: ChangeEvent<HTMLInputElement>,
  set: Setter
) => {
  let val = e.target.value.replace(/\D/g, "");

  if (!val) {
    set("");
    return;
  }

  val = (parseInt(val, 10) / 100).toFixed(2) + "";
  val = val.replace(".", ",");
  val = val.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

  set(`R$ ${val}`);
};
