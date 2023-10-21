<h1><a href="https://lightsout-game.lixquid.com">Lights Out</a></h1>

An online implementation of the Lights Out game.

https://lightsout-game.lixquid.com

## How to Play

- Click on a cell to toggle its state, as well as the state of its neighbors.
  - Depending on the game mode, what counts as a neighbor may vary.
- The goal is to turn off all the lights.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)

### Getting Started

1. Clone the repository
2. Install dependencies: `yarn install`
3. Start the development server: `yarn start`
4. Open http://localhost:8080 in your browser

Changes to the source files will be automatically reloaded in the browser.

### Building for Production

1. Remove the `dist` folder:
   - \*nix: `rm -rf dist`
   - Windows: `rmdir /s /q dist`
2. Build the project: `yarn build`
3. The production files will be in the `dist` folder

Production files can be served from any static file server.
