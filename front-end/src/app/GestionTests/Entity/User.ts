export enum Role {
 STUDENT = 'STUDENT',
 TUTOR = 'TUTOR',

}

export interface User {
 id: number;
 username: string;
 email: string;
 password?: string;
 role: Role;
 status: string;
 // Add any other properties your backend returns
}