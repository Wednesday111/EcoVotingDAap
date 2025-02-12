// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EcoVoting {
    struct Proposal {
        uint id;
        string name;
        uint voteCount;
    }

    mapping(uint => Proposal) public proposals;
    mapping(address => bool) public hasVoted;
    address public owner;
    uint public proposalCount;

    event Voted(address voter, uint proposalId);

    constructor() {
        owner = msg.sender;
    }

    function addProposal(string memory _name) public {
        require(msg.sender == owner, "Only owner can add proposals");
        proposalCount++;
        proposals[proposalCount] = Proposal(proposalCount, _name, 0);
    }

    function vote(uint _proposalId) public {
        require(!hasVoted[msg.sender], "You have already voted");
        require(proposals[_proposalId].id != 0, "Invalid proposal");

        hasVoted[msg.sender] = true;
        proposals[_proposalId].voteCount++;

        emit Voted(msg.sender, _proposalId);
    }

    function getVotes(uint _proposalId) public view returns (uint) {
        return proposals[_proposalId].voteCount;
    }
}

