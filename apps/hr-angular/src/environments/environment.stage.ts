export const environment = {
  production: true,
  config: {
    dateFormat: 'dd/MM/yyyy',
    timeFormatLong: 'hh:mm:ss',
    timeFormatShort: 'hh:mm',
  },
  appsUrl: {
    baseUrl: 'https://apiapp-dev-erp-hr-wapel.azurewebsites.net/api/',
    mainUrl: 'https://apiapp-dev-erp-hr-wapel.azurewebsites.net',
    nodeUrl: 'http://localhost:3001',
  },
  socketServer: { url: 'http://localhost:3001' },
};
