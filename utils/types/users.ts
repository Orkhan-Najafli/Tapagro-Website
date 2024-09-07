export interface User {
  firstName: string;
  lastName: string;
  fatherName: string;
  contactDetails: {
    phoneNumber: string;
    emailAddress: string;
  };
  city: {
    id: number;
    name: string;
  };
  storeName: string;
}
