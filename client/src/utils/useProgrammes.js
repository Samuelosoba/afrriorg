import { useContext } from "react";
import { ProgrammeContext } from "../context/programmeContext";
export function useProgrammes() {
  return useContext(ProgrammeContext);
}
