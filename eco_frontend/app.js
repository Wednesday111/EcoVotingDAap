const contractAddress = "0x66A729bddEbF360b03065ea21ad2d3B7afB0CC99"; 
const contractABI =  
[
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "hasVoted",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "proposalCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "proposals",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalId",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_proposalId",
          "type": "uint256"
        }
      ],
      "name": "getVotes",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ];

let web3;
let contract;
let userAccount;

// ✅ Функция подключения MetaMask
async function connectWallet() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        try {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            userAccount = accounts[0];
            document.getElementById("wallet-address").innerText = `Connected: ${userAccount}`;
            contract = new web3.eth.Contract(contractABI, contractAddress);
            await loadProposals();
        } catch (error) {
            console.error("Wallet connection failed:", error);
            alert("Failed to connect to MetaMask.");
        }
    } else {
        alert("Please install MetaMask!");
    }
}

// ✅ Добавление нового предложения
async function addProposal() {
    if (!contract) {
        alert("Smart contract is not connected. Please connect your wallet.");
        return;
    }

    const proposalName = document.getElementById("proposalName").value.trim();
    if (!proposalName) {
        alert("Enter a proposal name.");
        return;
    }

    try {
        await contract.methods.addProposal(proposalName).send({ from: userAccount });
        alert("Proposal added successfully!");
        document.getElementById("proposalName").value = "";
        await loadProposals();
    } catch (error) {
        console.error("Error adding proposal:", error);
        alert("Error! Check console for details.");
    }
}

// ✅ Загрузка списка предложений
async function loadProposals() {
    if (!contract) {
        alert("Smart contract is not connected. Please connect your wallet.");
        return;
    }

    try {
        const proposalCount = await contract.methods.proposalCount().call();
        const proposalList = document.getElementById("proposal-list");
        const proposalDropdown = document.getElementById("proposalDropdown");
        const checkProposalDropdown = document.getElementById("checkProposalDropdown");

        proposalList.innerHTML = "";
        proposalDropdown.innerHTML = "";
        checkProposalDropdown.innerHTML = "";

        if (proposalCount == 0) {
            proposalList.innerHTML = "<li>No proposals available.</li>";
            return;
        }

        for (let i = 1; i <= proposalCount; i++) {
            const proposal = await contract.methods.proposals(i).call();

            let listItem = document.createElement("li");
            listItem.innerText = `${i}. ${proposal.name} (Votes: ${proposal.voteCount})`;
            proposalList.appendChild(listItem);

            let option1 = document.createElement("option");
            option1.value = proposal.id;
            option1.innerText = proposal.name;
            proposalDropdown.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = proposal.id;
            option2.innerText = proposal.name;
            checkProposalDropdown.appendChild(option2);
        }
    } catch (error) {
        console.error("Error loading proposals:", error);
        alert("Error loading proposals.");
    }
}

// ✅ Голосование
async function vote() {
    if (!contract) {
        alert("Smart contract is not connected. Please connect your wallet.");
        return;
    }

    const proposalId = document.getElementById("proposalDropdown").value;
    if (!proposalId) {
        alert("Select a proposal to vote.");
        return;
    }

    try {
        await contract.methods.vote(proposalId).send({ from: userAccount });
        alert("Vote successfully cast!");
        await loadProposals();
    } catch (error) {
        console.error("Voting error:", error);
        alert("Voting error.");
    }
}

// ✅ Получение количества голосов
async function getVotes() {
    if (!contract) {
        alert("Smart contract is not connected. Please connect your wallet.");
        return;
    }

    const proposalId = document.getElementById("checkProposalDropdown").value;
    if (!proposalId) {
        alert("Select a proposal.");
        return;
    }

    try {
        const votes = await contract.methods.getVotes(proposalId).call();
        document.getElementById("voteCount").innerText = `Total Votes: ${votes}`;
    } catch (error) {
        console.error("Error fetching votes:", error);
        alert("Error fetching votes.");
    }
}
