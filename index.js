const ethers = require("ethers");
const commander = require('commander');

commander
  .version('1.0.0', '-v, --version')
  .description("Generate certain amount of random Ethereum wallets for the given JSON-RPC node.")
  .usage('[OPTIONS]...')
  .option('-n, --number <int>', 'number of wallets to be generated.', 10)
  .option('-h, --host <char>', 'ethereum node where the geenrated wallets will be created.')
  .parse(process.argv);

const options = commander.opts();

if (options.number <= 0) {
    console.log("Number of wallet to be generated cannot be lower or equal to 0");
    process.exit(1);
}

const provider = new ethers.AlchemyProvider(null, options.host)

for(let i = 0; i < options.number; i++){
    const wallet = ethers.Wallet.createRandom(provider);

    const password = Math.random().toString(36).slice(-8);
    wallet.encryptSync(password);

    console.log("------------------" + (i + 1) + "------------------");
    console.log("Mnemonic phrase 📗: ", wallet.mnemonic.phrase);
    console.log('Password ❤️: ', password);
}