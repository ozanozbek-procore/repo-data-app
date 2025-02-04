# repo-data-app

This NodeJS application fetches PR data from multiple repositories based on customizable filters.

## Requirements

- A [github user token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens) should be created (and enabled for organization repositories).

## Usage

- Clone this repository.
- Install dependencies by `npm i`.
- Create a `.env` file on project root and write your own github user token.
- Update `configuration.json` if needed.
- Run the app by `npm start`.
- A new data file will be created in `/data` directory.