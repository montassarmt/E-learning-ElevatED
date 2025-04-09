import { Proposal } from './Proposal';
import { Entreprise } from './Entreprise';
import { PartnershipStatus } from './ParntershipStatus';  // Define this enum as needed
import { Assessment } from './Assessment';

export interface Partnership {
  idPartnership: number;
  score: number;
  partnershipStatus: PartnershipStatus;
  entreprise?: Entreprise | null;
  proposals?: Proposal;
  Assesements?: Assessment[];
}
