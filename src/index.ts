import { EncryptTokenArg } from "./types";
import { ICC_API_BASE_URL } from "./constants";
/**
 * This function encrypts the volt token and returns it.
 * This encrypted token will  be included in a URL when redirecting users to the
 * fan passport application.
 *
 * @param param0.token - The volt token to encrypt.
 * @param param0.name - The name of the user (firstName lastName).
 * @param param0.email - The email of the user.
 * @param param0.tenantId - The username of the user (tenantId).
 *
 * @returns - The encrypted jwt token, set to expire in one hour.
 */
export const encryptToken = async ({
  token,
  name,
  email,
  tenantId,
}: EncryptTokenArg): Promise<string> => {
  const payload = {
    authToken: token,
    name,
    email,
    username: tenantId,
  };
  const response = await fetch(`${ICC_API_BASE_URL}/auth/encode`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  console.log(response, "respose");
  const encodedToken = await response.json();
  console.log("encodedToken", encodedToken);

  return encodedToken;
};

/**
 * This function validates the encrypted token,
 * and creates a user instance on the fan passport application if necessary.
 *
 * @param token - The encrypted token to validate.
 */
export const validateToken = async (token: string) => {
  const response = await fetch(`${ICC_API_BASE_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ token }),
  });

  return await response.json();
};

/**
 * This function revokes the access token.
 * It should be called when the user logs out of the ICC application.
 * @param token - The ICC access token of the user.
 * @returns
 */
export const revokeAccessToken = async (token: string) => {
  const response = await fetch(`${ICC_API_BASE_URL}/auth/revoke`, {
    method: "POST",
    body: JSON.stringify({ token }),
  });

  return await response.json();
};
