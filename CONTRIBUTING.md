# Contributing to Flebee Components

First of all, thank you for your interest in contributing to Flebee Components! Your contributions are greatly appreciated.

## How to Contribute

### Reporting Issues

If you find any bugs or have feature requests, please open an issue on our [GitHub Issues page](https://github.com/flebee/components/issues). Before opening a new issue, please check if the issue already exists to avoid duplicates.

### Submitting Pull Requests

We welcome contributions via pull requests (PRs). Follow these steps to submit a PR:

1. **Fork the repository**: Click the "Fork" button at the top right corner of the repository page.

2. **Clone your forked repository**:

   ```bash
   git clone https://github.com/your-username/flebee-components.git
   cd flebee-components
   ```

3. **Create a new branch**: Branches should be created from the `main` branch.
   ```bash
   git checkout -b your-branch-name
   ```

### Development Setup

To set up your development environment, ensure you have the following prerequisites:

- **Node.js**: Ensure you have Node.js version 20 installed. [Node.js official website](https://nodejs.org/).
- **pnpm**: Ensure you have pnpm version 9 installed. [pnpm official website](https://pnpm.io/)

Follow these steps to install dependencies and start the development server:

1. **Install dependencies**:

   ```bash
   pnpm install
   ```

2. **Start the development server**: This will also start the documentation site using [NgDoc](https://ng-doc.com/).
   ```bash
   pnpm run dev
   ```

### Making Changes

1. **Make your changes**: Implement your feature or bug fix.

2. **Commit your changes**: Use `pnpm run commit` to ensure your commit messages follow the project's conventions and run code formatters.

   ```bash
   pnpm run commit
   ```

3. **Push to your fork**:

   ```bash
   git push origin your-branch-name
   ```

4. **Create a pull request**: Go to the original repository and you should see a "Compare & pull request" button. Click it and submit your pull request.

### Documentation

If your contribution adds or modifies a feature, please update the documentation accordingly. This includes updating the relevant files in the `apps/docs/src/app` directory.

## License

By contributing to **Flebee Components**, you agree that your contributions will be licensed under the [MIT License](LICENSE).

Thank you for contributing!
