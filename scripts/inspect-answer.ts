/**
 * Hello 👋
 *
 * This script is for debugging purposes if you'd like to inspect an answer by its ID.
 * You don't need to modify anything in this file and it won't be used for grading.
 */

import 'dotenv/config';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import { Answers } from '~/database';

(async () => {
  const args = yargs(hideBin(process.argv)).options({
    id: {
      type: 'number',
      required: true,
    },
  }).argv as { id: number };

  const answer = await Answers.getById(args.id);
  console.log(answer);

  process.exit(0);
})();
