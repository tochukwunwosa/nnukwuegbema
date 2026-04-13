import { ObjectId } from "mongodb";

export interface Spouse {
  name: string;
  marriageYear: string;
}

export interface Child {
  name: string;
  birthYear: string;
}

export interface FamilyMember {
  _id?: ObjectId;
  fullName: string;
  knownAs: string;
  gender: "M" | "F" | "";
  birthYear: string;
  birthPlace: string;
  deathYear: string;
  status: "Living" | "Deceased" | "";
  fatherName: string;
  motherName: string;
  occupation: string;
  education: "None" | "Primary" | "Secondary" | "Tertiary" | "";
  achievements: string;
  biography: string;
  phone: string;
  spouses: Spouse[];
  children: Child[];
}

export interface Submission {
  _id?: ObjectId;
  submittedBy: string;
  submitterRelation: string;
  submitterContact: string;
  submitterDate: string;
  changedFields: string[];
  versionNumber: number;
  additionalNotes: string;
  submittedAt?: Date;
}

export interface Family {
  _id?: ObjectId;
  kindredId: string;
  kindredName: string;
  familyName: string;
  alternativeNames: string;
  foundedYear: string;
  originLocation: string;
  familyDescription: string;
  notableAchievements: string;
  members: FamilyMember[];
  submissions: Submission[];
  lastUpdated: Date;
  versionNumber: number;
  status: "active" | "pending" | "merged";
}

export interface Kindred {
  _id?: ObjectId;
  name: string;
  description?: string;
  createdAt?: Date;
}
