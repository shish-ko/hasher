const isProdMode = process.env.NODE_ENV === 'production';
const SERVER_URL = isProdMode ? 'https://secret-server-srv.onrender.com/' : 'http://localhost:3000/';
const SERVER_ASSETS = SERVER_URL + 'public/';
const SECOND = 1000;
const LOADER_COLOR = '#00BBEC';
const TEST_TOKEN ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDcxNjg5MDQsImV4cCI6MTczODcwNDkwNCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsImlkIjoiMyIsIm5hbWUiOiJRd2VyIn0.R-PYGtD5IWrRVr_nwjtIUyb0aEcaM6yUkIa6-H9dmRI';
const ONE_MINUTE = 60000;
const ONE_HOUR= 3600000;
const TWENTY_FIFE_MB=25000000;
const INITIAL_NAME = 'Anonymous';

export {SERVER_URL, SECOND, LOADER_COLOR, TEST_TOKEN, SERVER_ASSETS, ONE_HOUR, TWENTY_FIFE_MB, ONE_MINUTE, INITIAL_NAME};
