# NFT Market

Welcome to the NFT Marketplace project, a decentralized marketplace for NFTs built with Hardhat, Ether, Solidity, Next.js, IPFS, and The Graph.

## Overview

This repository contains the smart contracts, frontend application, and deployment scripts for a decentralized NFT marketplace. It supports the creation, buying, selling, and trading of NFTs securely on the Ethereum blockchain.

## Features

- **Smart Contracts:** Implemented using Solidity, with Hardhat for development and testing.
- **Frontend Application:** Built with Next.js, providing a responsive and interactive user interface.
- **IPFS Integration:** Store and retrieve NFT metadata securely using IPFS.
- **Event Listening:** Utilized The Graph for efficient event indexing and querying.
- **Test NFT Token:** Included example ERC721 token for testing purposes.

## Deployment

### Smart Contracts (Hardhat)

1. **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd contracts
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Compile contracts:**

    ```bash
    npx hardhat compile
    ```

4. **Run tests:**

    ```bash
    npx hardhat test
    ```

### Frontend (Next.js)

1. **Navigate to the frontend directory:**

    ```bash
    cd ../frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set environment variables:**

    - Create a `.env.local` file in the frontend directory.
    - Add the following variables:

      ```dotenv
      NEXT_PUBLIC_API_URL=<backend_api_url>
      ```
    - No need to add env if page is hosted on ipfs
      

4. **Run the frontend app:**

    ```bash
    npm run dev
    ```

5. **Access the app at:**

    [http://localhost:3000](http://localhost:3000).


## Technologies Used

- **Smart Contracts:** Solidity, Hardhat
- **Frontend:** Next.js
- **Blockchain:** Ethereum
- **Storage:** IPFS
- **Event Indexing:** The Graph

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
