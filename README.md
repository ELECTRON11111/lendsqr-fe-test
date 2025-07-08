## LENDSQR FE ASSESMENT

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
The Tech Stack is `Next Js (React)` + `Typescript` + `SCSS`.

## Live Application and Project Structure

Project Structure is shown below:
```
┌ src/
|  |-  
│  ├─ app/
│  │  
│  └─ components/
│      
├ public/
│  └─ 
├ package.json
├ next.config.js
└ ...
```

The live application URL is [Click Here To View App](PLACE_URL_HERE).

## Getting Started (Setting App up locally) 

1. Open command prompt or Git Bash and run this command locally to clone the repo on your local device.

```bash
git clone https://github.com/ELECTRON11111/lendsqr-fe-test
```

2. Change directory into the cloned repository.

```bash
cd lendsqr-fe-test
```

3. Install all node modules

```bash
npm install
# or
npm install --legacy-peer-deps
```

4. Now, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Usage

Users data was fetched using an external mock API called Beeceptor.
The unique backend URL provided for my account is `https://opemipoomoniyi.free.beeceptor.com`
The users data is gotten under the `/users` API endpoint. Therefore the data is on [https://opemipoomoniyi.free.beeceptor.com/users](https://opemipoomoniyi.free.beeceptor.com/users).
It contains a total of 500 JSON user items of the format 

```
{  
  "id": 1,
  "orgName": "Lendsqr",
  "userName": "johndoe",
  "email": "johndoe@example.com",
  "phoneNumber": "+2348012345678",
  "createdAt": "2023-01-01T12:00:00Z",
  "status": "active",
  "user_details": {
    "id": "u-1",
    "tier": "2",
    "account_balance": "150000.00",
    "bvn": "12345678901",
    "bank": "Lendsqr Bank",
    "personal_info": {
      "full_name": "John Doe",
      "phone_number": "+2348012345678",
      "email_address": "johndoe@example.com",
      "marital_status": "Single",
      "children": 0,
      "type_of_residence": "Apartment"
    },
    "education_and_employment": {
      "level_of_education": "B.Sc",
      "employment_status": "Employed",
      "sector_of_employment": "Technology",
      "duration_of_employment": "3 years",
      "office_email": "john.doe@lendsqr.com",
      "monthly_income": "250000",
      "loan_repayment": "50000"
    },
    "socials": {
      "twitter": "@johndoe",
      "facebook": "facebook.com/johndoe",
      "instagram": "@johndoe"
    },
    "guarantor": {
      "full_name": "Jane Doe",
      "phone_number": "+2348098765432",
      "email_address": "janedoe@example.com",
      "relationship": "Sister"
    }
}
```