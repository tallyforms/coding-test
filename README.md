# @tallyforms/coding-test

This is a coding test to gain insights into your coding style, approach to problem solving, and general capabilities.

## Context

- You are given a Next.js app with some relevant pieces of code that mimic how Tally works.
- You are given a database with a few million rows of dummy data that includes;
  - Forms
  - Questions
  - Submissions
  - Answers
- There's only 3 types of answers used in the dummy data;
  - `text-long`
  - `text-short`
  - `linear-scale` (0 - 10, an NPS score)

> [!IMPORTANT]
> The answers in the database are encrypted using AES-256-CBC, ([`src/services/encryption.ts`](./src/services/encryption.ts)).

## Expectations

- You should be able to click on a form to go to its detail page.
  - Submissions tab, similar to the one Tally has, to browse through submissions chronologically.
  - Summary tab, similar to the one Tally has, per question type.
    - For the `linear-scale` question type, show an average score.
- Improve & change the code where needed.
- While you are free to make it look as nice as you want, it won't be our main focus.
- We do not expect a form builder, so do not spend time on that.
- Try to timebox yourself to 4 hours.
- Commit your changes in git.

> [!NOTE]
> - You are free to change or add any additional tooling as you see fit.
> - You are free to change or add any additional libraries as you see fit.
> - You are free to use any styling libraries as you see fit.
> - You are free to make changes to the database structure.
> - You are free to make use of additional Docker services.

> [!TIP]
> If you would make adjustments to the database by changing schemas;
> - you can generate migrations by running `npm run db:generate`
> - you can execute migrations by running `npm run db:migrate`

## Setup

### Environment

Create the `.env` file, there's no need to adjust values.

```bash
cp .env.example .env
```

### Database

Download the sql dump [`init.sql.gz`](https://www.dropbox.com/scl/fi/0q59tbdfjup45o870vvpf/init.sql.gz?rlkey=xjwajfuxheroa5cqhqm0gylni) (0.5GB) using the following command.

```bash
curl --progress-bar -L https://dropbox.com/scl/fi/0q59tbdfjup45o870vvpf/init.sql.gz?rlkey=xjwajfuxheroa5cqhqm0gylni&dl=1 | gunzip > init.sql
```

Import the sql dump by starting the docker services (on the foreground), this might take a minute or 2.

```bash
docker compose up
```

> [!TIP]
> Once you see the log line `MySQL init process done`, you can press `Ctrl + C` & proceed.

### Running

```bash
# start docker services
docker compose up -d

# install dependencies
npm install

# start dev server
npm run dev
```

### Debugging

There are 2 scripts provided to help you debug more easily;

1. inspecting answer data

```bash
# inspect answer with id 100
npm run debug:inspect-answer -- --id 100
```

2. adding data to a form

```bash
# create a submission for form with id 1
npm run debug:add-data -- --id 1
```
