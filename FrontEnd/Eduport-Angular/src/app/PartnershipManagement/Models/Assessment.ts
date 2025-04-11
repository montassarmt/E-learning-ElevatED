import { Partnership } from "./Partnership";
import { Status } from "./Status";
import {AcceptanceStatus} from "./AcceptanceStatus"


export interface Assessment {
    idAssessment: number;
    score: number;
    feedback: string;
    status: Status;
    acceptanceStatus: AcceptanceStatus;
    adminAcceptance: boolean;
    partnerAcceptance: boolean;
    partnership: Partnership;
  }
