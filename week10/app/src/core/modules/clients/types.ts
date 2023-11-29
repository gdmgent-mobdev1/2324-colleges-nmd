export type Client = {
  _id: string;
  name: string;
  contactPerson: {
    firstName: string;
    lastName: string;
    email: string;
  };
};
