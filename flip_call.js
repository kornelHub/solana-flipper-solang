const { Connection, LAMPORTS_PER_SOL, Keypair, clusterApiUrl } = require("@solana/web3.js");
const { Contract, Program } = require("@solana/solidity");
const { readFileSync } = require("fs");

const FLIPPER_ABI = JSON.parse(readFileSync("./flipper.abi", "utf8"));
const PROGRAM_SO = readFileSync("./bundle.so");

(async function () {
  console.log("Connecting to your devnet Solana node ...");
  const connection = new Connection(clusterApiUrl('devnet'));

  const payer = Keypair.fromSecretKey(new Uint8Array(JSON.parse(readFileSync(process.cwd() + "/keys/devnet.json").toString())));
  const program = Keypair.fromSecretKey(new Uint8Array(JSON.parse(readFileSync(process.cwd() + "/keys/program.json").toString())));
  const storage = Keypair.fromSecretKey(new Uint8Array(JSON.parse(readFileSync(process.cwd() + "/keys/storage.json").toString())));

  console.log(`> payer: ${payer.publicKey.toBase58()}`);
  console.log(`> program: ${program.publicKey.toBase58()}`);
  console.log(`> storage: ${storage.publicKey.toBase58()}`);

  const contract = new Contract(
    connection,
    program.publicKey,
    storage.publicKey,
    FLIPPER_ABI,
    payer
  );

  await contract.load(program, PROGRAM_SO);

  console.log(
    "Program deployment finished, deploying the flipper contract ..."
  );

  const res = await contract.functions.get();
  console.log("state: " + res.result);

  await contract.functions.flip();

  const res2 = await contract.functions.get();
  console.log("state: " + res2.result);
})();
