# QueryBridge Dashboard

QueryBridge Frontend is the frontend application for the QueryBridge dashboard. It provides an intuitive and user-friendly interface for managing database connections, creating custom endpoints, and interacting with the connected databases using the QueryBridge backend API.

![Project Logo](Logo.png) 

## Table of Contents

- [QueryBridge Dashboard](#querybridge-dashboard)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Backend API](#backend-api)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Design](#design)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

The QueryBridge Frontend is built using React and styled with Tailwind CSS. It is designed to complement the backend by providing an accessible and visually appealing dashboard for users to manage their database connections and create custom endpoints effortlessly.

## Features

- **User Authentication**: Secure login and registration system for authenticated access.
- **Dashboard Overview**: An overview of user applications and their associated database connections.
- **Database Connections**: Easily add, edit, and delete database connections.
- **Endpoint Management**: Create, update, and remove custom endpoints for connected databases.
- **Real-time Activity Logs**: View real-time logs of database interactions and endpoint activities.
- **Private and Public Endpoints**: Declare endpoints as private or public for additional security.

## Backend API

The QueryBridge Frontend interacts with the QueryBridge Backend API to perform various operations, including database connection setup, endpoint creation, and activity logging. Ensure that the backend API is set up and running before using the frontend. See information about the backend [here](https://github.com/ShowBaba/bridge-core.git)

## Installation

1. Clone the frontend repository to your local machine: `git clone https://github.com/ShowBaba/bridge-dashboard.git`.
2. Navigate to the project directory: `cd querybridge-dashboard`.
3. Install the required dependencies: `yarn`.

## Usage

1. Start the frontend development server: `yarn start`.
2. Access the frontend dashboard in your browser at [http://localhost:3000](http://localhost:3000).

## Design

The design for the QueryBridge Frontend is available on Figma. You can view the design [here](https://www.figma.com/file/25wQoBo8shPdxays5XiDSg/query-bridge?type=design&node-id=66%3A9321&mode=design&t=LXIppltNrnTZnHSm-1).

<!-- ![Dashboard Screenshot](dashboard_screenshot.png)  -->

## Contributing

We welcome contributions to the QueryBridge Frontend! Whether it's bug fixes, new features, or improvements to documentation, we value your input. To contribute, follow these steps:

1. Fork the repository to your GitHub account.
2. Clone your forked repository to your local machine.
3. Create a new branch for your changes: `git checkout -b feature/new-feature` or `fix/issue-description`.
4. Make your modifications and commit your changes: `git commit -m "Description of changes"`.
5. Push your changes to your GitHub repository: `git push origin feature/new-feature`.
6. Open a pull request against the `main` branch of this repository.
7. Ensure your pull request follows the project's coding guidelines and passes any automated tests.

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information on contributing guidelines and code formatting.

## License

QueryBridge Frontend is released under the [MIT License](LICENSE). See the `LICENSE` file for details.

---
