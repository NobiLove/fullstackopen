import { OccupationalHealthcareEntry } from "../types";

const OccupationalHealthcareDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <div className="App">
      <p>Employer: {entry.employerName}</p>
      <p>Start Date: {entry.sickLeave?.startDate}</p>
      <p>End Date: {entry.sickLeave?.endDate}</p>
    </div>
  );
};

export default OccupationalHealthcareDetails;
