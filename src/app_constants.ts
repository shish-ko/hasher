const isProdMode = process.env.NODE_ENV === 'production';
const SERVER_URL = isProdMode ? 'https://secret-server-srv.onrender.com/' : 'http://localhost:3000/';
const SERVER_ASSETS = SERVER_URL + 'public/';
const SECOND = 1000;
const LOADER_COLOR = '#00BBEC';
const TEST_TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDcxNjg5MDQsImV4cCI6MTczODcwNDkwNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMyIsIm5hbWUiOiJRd2VyIn0.R-PYGtD5IWrRVr_nwjtIUyb0aEcaM6yUkIa6-H9dmRI';
const FIVE_MINUTES = 300000;
const ONE_HOUR= 3600000;

export {SERVER_URL, SECOND, LOADER_COLOR, TEST_TOKEN, SERVER_ASSETS, FIVE_MINUTES, ONE_HOUR};
