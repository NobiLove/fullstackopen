interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const generateObj = (args: Array<string>): Result => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2]))) {
    let trainingDays = 0;
    let totalHours = 0;
    for (let index = 3; index < args.length; index++) {
      if (Number(args[index]) > 0) {
        trainingDays++;
        totalHours = totalHours + Number(args[index]);
      }
    }
    const average = totalHours / trainingDays;

    return {
      periodLength: args.length - 3,
      trainingDays: trainingDays,
      success: totalHours >= Number(args[2]) ? true : false,
      rating: average,
      ratingDescription: average > 1 ? `keep it up` : `work harder`,
      target: Number(args[2]),
      average: average
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const obj = generateObj(process.argv);
  console.log(obj);
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}

module.exports = {
  generateObj
};