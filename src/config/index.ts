const serverAddress = process.env.REACT_APP_SERVER_API_ADDRESS;

const config = {
  serverAddress,
};

export const ensureDeclaredEnvVariables = () => {
  if (serverAddress === undefined) {
    throw new Error('Please define constant in .env file');
  }
};

export default config;
