import diagnosisData from '../../data/diagnoses';

import { Diagnosis } from '../../types';

const findById = (id: string): Diagnosis | undefined => {
  const entry = diagnosisData.find(d => d.code === id);
  return entry;
};

const getEntries = (): Array<Diagnosis> => {
  return diagnosisData;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  findById
};