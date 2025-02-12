# **EcoVoting DApp**  

## **Project Description**  
EcoVoting DApp is a decentralized application designed for secure and transparent voting on environmental initiatives. By leveraging **blockchain technology**, **smart contracts**, and **Web3**, it ensures that votes cannot be tampered with and that the process remains fair and auditable.  

## **How the System Works**  
1. **The administrator** creates proposals (e.g., "Reduce Plastic Waste").  
2. **Users vote** for a proposal using their blockchain wallets.  
3. **The smart contract** enforces fair voting (one vote per user).  
4. **Votes are permanently stored** on the blockchain, ensuring immutability.  
5. **Anyone can verify vote counts** at any time.  

## **Technologies Used**  
- **Blockchain** – securely stores voting data.  
- **Smart Contracts** – enforce voting rules and prevent manipulation.  
- **Web3.js** – connects the web interface to the blockchain.  
- **Ganache** – provides a local blockchain for testing.  
- **Truffle** – simplifies smart contract development and deployment.  
- **Keccak256** – used for hashing data securely.  

## **Installation and Setup**  

### **1. Install dependencies**  
```sh
npm install
```

### **2. Start Ganache**  
Launch Ganache to create a local Ethereum blockchain for testing.  

### **3. Compile and deploy smart contracts**  
```sh
truffle migrate --reset
```

### **4. Start the frontend**  
```sh
npm run start
```

## **How to Vote**  
1. Connect your MetaMask wallet.  
2. Select a proposal and click "Vote."  
3. Confirm the transaction in MetaMask.  
4. Your vote will be recorded on the blockchain.  

