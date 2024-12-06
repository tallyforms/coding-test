# @tallyforms/coding-test

This is a coding test to gain insights into your coding style, approach to problem solving, and general capabilities.

## Context

- You are given a Next.js app with some relevant pieces of code that mimic how Tally works.
- You are given a database with dummy data that includes;
  - Forms (3)
  - Questions (2, 7 & 3)
  - Submissions (1M + 500K + 250K = 1.75M)
  - Answers (1M * 2 + 500K * 7 + 250K * 3 = 6.25M)
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
    - For the `linear-scale` question type, show an average score instead.
- Improve & change the code where needed.
- While you are free to make it look as nice as you want, it won't be our main focus.
- We do not expect a form builder, so do not spend time on that.
- Try to timebox yourself to 4 hours max.
- Commit your changes in git.

> [!NOTE]
> - You are free to change or add any additional tooling as you see fit.
> - You are free to change or add any additional libraries as you see fit.
> - You are free to use any styling libraries as you see fit.
> - You are free to make changes to the database structure.
> - You are free to make use of additional services using `docker-compose.yml`.
>
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

Download the sql dump [`init.sql`](/../files/init.sql) (1.3GB) using the following command.

```bash
curl --progress-bar -o init.sql https://media.githubusercontent.com/media/tallyforms/coding-test/refs/heads/files/init.sql?download=true
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

There is a debug script provided to inspect answer data, although you don't really need it.

```bash
# inspect answer with id 100
npm run debug:inspect-answer -- --id 100
```
