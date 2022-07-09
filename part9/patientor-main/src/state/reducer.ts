import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  } |
  {
    type: "ADD_PATIENT";
    payload: Patient;
  } |
  {
    type: "SET_PATIENT";
    payload: Patient;
  } |
  {
    type: "SET_DIAGNOSES_LIST";
    payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce((memo, patient) => ({ ...memo, [patient.id]: patient }), {}),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: { ...state.patients },
        patient: { ...action.payload }
      };
    case "SET_DIAGNOSES_LIST":
      return {
        ...state,
        patients: { ...state.patients },
        patient: { ...state.patient },
        diagnoses: { ...action.payload }
      };
    default:
      return state;
  }
};

export const SetPatientListAction = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi
  };
};

export const AddPatientAction = (newPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: newPatient
  };
};

export const SetPatientAction = (patientFromApi: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patientFromApi
  };
};

export const SetDiagnosesListAction = (diagnosesListFromApi: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSES_LIST',
    payload: diagnosesListFromApi
  };
};