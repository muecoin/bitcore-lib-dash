'use strict';

module.exports = {
  TXHEX: [
    [ "02000000010000000000000000000000000000000000000000000000000000000000000000ffffffff44035b850204ea5bdf5908810002282c0000007969696d7000fabe6d6d30350d051db989b4e41688ac0ca48d29e2291dd86c59f2192865c13071ddfdf70100000000000000000000000200d2496b000000001976a914d12eda6cb6c21fb6e5cb8d1cc21565e84597163788ac00d2496b000000001976a914b6a755254558bfec134433b048bc5ab5341d79cb88ac00000000",
      "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff4c03b07502040dc8dc5908fabe6d6db5ed2ed500c22bf374e5bb8f246f07fe21d5903d4cfc75f635a23d2916ff3f13010000000000000070000000100000000d2f6e6f64655374726174756d2f000000000200d2496b000000001976a914216e6e997785e9e7ff8f49b07c51ddf87680513988ac00d2496b000000001976a914dcf3cdb570aae716d6dbf94ed90858b5d3b917a888ac00000000"
    ]
  ],
  HEX: [
      "20000001" + // Version
      "00000000000129624b4602b2e9bb23fe596d21c02b1061053344e89099a6dc0b" + // prevHash
      "2f0e0f273ee8be303c5b128f716fef6657c176e2421a71efece310c8ab17e4fc" + // MerkleRoot
      "59dcc862" + // Time
      "1b024cac" + // Bits
      "8a7c0395" + // Nonce
      "01" + // Transaction Count
      "01" + // Hash Count
      "2f0e0f273ee8be303c5b128f716fef6657c176e2421a71efece310c8ab17e4fc" + // Hash1
      "0" + // Num Flag Bytes
      "0", // Flags
      
    "20000001" + // Version
    "0000000000016ce3869f278d2e8ea60299f9605932d90e7ddd01e2d1bf27640e" + // prevHash
    "d0772192f4e1c3faae6ff058f9209b91d02c6dbc6bdf3e04d4d2fc04e0ef4ff6" + // MerkleRoot
    "59df5be1" + // Time
    "1b020eaa" + // Bits
    "9565678b" + // Nonce
    "02" + // Transaction Count
    "02" + // Hash Count
    "2f15c5ce34fccb8cca9f131ea7852ab66cf233269b09cc5489b24e0db5cdeb53" + // Hash1
    "b6b9ca4b5f31aa8e2ae143239efa1e49198a1fc0de63b3d0595e95d10e753102" + // Hash2
    "0" + // Num Flag Bytes
    "0" // Flags
  ],
  JSON: [
    { // Mainnet Block 161200
      header: {
        hash: "000000000002486c6eba4cf563f50877b7b0ade331d486a8151ca32fdfe268d8",
        version: 536870913,
        prevHash: "00000000000129624b4602b2e9bb23fe596d21c02b1061053344e89099a6dc0b",
        merkleRoot: "2f0e0f273ee8be303c5b128f716fef6657c176e2421a71efece310c8ab17e4fc",
        time: 1507641442,
        bits: 453135532,
        nonce: 2323383189
      },
      numTransactions: 1,
      hashes: [
        "2f0e0f273ee8be303c5b128f716fef6657c176e2421a71efece310c8ab17e4fc"
      ],
      flags: [ 0 ]
    },
    { // Mainnet Block 165210
      header : {
        hash: "000000000001b074564a5d7bb5787067ea299e89d5850d7c424befee352b238b",
        version : 536870913,
        prevHash : "0000000000016ce3869f278d2e8ea60299f9605932d90e7ddd01e2d1bf27640e",
        merkleRoot : "d0772192f4e1c3faae6ff058f9209b91d02c6dbc6bdf3e04d4d2fc04e0ef4ff6",
        time : 1507810273,
        bits : 453119658,
        nonce : 2506450827
      },
      numTransactions : 2,
      hashes : [
        "2f15c5ce34fccb8cca9f131ea7852ab66cf233269b09cc5489b24e0db5cdeb53",
        "b6b9ca4b5f31aa8e2ae143239efa1e49198a1fc0de63b3d0595e95d10e753102"
      ],
      flags : [ 219, 63 ]
    },
    { // Mainnet Block 12363
      header: {
        hash: "000000000b4d23f9076e9649efeb187db832192e6dd4f423f77c15d7a0a86841",
        version: 2,
        prevHash: "000000000b7c6b508d001f7ccdee9aa5938ed4225c6fd30e7cbc7354b23d11d7",
        merkleRoot: "503bb32178ecbf539887671f96525c9496f0c6c8d5ef9ac5a17120a02566385a",
        time: 1391670030,
        nonce: 3887755349,
        bits: 471254460,
      },
      numTransactions: 1,
      hashes: [
        "5a386625a02071a1c59aefd5c8c6f096945c52961f67879853bfec7821b33b50"
      ],
      flags: [ 0 ]
    },
    { // Mainnet Block 280472
      flags : [ 0 ],
      numTransactions : 1,
      hashes : [
        "9f46ef8869acf4dcaf4bac2123436020ece06bf0969478112364646ac946fae3"
      ],
      header : {
        hash: "000000000015a12e8131ef9a8570955ca07755ed9d1afe3ff97fb81dfdc9873c",
        prevHash : "000000000009a2104d476751e045a436ba9431ba511a4e9384c9c145162931f0",
        merkleRoot : "e3fa46c96a64642311789496f06be0ec2060432321ac4bafdcf4ac6988ef469f",
        time : 1433459232,
        version : 3,
        nonce : 3851491840,
        bits : 455002837,
      }
    }
  ]
};
