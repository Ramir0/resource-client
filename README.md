# Resource Client

This project is running with Angular version 16.0.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Dependencies
Before running the Angular project, please ensure that you have the following dependencies installed:

- `Node v16.18.1` The source code is written with Typescript, so make sure you have NodeJS installed and set up properly on your machine.
- `Docker` The project is designed to run in Docker containers. You will need to have Docker installed on your machine.

Please make sure that all of these dependencies are installed and configured correctly before attempting to run the project.

## Running Project
### First time execution
- `docker network create resource-network`
- `npm install`
### Running from Maven
- `npm start`
### Running from Dockerfile
- `docker build --no-cache -t resource-client:latest .`
- `docker run -d -p 4200:80 --network resource-network --name resource-client resource-client:latest`

## Cleaning Project and Resources
`npm cache clean --force` - Clean project files generated and update dependencies
`docker network rm resource-network` - Delete docker network