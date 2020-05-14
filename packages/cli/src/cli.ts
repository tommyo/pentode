/* eslint-disable no-console */
import * as yargs from 'yargs';

// interface
export default function () {
  const { argv } = yargs
    .usage('$0: Tell the people what they\'ve won!')
    .options({});

  console.log(argv);
}
