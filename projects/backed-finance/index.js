

const bCSPX = '0x1e2c4fb7ede391d116e6b41cd0608260e8801d59'
const bCOIN = '0xbbcb0356bB9e6B3Faa5CbF9E5F36185d53403Ac9'
const bNIU = '0x2f11eeee0bf21e7661a22dbbbb9068f4ad191b86'
const bIB01 = '0xCA30c93B02514f86d5C86a6e375E3A330B435Fb5'
const bIBTA = '0x52d134c6DB5889FaD3542A09eAf7Aa90C0fdf9E4'
const bHIGH = '0x20C64dEE8FdA5269A78f2D5BDBa861CA1d83DF7a'
const bC3M = '0x2F123cF3F37CE3328CC9B5b8415f9EC5109b45e7'


module.exports = {
    timetravel: false,
    ethereum: {
      tvl: chainTvl('ethereum', [DFI_ADDRESS]),
    },
    gnosis: {
        tvl: chainTvl('gnosis', [DFI_ADDRESS]),
    },
    polygon: {
      tvl: chainTvl('polygon', [PECO_ADDRESS]),
    },
    avalanche: {
        tvl: chainTvl('avalanche', [PECO_ADDRESS]),
    },
    fantom: {
        tvl: chainTvl('fantom', [PECO_ADDRESS]),
    },
    arbitrum: {
        tvl: chainTvl('arbitrum', [PECO_ADDRESS]),
    },
    bsc: {
        tvl: chainTvl('bsc', [PECO_ADDRESS]),
    },
    methodology: `Backed finance offers tokenized securities onchain. Token balances are accumolated and multiplied by the price of the underlying asset.`,
  };