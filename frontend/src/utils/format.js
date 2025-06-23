export const formatCaracteristica = (caracteristicaBackend) => {
  return caracteristicaBackend
    .toLowerCase()
    .split('_')
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

export const formatMoneda = (moneda) => {
  const monedas = {
    'PESO_ARG': 'ARS',
    'DOLAR_USA': 'USD',
    'REALES': 'BRL'
  };
  return monedas[moneda] || moneda;
};