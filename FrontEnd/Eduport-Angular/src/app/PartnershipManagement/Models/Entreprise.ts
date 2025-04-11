import { Partnership } from "./Partnership";
import { User } from "./User";

export interface Entreprise{
        idEntreprise: number;
        nameEntreprise: string;
        addressEntreprise: string;
        phoneEntreprise: string;
        emailEntreprise: string;
        descriptionEntreprise: string;
        partner?: User;
        partnerships?: Partnership[]; 
}