# Create a GitHub Action Using TypeScript

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

This actions logs in to an OIDC provider and returns the access token, refresh
token, and their expiration times.

## Usage

Here's an example of how to use this action in a workflow file:

```yaml
name: oidc-login

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Use oidc-login action
        id: oidc
        uses: ilyes-ajroud/oidc-login@v1
        with:
          url: ${{ secrets.OIDC_URL }}
          client_id: ${{ secrets.OIDC_CLIENT_ID }}
          client_secret: ${{ secrets.OIDC_CLIENT_SECRET }}
          username: ${{ secrets.OIDC_USERNAME }}
          password: ${{ secrets.OIDC_PASSWORD }}
          scope: ${{ secrets.OIDC_SCOPE }}
          grant_type: ${{ secrets.OIDC_GRANT_TYPE }}
          audience: ${{ secrets.OIDC_AUDIENCE }}

      - name: Access output values
        run: |
          echo "Access Token: ${{ steps.oidc.outputs.access_token }}"
          echo "Refresh Token: ${{ steps.oidc.outputs.refresh_token }}"
          echo "Expires In: ${{ steps.oidc.outputs.expires_in }}"
          echo "Refresh Expires In: ${{ steps.oidc.outputs.refresh_expires_in }}"
```

For example workflow runs, check out the
[Actions tab](https://github.com/actions/hello-world-javascript-action/actions)!
:rocket:

## Inputs

| Name          | Description                     | Required | Default  |
| ------------- | ------------------------------- | -------- | -------- |
| URL           | URL of the OIDC provider        | Yes      | -        |
| client_id     | Client ID                       | Yes      | -        |
| client_secret | Client secret of the client     | No       | -        |
| username      | Username of the user            | Yes      | -        |
| password      | Password of the user            | Yes      | -        |
| scope         | Scope of the token request      | No       | -        |
| grant_type    | Grant type of the token request | No       | password |
| audience      | Audience of the token           | No       | -        |

## Outputs

| Name               | Description                                     |
| ------------------ | ----------------------------------------------- |
| access_token       | Access token to use in the API calls            |
| refresh_token      | Refresh token to get a new access token         |
| expires_in         | Access token expiration time in seconds         |
| refresh_expires_in | Expiration time of the refresh token in seconds |

## Devlopment Setup

After you've cloned the repository to your local machine or codespace, you'll
need to perform some initial setup steps before you can develop your action.

> [!NOTE]
>
> You'll need to have a reasonably modern version of
> [Node.js](https://nodejs.org) handy (20.x or later should work!). If you are
> using a version manager like [`nodenv`](https://github.com/nodenv/nodenv) or
> [`nvm`](https://github.com/nvm-sh/nvm), this template has a `.node-version`
> file at the root of the repository that will be used to automatically switch
> to the correct version when you `cd` into the repository. Additionally, this
> `.node-version` file is used by GitHub Actions in any `actions/setup-node`
> actions.

1. :hammer_and_wrench: Install the dependencies

   ```bash
   npm install
   ```

1. :building_construction: Package the TypeScript for distribution

   ```bash
   npm run bundle
   ```

1. :white_check_mark: Run the tests

   ```bash
   $ npm test

   PASS  ./index.test.js
     ✓ throws invalid number (3ms)
     ✓ wait 500 ms (504ms)
     ✓ test runs (95ms)

   ...
   ```
