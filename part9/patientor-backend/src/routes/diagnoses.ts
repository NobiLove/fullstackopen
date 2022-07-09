import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosisService.getEntries());
});

router.get('/:id', (req, res) => {
  const diagnosis = diagnosisService.findById(req.params.id);

  if (diagnosis) {
    res.send(diagnosis);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  res.send('post');
});

export default router;