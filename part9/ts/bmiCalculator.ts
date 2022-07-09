interface MultiplyValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const generateText = (height: number, weight: number): string => {
  const alturaEnCm = height / 100;
  const bmi = weight / (alturaEnCm * alturaEnCm);

  if (bmi < 16) return `Underweight (Severe thinness)`;
  if (bmi >= 16 && bmi < 16.9) return `Underweight (Moderate thinness)`;
  if (bmi >= 16.9 && bmi < 18.4) return `Underweight (Mild thinness)`;
  if (bmi >= 18.4 && bmi < 24.9) return `Normal range`;
  if (bmi >= 24.9 && bmi < 29.9) return `Overweight (Pre-obese)`;
  if (bmi >= 29.9 && bmi < 34.9) return `Obese (Class I)`;
  if (bmi >= 34.9 && bmi < 40) return `Obese (Class II)`;
  if (bmi > 40) return `Obese (Class III)`;
  throw new Error();
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(generateText(height, weight));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message);
}

module.exports = {
  generateText
};

