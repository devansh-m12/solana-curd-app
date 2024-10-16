# Solana Journal App

## Overview

The Solana Journal App is a decentralized application (dApp) built on the Solana blockchain. It allows users to create, read, update, and delete journal entries using a Solana program. This project demonstrates the integration of a React-based front-end with a Solana smart contract.

## Features

- Create journal entries with a title and message
- View a list of all journal entries
- Update existing journal entries
- Delete journal entries
- Seamless integration with Solana wallets

## Getting Started

### Prerequisites

- Node.js v18.18.0 or higher
- pnpm (for package management)
- Rust v1.77.2 or higher
- Anchor CLI 0.30.1 or higher
- Solana CLI 1.18.17 or higher

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/devansh-m12/solana-curd-app
   cd solana-journal-app
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Set up the Solana program:
   ```
   cd anchor
   anchor build
   anchor deploy
   ```

4. Update the program ID:
   - Copy the program ID from the deployment output
   - Update the ID in `anchor/lib/journal_exports.ts`
   - Update the `declare_id!` macro in `anchor/programs/curd-app/src/lib.rs`

5. Start the development server:
   ```
   pnpm dev
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `/src/components/journal`: Contains the React components for the journal UI
- `/anchor`: Contains the Solana program written in Rust using the Anchor framework

## Usage

Refer to the "Components" section in this README for details on how to use the Journal UI components in your React application.

## Development

### Web App

To start the web app in development mode:

```
pnpm dev
```

To build the web app for production:

```
pnpm build
```

### Solana Program

To build the Solana program:

```
pnpm anchor-build
```

To run tests:

```
pnpm anchor-test
```

To start a local Solana validator with the program deployed:

```
pnpm anchor-localnet
```

## Dependencies

Main dependencies include:

- React
- @solana/web3.js
- @solana/wallet-adapter-react
- @project-serum/anchor
- Tailwind CSS

## Customization

The UI components use Tailwind CSS for styling. You can customize the appearance by modifying the CSS classes in the component files.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Solana Foundation for the blockchain infrastructure
- Anchor framework for simplifying Solana program development

## Contact

For any queries or feedback, please open an issue in this repository or contact the maintainers directly.
