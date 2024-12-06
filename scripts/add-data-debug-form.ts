/**
 * Hello 👋
 *
 * This script is for debugging purposes, it allows you to easily add a new record to the debug
 * form, which might come in handy to test changing average linear scale data as data comes in.
 * It is not relevant to the coding test itself. You can safely ignore this file.
 */

import 'dotenv/config';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import { Answers, Forms, Questions, Submissions } from '~/database';
import { logger } from '~/utils';
import { md5, randomString } from '~/services';

(async () => {
  const args = yargs(hideBin(process.argv)).options({
    id: {
      type: 'number',
      required: false,
      default: 1,
    },
  }).argv as { id: number };
  const form = await Forms.getById(args.id);
  if (!form) {
    logger.error(`Form with id ${args.id} not found`);
    process.exit(1);
  }

  logger.trace(form.title);
  console.log();

  const questions = await Questions.getByFormId(form.id);
  const answers = await inquirer.prompt(questions.map((question) => ({
    type: question.type === 'linear-scale' ? 'number' : 'input',
    name: question.id.toString(),
    message: question.title,
  })));


  const submissionId = await Submissions.add({
    formId: form.id,
    respondent:md5(`${form.id}:${randomString(16)}`),
  });

  await Answers.addMany(Object.entries(answers).map(([questionId, value]) => ({
    submissionId,
    questionId: parseInt(questionId),
    value: value.toString(),
  })))

  process.exit(0);
})();
