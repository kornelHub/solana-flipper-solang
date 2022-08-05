# Solang_Flipper_Solana


Baisc implementtaion of flipper contract written in Solidity using Solang. Solang can compile Solidity for Solana, Substrate, and ewasm. 
Solang is source compatible with Solidity 0.8.

Steps:

# Install Solang for Linux:
Download release binaries `Linux x86-64`, and move it to home directory (`~`)

# Generate ABI file and a single `bundle.so` is created which contains the code all the contracts provided on the command line
*Remember to run in in home directory (or where `Linux x86-64` is stored)*
```
solang --target solana flipper.sol
```

# Generate keys:
```
solana-keygen new -o keys/devnet.json  // owner address
solana-keygen new -o keys/program.json // program address
solana-keygen new -o keys/storage.json // storage address
```

# Deploy program:
```
npm run flipper
```

# Flip variable:
```
npm run flip_call
```