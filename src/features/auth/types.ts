export type User = {
  id: string;
  email: string;
  name?: string | null;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
