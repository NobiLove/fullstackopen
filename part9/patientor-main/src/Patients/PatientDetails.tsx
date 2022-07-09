import { Box, Button, Grid } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Patient } from "../types";
import { SetPatientAction } from "../state/reducer";
import PatientEntry from "./PatientEntry";
import AddEntryModal from "../AddEntryModal";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        if (id != patient.id) {
          const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id || ''}`);
          dispatch(SetPatientAction(patientFromApi));
        }
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, []);

  const submitNewEntry = () => {
    console.log('');
  };

  return (
    <div className="App">
      <Box>
        <h1>{patient.name}</h1>
      </Box>
      <Box>
        <Grid container >
          <Grid item xs={12}>Gender: {patient.gender}</Grid>
          <Grid item xs={12}>Occupation: {patient.occupation}</Grid>
          <Grid item xs={12}>SSN: {patient.ssn}</Grid>
        </Grid>
      </Box>
      <Box>
        <h3>Entries</h3>
      </Box>
      <Box>
        {patient.entries?.map(e =>
          <Box key={e.id} border={1} borderRadius={10}>
            <p>{e.date} {e.description}</p>
            <PatientEntry entry={e} />
            <p>Specialist: {e.specialist}</p>
          </Box>
        )}
      </Box>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientDetails;
