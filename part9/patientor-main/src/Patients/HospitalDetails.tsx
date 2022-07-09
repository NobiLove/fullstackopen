import { HospitalEntry } from "../types";

const HospitalDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div className="App">
      {entry.discharge.date} {entry.discharge.criteria}
    </div>
  );
};

export default HospitalDetails;
