export interface Influencer {
  id: string;
  name: string;
  nameEn: string;
  dateOfBirth: string;
  age: number;
  nationality: string;
  occupation: string;
  height: string;
  weight?: string;
  bloodType?: string;
  followers: string;
  platforms: string[];
  contentCategories: string[];
  profileImage: string;
  gallery: string[];
}
