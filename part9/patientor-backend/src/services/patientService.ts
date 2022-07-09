import patientsData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { NewPatient, NonSensitivePatientEntry, Patient } from '../../types';

const findById = (id: string): Patient | undefined => {
  const entry = patientsData.find(d => d.id === id);
  return entry;
};

const getEntries = (): Array<Patient> => {
  return patientsData;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, occupation, gender, dateOfBirth }) => ({
    id,
    name,
    occupation,
    gender,
    dateOfBirth
  }));
};

const addEntry = (entry: NewPatient): Patient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const uuid = uuidv4();
  const newDiaryEntry = {
    id: uuid,
    ...entry
  };

  patientsData.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById
};