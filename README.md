This is an MVP project for the frontend app of a **Carbon Footprint Calculator**.

In this MVP, it's possible to calculate your individual personal carbon footprint by the inputs of:

- **Housing** consumptions
- **Transportation Data** for gasoline vehicles

### Project stack

This is a [Next.js](https://nextjs.org) Typescript project that is based on Next **App Router** and uses **[Material UI](https://mui.com/material-ui/getting-started/)** components and comunicate with the REST **[Backend API](https://github.com/pmatos96/carbon-footprint-calculator-server)** using **Axios**.
Tests cover the MVP with [Jest](https://jestjs.io/)/[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for the functionalities, using snapshots to cover visual regression.  

## Running locally

First, run the [backend server](https://github.com/pmatos96/carbon-footprint-calculator-server), and then:

```bash
npm install
# and
npm run dev
```
Run tests with:
```bash
npm run test
```
Open [http://localhost:5555](http://localhost:5555) with your browser to see the result.
