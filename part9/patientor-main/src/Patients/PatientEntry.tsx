import React from "react";
import OccupationalHealthcareDetails from "./OccupationalHealthcareDetails";
import HospitalDetails from "./HospitalDetails";
import HealthCheckDetails from "./HealthCheckDetails";
import { Entry } from "../types";

const PatientEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckDetails entry={entry} />;
    default:
      return null;
  }
};

export default PatientEntry;
