export type User = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  gender?: string;
  phone?: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  role: "user" | "admin";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
};