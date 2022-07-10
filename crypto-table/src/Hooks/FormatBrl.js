const numberFormatBrl = (value) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumSignificantDigits: 10,
  }).format(value);

export default numberFormatBrl;
