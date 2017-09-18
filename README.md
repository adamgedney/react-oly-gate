#### Usage
To add the Authentication gate and the Centralizer to your project:
1. Include the oly-sdk & react-oly-gate package
2. Import the Gate & instantiate it with your branding info and credentials


```
import {Oly} from '@olympusat/oly-sdk';
import {Gate} from '@olympusat/react-oly-gate';
import getOlySdkOptions from "./olySdkOptions";
import getOlyGateOptions from "./olyGateOptions";
new Oly(getOlySdkOptions());
new Gate(getOlyGateOptions());


```

## Referrer
If a referrer is set in localstorage, then the sdk will redirect to that url on login.`localStorage.setItem('olyauth.referrer',window.location.href);`

## APP_CLIENT_ID
This is the Id of your User Pool

## USER_POOL_ID
The Id of the User Pool in Cognito that you'd like to use

## IDENTITY_POOL_ID
The Id of the Federated Identities Pool set up in Cognito. 
The APP_CLIENT_ID & USER_POOL_ID of your User Pool should be added as Cognito Authentication Providers in the Federated IDentity Pool settings.

##ENDPOINT_USERS
The GraphQL endpoint for your users service.

## ENDPOINT_APPS
The GraphQL endpoint for your apps service.



#### Resources


### Requirements
The application must have a route named "auth" that will be used as our callback and a safe route to host the Gate component

## Features


Notes:
The auth services works through the Users api. 
There are public methods in the auth service that the user service triggers on load to reveal the auth gate.

utils.OlyAuthMeta is where you theme the auth gate from.

## Gotchas ##
If you run into issues, first check that these packages are exactly these versions. AWS changed their sdk at some point after, introducing breaking changes


```
"aws-sdk":"2.7.9",
"amazon-cognito-identity-js":"1.8.0"
```
