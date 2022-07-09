import express from 'express';
import { generateText } from './bmiCalculator';
import { generateObj } from './exerciseCalculator';

const app = express();
app.use(express.json());

interface PostData {
  daily_exercises: Array<string>;
  target: string;
}

app.get('/ping', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  try {
    const data = (req.query);
    const weight = Number(data.weight);
    const height = Number(data.height);
    res.send({ weight: weight, height: height, bmi: generateText(height, weight) });
  } catch (error) {
    res.send({ error: "malformatted parameters" });
  }
});

app.post('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const postData: PostData = req.body;
    const arr = [``, ``];
    arr.push(postData.target);
    arr.push(...postData.daily_exercises);
    res.send(generateObj(arr));
  } catch (error) {
    res.send({ error: "malformatted parameters" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});