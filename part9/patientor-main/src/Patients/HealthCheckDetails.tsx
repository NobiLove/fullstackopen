// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { HealthCheckEntry } from "../types";
import React from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";

const HealthCheckDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  const functionWithSwitch = (parameter: number): string => {
    switch (parameter) {
      case 0:
        return "inherit";
      case 1:
        return "primary";
      case 2:
        return "error";
      case 3:
        return "secondary";
      default:
        return "disabled";
    }
  };
  return (
    <div className="App">
      <FavoriteIcon color={functionWithSwitch(entry.healthCheckRating)} />
    </div>
  );
};

export default HealthCheckDetails;
