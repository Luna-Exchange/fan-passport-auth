import { EncryptTokenArg, Environment } from "./types";
import {
  ICC_API_BASE_URL_DEV,
  ICC_API_BASE_URL_PROD,
  ICC_API_BASE_URL_STAGING,
} from "./constants";

/**
 * This class provides methods to authenticate users with the ICC application.
 * It provides methods to encrypt the volt token, validate the encrypted token,
 * and revoke the access token.
 * The class is initialized with the environment (development, staging, or production).
 * The default environment is development.
 */
export class ICCPassportAuth {
  private apiBaseURL: string;
  private defaultHeaders: {
    accept: string;
    "Content-Type": string;
  };

  constructor(environment: Environment = "development") {
    switch (environment) {
      case "production":
        this.apiBaseURL = ICC_API_BASE_URL_PROD;
        break;
      case "staging":
        this.apiBaseURL = ICC_API_BASE_URL_STAGING;
        break;
      default:
        this.apiBaseURL = ICC_API_BASE_URL_DEV;
    }

    this.defaultHeaders = {
      accept: "application/json",
      "Content-Type": "application/json",
    };
  }

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
  async encryptToken({
    token,
    name,
    email,
    tenantId,
  }: EncryptTokenArg): Promise<string> {
    const payload = {
      authToken: token,
      name,
      email,
      username: tenantId,
    };
    const response = await fetch(`${this.apiBaseURL}/auth/encode`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        ...this.defaultHeaders,
      },
    });

    const encodedToken = await response.json();

    return encodedToken.token;
  }

  /**
   * This function validates the encrypted token,
   * and creates a user instance on the fan passport application if necessary.
   *
   * @param token - The encrypted token to validate.
   * @returns - The access token for the user.
   */
  async validateToken(token: string): Promise<string> {
    const response = await fetch(`${this.apiBaseURL}/auth/login`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: {
        ...this.defaultHeaders,
      },
    });

    const validateResponseJson = await response.json();
    return validateResponseJson.accessToken;
  }

  /**
   * This function revokes the access token.
   * It should be called when the user logs out of the ICC application.
   * @param token - The ICC access token of the user.
   * @returns
   */
  async revokeAccessToken(token: string) {
    const response = await fetch(`${this.apiBaseURL}/auth/logout`, {
      method: "POST",
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
    });

    return await response.json();
  }
}
