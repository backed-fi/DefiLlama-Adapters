const axios = require('axios')
const sdk = require('@defillama/sdk');

const tokens = [
  {
    name: "bCSPX",
    address: "0x1e2c4fb7ede391d116e6b41cd0608260e8801d59",
    oracle_address: "0xf4e1b57fb228879d057ac5ae33973e8c53e4a0e0"
  },
  {
    name: "bCOIN",
    address: "0xbbcb0356bB9e6B3Faa5CbF9E5F36185d53403Ac9",
    oracle_address: null
  },
  {
    name: "bNIU",
    address: "0x2f11eeee0bf21e7661a22dbbbb9068f4ad191b86",
    oracle_address: null
  },
  {
    name: "bIB01",
    address: "0xCA30c93B02514f86d5C86a6e375E3A330B435Fb5",
    oracle_address: "0x32d1463eb53b73c095625719afa544d5426354cb"
  },
  {
    name: "bIBTA",
    address: "0x52d134c6DB5889FaD3542A09eAf7Aa90C0fdf9E4",
    oracle_address: "0xd27e6d02b72eb6fce04ad5690c419196b4ef2885"
  },
  {
    name: "bHIGH",
    address: "0x20C64dEE8FdA5269A78f2D5BDBa861CA1d83DF7a",
    oracle_address: "0x9E8E794ad6Ecdb6d5c7eaBE059D30E907F58859b"
  },
  {
    name: "bC3M",
    address: "0x2F123cF3F37CE3328CC9B5b8415f9EC5109b45e7",
    oracle_address: "0x83Ec02059F686E747392A22ddfED7833bA0d7cE3"
  }
]

// Working capital, cold wallet treasury
const EXCLUDE_ADDRESSES = ["0x5F7A4c11bde4f218f0025Ef444c369d838ffa2aD", "0x43624c744A4AF40754ab19b00b6f681Ca56F1E5b"]

async function tvl() {
  const rawData = await axios.get("http://localhost:3000/rest/token-statistics");
  const responseTokens = rawData.data.data.tokens;

  const balancesPerNetwork = {};

  // Iterate through the response tokens
  responseTokens.forEach(token => {
      // Map the token address based on its symbol
      const tokenAddress = tokens.find(t => t.name.toLowerCase() === token.symbol.toLowerCase())?.address;

      // If tokenAddress is not found, continue to the next iteration
      if (!tokenAddress) {
          return;
      }

      // Iterating through the deployments array for each token
      token.deployments.forEach(deployment => {
          // Ensure the network name is in lowercase
          const network = deployment.network.toLowerCase();

          // If the network is not already a key in the balancesPerNetwork object, create an empty dictionary for it
          if (!balancesPerNetwork[network]) {
              balancesPerNetwork[network] = {};
          }

          // Set the balance of the token for the network
          balancesPerNetwork[network][tokenAddress] = deployment.aum;
      });
  });

  return balancesPerNetwork;
}

let tvlPerNetwork;
(async () => {
  tvlPerNetwork = await tvl();
  console.log(tvlPerNetwork)
})();

module.exports = {
  timetravel: false,
  // misrepresentedTokens: true,
  ethereum: {
    tvl: async () => tvlPerNetwork['ethereum'],
  },
  polygon: {
    tvl: async () => tvlPerNetwork['polygon'],
  },
  // xdai: {
  //   tvl: chainTvl('gnosis'),
  // },
  // avax: {
  //   tvl: chainTvl('avalanche'),
  // },
  // fantom: {
  //   tvl: chainTvl('fantom'),
  // },
  // arbitrum: {
  //   tvl: chainTvl('arbitrum'),
  // },
  // bsc: {
  //   tvl // chainTvl('bsc'),
  // },
  // bsc: {
  //   chainTvl
  // },
  // base: {
  //   tvl: chainTvl('base'),
  // },
  methodology: `Backed finance offers tokenized securities onchain. Token balances are accumolated and multiplied by the price of the underlying asset.`,
};