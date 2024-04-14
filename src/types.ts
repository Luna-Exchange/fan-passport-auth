export type EncryptTokenArg = {
  token: string;
  name: string;
  email: string;
  tenantId: string;
};

export type Environment = "staging" | "production" | "development";
