

import { Test } from "./Test";

export class Certificate {
 idCertificate!: number;
 test!: Test; // One-to-one relationship with Test
 date!: Date;
 nomCertificate!: string;
}