export type PersonalInfo = {
  full_name: string;
  phone_number: string;
  email_address: string;
  marital_status: string;
  children: number;
  type_of_residence: string;
};

type EducationAndEmployment = {
  level_of_education: string;
  employment_status: string;
  sector_of_employment: string;
  duration_of_employment: string;
  office_email: string;
  monthly_income: string;
  loan_repayment: string;
};

type Socials = {
  twitter: string;
  facebook: string;
  instagram: string;
};

type Guarantor = {
  full_name: string;
  phone_number: string;
  email_address: string;
  relationship: string;
};

export type UserDetails = {
  id: string;
  tier: string;
  account_balance: string;
  bvn: string;
  bank: string;
  personal_info: PersonalInfo;
  education_and_employment: EducationAndEmployment;
  socials: Socials;
  guarantor: Guarantor;
};

export type User = {
  id: number;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: string;
  user_details: UserDetails;
};