/**
 * Hello 👋
 *
 * This piece of code was only used to generate a large amount of data for testing purposes.
 * It is not relevant to the coding test itself. You can safely ignore this file.
 */

import 'dotenv/config';
import { faker } from '@faker-js/faker';

import { Answers, Forms, Question, Questions, Submissions } from '~/database';
import { md5, randomString } from '~/services';
import { logger } from '~/utils';

const CHUNK_SIZE = 250;

const forms = [
  {
    submissions: 3,
    id: -1,
    title: 'Debug Form',
    questions: [
      {
        id: -1,
        title: 'What is your name?',
        type: 'text-short',
        get value() {
          return faker.person.firstName();
        }
      },
      {
        id: -1,
        title: 'Do you enjoy using Tally?',
        type: 'linear-scale',
        get value() {
          return faker.number.int({ min: 7, max: 10 });
        }
      },
    ],
  },
  {
    submissions: 1_000_000,
    id: -1,
    title: 'IKEA Customer Satisfaction Survey',
    questions: [
      {
        id: -1,
        title: 'How would you rate your experience with the support agent?',
        type: 'linear-scale',
        get value() {
          return faker.number.int({ min: 6, max: 10 });
        }
      },
      {
        id: -1,
        title: 'Anything else you would like to share?',
        type: 'text-long',
        get value() {
          return faker.lorem.paragraph(2);
        }
      },
    ],
  },
  {
    submissions: 500_000,
    id: -1,
    title: 'Google Cloud Developer Survey',
    questions: [
      {
        id: -1,
        title: 'What is your name?',
        type: 'text-short',
        get value() {
          return faker.person.fullName();
        }
      },
      {
        id: -1,
        title: 'What is your email?',
        type: 'text-short',
        get value() {
          return faker.internet.email().toLowerCase();
        }
      },
      {
        id: -1,
        title: 'How satisfied are you with the overall experience?',
        type: 'linear-scale',
        get value() {
          return faker.number.int({ min: 1, max: 7 });
        }
      },
      {
        id: -1,
        title: 'How satisfied are you with the product offering?',
        type: 'linear-scale',
        get value() {
          return faker.number.int({ min: 4, max: 9 });
        }
      },
      {
        id: -1,
        title: 'How satisfied are you with the documentation?',
        type: 'linear-scale',
        get value() {
          return faker.number.int({ min: 2, max: 7 });
        }
      },
      {
        id: -1,
        title: 'How likely are you to recommend Google Cloud to a friend or colleague?',
        type: 'linear-scale',
        get value() {
          return faker.number.int({ min: 3, max: 7 });
        }
      },
      {
        id: -1,
        title: 'Anything else you would like to share?',
        type: 'text-long',
        get value() {
          return faker.lorem.paragraph(2);
        }
      },
    ],
  },
  {
    submissions: 250_000,
    id: -1,
    title: 'Foods Survey',
    questions: [
      {
        id: -1,
        title: 'How likely are you to order something from Uber Eats during the next 30 days?',
        type: 'linear-scale',
        get value() {
          return faker.number.int({ min: 0, max: 4 });
        }
      },
      {
        id: -1,
        title: 'Do you enjoy cooking?',
        type: 'linear-scale',
        get value() {
          return faker.number.int({ min: 0, max: 3 });
        }
      },
      {
        id: -1,
        title: 'What is your favorite fruit?',
        type: 'text-short',
        get value() {
          return faker.food.fruit();
        }
      },
    ],
  },
];

const formatBigNumber = (number: number) => {
  return number.toLocaleString('en-US', { maximumFractionDigits: 2 });
};

const formatElapsedTime = (start: number) => {
  const elapsed = Date.now() - start;
  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

  return `${hours}h ${minutes}m ${seconds}s`;
};

(async () => {
  const start = Date.now();

  logger.wait(`Generating forms...`);
  await Promise.all(forms.map(async (form) => {
    form.id = await Forms.add({ title: form.title });

    await Promise.all(form.questions.map(async (question) => {
      question.id = await Questions.add({
        formId: form.id,
        title: question.title,
        type: question.type as Question['type'],
      });
    }));

    logger.trace(`Generated form ${form.id} with ${form.questions.length} questions`);
  }));
  logger.event(`Generated ${forms.length} forms`);
  console.log();

  logger.wait(`Generating form submissions... (${formatElapsedTime(start)})`);
  forms.forEach(() => logger.trace('0.0%'));

  let totalAnswers = 0;
  const formProgress = new Map(forms.map(f => [f.id, 0]));

  const maxSubmissions = Math.max(...forms.map(f => f.submissions));
  for (let chunk = 0; chunk < maxSubmissions; chunk += CHUNK_SIZE) {
    const formPromises = forms.map(async (form) => {
      if (chunk >= form.submissions) return;

      const chunkSize = Math.min(CHUNK_SIZE, form.submissions - chunk);
      const submissionPromises = [];

      for (let i = 0; i < chunkSize; i++) {
        const submissionIndex = chunk + i + 1;
        const respondent = md5(`${form.id}:${submissionIndex}.${randomString(16)}`);
        const submissionId = await Submissions.add({
          formId: form.id,
          respondent,
        });

        submissionPromises.push(
          Answers.addMany(form.questions.map((question) => ({
            submissionId,
            questionId: question.id,
            value: question.value.toString(),
          })))
        );
      }

      await Promise.all(submissionPromises);

      formProgress.set(form.id, chunk + chunkSize);
      totalAnswers += chunkSize * form.questions.length;

      process.stdout.write('\x1B[2K\x1B[1G');
      process.stdout.write('\x1b[' + (forms.length + 1) + 'A');

      logger.wait(`Generating form submissions... (${formatElapsedTime(start)})`);

      forms.forEach(f => {
        const progress = formProgress.get(f.id)!;
        process.stdout.write('\x1B[2K');
        logger.trace(`${f.title}: ${((progress / f.submissions) * 100).toFixed(1)}%`);
      });
    });

    await Promise.all(formPromises);
  }

  const totalSubmissions = forms.reduce((acc, form) => acc + form.submissions, 0);
  logger.event(`Generated ${formatBigNumber(totalSubmissions)} submissions with ${formatBigNumber(totalAnswers)} answers for ${forms.length} forms`);

  process.exit(0);
})();
