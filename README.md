# Github Code Viewer

<img align="right" width="95" height="95"
alt="Philosopher’s stone, logo of PostCSS"
src="./public/octopus-logo.svg">

`Github Code Viewer` is a web application to view and explore GitHub code in a more simple and pleasurable way. It is
built on top of [Github GraphQL API](https://docs.github.com/en/graphql/guides/introduction-to-graphql),
uses [Next.js](https://nextjs.org/) with Server Side Rendering and [TailwindCSS](https://tailwindcss.com/) for the
styles.

Implemented as part of [Ivelum Frontend Challenge](https://github.com/ivelum/job/blob/master/challenges/frontend.md).

## Installation

We use [pnpm](https://github.com/pnpm/pnpm) as a package manager. If you don't have it don't worry. `npm` or `yarn`
should work too.

### Install dependencies

To install the application locally, clone the repository and run the following command:

```bash
pnpm install

# or if you have yarn installed
yarn

# or if you have only npm installed
npm install
```

### Generating personal access token

Create a `.env.local` file with the following content:

```bash
NEXT_PUBLIC_GITHUB_TOKEN=YOUR_GITHUB_TOKEN
```

Where `YOUR_GITHUB_TOKEN` is your personal access token. You can follow
the [GitHub documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
on how to generate your personal token.

### Generate GraphQL schema and types

We use `graphql-codegen` to generate the GraphQL schema and types.

Run the following command to GraphQL the application:

```bash
pnpm run codegen

# or if you have yarn installed
yarn run codegen

# or if you have only npm installed
npm run codegen
```

⚠ **Note**: Please make sure your personal access token is set in the `.env.local` file before running the command.
Otherwise, the code generator will fail with `Authorization` error.

### Open the application

Now you can run `pnpm run dev` to start the app and open [http://localhost:3000](http://localhost:3000) with your
browser to see the result. Hooray! 🎉

## Testing the application

To test the application, run the following command:

```bash
pnpm run test:e2e

# or if you have yarn installed
yarn run test:e2e

# or if you have only npm installed
npm run test:e2e
```

It uses [Playwright](https://playwright.dev/) under the hood to run End-To-End tests.

## Contributing

You always welcome to contribute to the project by opening an issue or creating a pull request. I'm open to any kind of
contribution.Please don't hesitate to contact me if you have any questions.

## Thanks

This all would not be possible without awesome tools:

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Playwright](https://playwright.dev/)
- [DALLE-mini](https://huggingface.co/spaces/dalle-mini/dalle-mini) - The logo for the project is generated from this
  gorgeous tool. Isn't that black octopus cute? :)

Also big thanks to [Ivelum Team](https://ivelum.com/) for creating such an amazing challenge for junior level
programmers.
