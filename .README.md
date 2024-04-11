
# ICC Fan Passport Auth

This npm package provides a set of utilities for managing ICC tokens and authentication for the fan passport application. It facilitates secure communication between the main ICC applications and the ICC Fan Passport application by handling user authentication tokens. It exposes methods to
encryption users access token, decrypt the access token, and revoke the users access token. 

## Installation

To install the package, run the following command in your project directory:

```bash
npm install fan-passport-auth
```

## Usage

First, import the functions you need from the package:

```javascript
import { encryptToken, validateToken, revokeAccessToken } from 'fan-passport-auth';
```

### Encrypting a Token

To encrypt a token for secure transmission to the ICC Fan Passport application:

```javascript
import { EncryptTokenArg } from 'fan-passport-auth/types';

const tokenDetails: EncryptTokenArg = {
  token: 'yourVoltTokenHere',
  name: 'Samuel Olamide',
  email: 'samuel@olami.de',
  tenantId: 'tenantIdHere',
};

encryptToken(tokenDetails)
  .then((encryptedToken) => {
    console.log('Encrypted Token:', encryptedToken);
  })
  .catch((error) => {
    console.error('Error encrypting token:', error);
  });
```

### Validating a Token

To validate an encrypted token and possibly create a user instance:

```javascript
validateToken('yourEncryptedTokenHere')
  .then((response) => {
    console.log('Token validation response:', response);
  })
  .catch((error) => {
    console.error('Error validating token:', error);
  });
```

### Revoking an Access Token

To revoke an access token when a user logs out of the ICC application:

```javascript
revokeAccessToken('yourAccessTokenHere')
  .then((response) => {
    console.log('Access token revoked successfully:', response);
  })
  .catch((error) => {
    console.error('Error revoking access token:', error);
  });
```

## Support

For issues or feature requests, please open an issue on the GitHub repository associated with this package.
