
## The Project

We want to make a pricing table for different plans (Month to month, 12/24/36 months) and different mileage packages (lite, standard, unlimited). We should be able to retrieve the latest version of the table (matrix) and save any changes done to it. However, there's one special case that we need to handle. When we edit any number on the table, it should be updated as is, **except** for the "lite" column; when you edit any number in the light column, the row should be updated automatically. We will explain more later.

## The Tasks

### API
- Complete the work in `save-pricing.ts` by validating the incoming data and saving it to `public/pricing.json`. Note that we are using Joi for validation, you can use it or switch to your own validation framework/way.
- Return proper errors in case something is wrong with the matrix (ex: int is string or missing mileage package)

### Frontend
- Design the matrix table and make it editable
- Fetch the latest table from the api
- Add 3 buttons
  - Save: Save the table to the database
  - Clear: Clear the table (all values should be 0)
  - Edit/Cancel: Dynamic button that makes it possible to edit/cancel editing the table.
- Table should be editable only when you click Edit, othewise, the inputs are disabled.
- Reset the table to previous state if we click on Cancel.
- Add an action/actions to handle editing the table. Keep note:
  - When you edit any field not in the "lite" column, the table should just update with that new value.
  - When you edit any value in the "lite" column, the other columns in the same row should update with **x2** and **x3** coefficients. See the example after this list.
- Save the table and retrieve the latest version.
- Show errors when validation fails

### Example editing the table:

| | lite | standard | unlimited |
|----------|------|----------|-----------|
| 36months | 1000 | 1200 | 1600 |
| 24months | 1200 | 1400 | 1800 |

If we change 36months standard to **1500**,  the table should look like this:
| | lite | standard | unlimited |
|----------|------|----------|-----------|
| 36months | 1000 | 1500 | 1600 |
| 24months | 1200 | 1400 | 1800 |

If we change 24months lite, the next columns will be multiplied by **x2** and **x3** respectively:
| | lite | standard | unlimited |
|----------|------|----------|-----------|
| 36months | 1000 | 1500 | 1600 |
| 24months | 1200 | 2400 | 3600 |

If we change 24months unlimited to **5000**, the the table, finally, becomes:
| | lite | standard | unlimited |
|----------|------|----------|-----------|
| 36months | 1000 | 1500 | 1600 |
| 24months | 1200 | 2400 | 5000 |

### Documentation
Whenever you do something that is clever, or might confuse the reader of your code, try to add comments
about the decisions you took when you made that code.

## The Tech Stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

We are using `React Context` and `useReducer` to handle the state, `styled-jsx` for styling, `Typescript`, simple node js APIs and for the database, just a json file in /public folder.

## Getting Started

First, run the development server:

```bash
npm run dev

# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Clone and push to your own repository

Try to comment your commits properly. Push to your own fork of this repository, then share
with us the github repository you made.

## Final notes
- If you don't know typescript, don't be intimidated by the project, eveyrthing is typed already and if you're unsure, you can use the type `any` or you can mute the errors using `//@ts-ignore` above the line that has the error.
- Clean and well documented code gives more bonus points.
- You don't need to complete everything, but you get bonus points if you complete 100% the project.
- If your design looks good, you get bonus points.
- Testing (jest, cypress or any framework) gives lots of bonus points.