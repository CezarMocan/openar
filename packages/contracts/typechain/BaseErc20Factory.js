/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Contract, ContractFactory } from "@ethersproject/contracts";
export class BaseErc20Factory extends ContractFactory {
    constructor(signer) {
        super(_abi, _bytecode, signer);
    }
    deploy(name, symbol, decimals, overrides) {
        return super.deploy(name, symbol, decimals, overrides || {});
    }
    getDeployTransaction(name, symbol, decimals, overrides) {
        return super.getDeployTransaction(name, symbol, decimals, overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
const _abi = [
    {
        inputs: [
            {
                internalType: "string",
                name: "name",
                type: "string",
            },
            {
                internalType: "string",
                name: "symbol",
                type: "string",
            },
            {
                internalType: "uint8",
                name: "decimals",
                type: "uint8",
            },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "spender",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "who",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "decimals",
        outputs: [
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "transfer",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "value",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b5060405162000ecf38038062000ecf833981810160405260608110156200003757600080fd5b81019080805160405193929190846401000000008211156200005857600080fd5b9083019060208201858111156200006e57600080fd5b82516401000000008111828201881017156200008957600080fd5b82525081516020918201929091019080838360005b83811015620000b85781810151838201526020016200009e565b50505050905090810190601f168015620000e65780820380516001836020036101000a031916815260200191505b50604052602001805160405193929190846401000000008211156200010a57600080fd5b9083019060208201858111156200012057600080fd5b82516401000000008111828201881017156200013b57600080fd5b82525081516020918201929091019080838360005b838110156200016a57818101518382015260200162000150565b50505050905090810190601f168015620001985780820380516001836020036101000a031916815260200191505b5060405260200151915060009050620001b96001600160e01b036200024c16565b600080546001600160a01b0319166001600160a01b0383169081178255604051929350917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908290a35082516200021890600190602086019062000251565b5081516200022e90600290602085019062000251565b506004805460ff191660ff9290921691909117905550620002f39050565b335b90565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106200029457805160ff1916838001178555620002c4565b82800160010185558215620002c4579182015b82811115620002c4578251825591602001919060010190620002a7565b50620002d2929150620002d6565b5090565b6200024e91905b80821115620002d25760008155600101620002dd565b610bcc80620003036000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806370a082311161008c57806395d89b411161006657806395d89b411461027f578063a9059cbb14610287578063dd62ed3e146102b3578063f2fde38b146102e1576100cf565b806370a082311461022d578063715018a6146102535780638da5cb5b1461025b576100cf565b806306fdde03146100d4578063095ea7b31461015157806318160ddd1461019157806323b872dd146101ab578063313ce567146101e157806340c10f19146101ff575b600080fd5b6100dc610307565b6040805160208082528351818301528351919283929083019185019080838360005b838110156101165781810151838201526020016100fe565b50505050905090810190601f1680156101435780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b61017d6004803603604081101561016757600080fd5b506001600160a01b03813516906020013561039c565b604080519115158252519081900360200190f35b6101996103b2565b60408051918252519081900360200190f35b61017d600480360360608110156101c157600080fd5b506001600160a01b038135811691602081013590911690604001356103b8565b6101e9610517565b6040805160ff9092168252519081900360200190f35b61022b6004803603604081101561021557600080fd5b506001600160a01b038135169060200135610520565b005b6101996004803603602081101561024357600080fd5b50356001600160a01b0316610598565b61022b6105b3565b610263610667565b604080516001600160a01b039092168252519081900360200190f35b6100dc610676565b61017d6004803603604081101561029d57600080fd5b506001600160a01b0381351690602001356106d4565b610199600480360360408110156102c957600080fd5b506001600160a01b03813581169160200135166107a1565b61022b600480360360208110156102f757600080fd5b50356001600160a01b03166107cc565b60018054604080516020601f600260001961010087891615020190951694909404938401819004810282018101909252828152606093909290918301828280156103925780601f1061036757610100808354040283529160200191610392565b820191906000526020600020905b81548152906001019060200180831161037557829003601f168201915b5050505050905090565b60006103a93384846108d6565b90505b92915050565b60035490565b6001600160a01b038316600090815260056020526040812054821180159061040357506001600160a01b03841660009081526006602090815260408083203384529091529020548211155b1561050c576001600160a01b038316600090815260056020526040902054610431908363ffffffff61094116565b6001600160a01b038085166000908152600560205260408082209390935590861681522054610466908363ffffffff61099b16565b6001600160a01b03851660009081526005602090815260408083209390935560068152828220338352905220546104a3908363ffffffff61099b16565b6001600160a01b03808616600081815260066020908152604080832033845282529182902094909455805186815290519287169391927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef929181900390910190a3506001610510565b5060005b9392505050565b60045460ff1690565b6105286109dd565b6000546001600160a01b0390811691161461058a576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b61059482826109e1565b5050565b6001600160a01b031660009081526005602052604090205490565b6105bb6109dd565b6000546001600160a01b0390811691161461061d576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b600080546040516001600160a01b03909116907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0908390a3600080546001600160a01b0319169055565b6000546001600160a01b031690565b60028054604080516020601f60001961010060018716150201909416859004938401819004810282018101909252828152606093909290918301828280156103925780601f1061036757610100808354040283529160200191610392565b336000908152600560205260408120548211610799573360009081526005602052604090205461070a908363ffffffff61099b16565b33600090815260056020526040808220929092556001600160a01b0385168152205461073c908363ffffffff61094116565b6001600160a01b0384166000818152600560209081526040918290209390935580518581529051919233927fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9281900390910190a35060016103ac565b5060006103ac565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205490565b6107d46109dd565b6000546001600160a01b03908116911614610836576040805162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572604482015290519081900360640190fd5b6001600160a01b03811661087b5760405162461bcd60e51b8152600401808060200182810382526026815260200180610b716026913960400191505060405180910390fd5b600080546040516001600160a01b03808516939216917f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e091a3600080546001600160a01b0319166001600160a01b0392909216919091179055565b6001600160a01b03808416600081815260066020908152604080832094871680845294825280832086905580518681529051929493927f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925929181900390910190a35060019392505050565b6000828201838110156103a9576040805162461bcd60e51b815260206004820152601b60248201527f536166654d6174683a206164646974696f6e206f766572666c6f770000000000604482015290519081900360640190fd5b60006103a983836040518060400160405280601e81526020017f536166654d6174683a207375627472616374696f6e206f766572666c6f770000815250610ad9565b3390565b6001600160a01b038216610a3c576040805162461bcd60e51b815260206004820152601b60248201527f43616e6e6f74206d696e7420746f207a65726f20616464726573730000000000604482015290519081900360640190fd5b6001600160a01b038216600090815260056020526040902054610a65908263ffffffff61094116565b6001600160a01b038316600090815260056020526040902055600354610a91908263ffffffff61094116565b6003556040805182815290516001600160a01b038416916000917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9181900360200190a35050565b60008184841115610b685760405162461bcd60e51b81526004018080602001828103825283818151815260200191508051906020019080838360005b83811015610b2d578181015183820152602001610b15565b50505050905090810190601f168015610b5a5780820380516001836020036101000a031916815260200191505b509250505060405180910390fd5b50505090039056fe4f776e61626c653a206e6577206f776e657220697320746865207a65726f2061646472657373a2646970667358221220ecbe39e457dc9a3fefb0e9bf068cdebe12e1f1834be59f3f1cdc10bff2ac0b6964736f6c63430006080033";
