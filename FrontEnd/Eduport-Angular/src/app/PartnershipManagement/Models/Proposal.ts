import { Partnership } from './Partnership';

export interface Proposal {
  idProposal: number;
  proposalName: string;
  proposalDescription: string;
  startDate: string;
  endDate: string;
  plannedAmount: number;
  proposalStatus: string;
  proposalType: string;
  applications?: Partnership[];  // Updated to handle Partnership applications
}