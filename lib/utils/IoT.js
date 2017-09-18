"use strict";

var config = {
  identityPoolId: "us-east-1:7c7ffb19-3c3d-41a7-9e5e-cb67887342e6", // 'YourCognitoIdentityPoolId'
  loginId: "cognito-idp.us-east-1.amazonaws.com/us-east-1_djdjKn4ge",
  userPoolId: "us-east-1_djdjKn4ge",
  cognitoClientId: "2h6jjk2rrhhpaqg1sr2a8l8au9",
  host: "a1uuut53k2gxhi.iot.us-east-1.amazonaws.com", // 'YourAwsIoTEndpoint', e.g. 'prefix.iot.us-east-1.amazonaws.com'
  authRol: "arn:aws:iam::603127604728:role/Cognito_UserServiceAuth_Role",
  region: "us-east-1" // 'YourAwsRegion', e.g. 'us-east-1'
};
var AWSIoTData = require('aws-iot-device-sdk');

AWS.config.region = config.region;

(function () {
  "use strict";

  function LogMsg(type, content) {
    this.type = type;
    this.content = content;
    this.createdTime = Date.now();
    if (this.type === "success") {
      this.className = "list-group-item-info";
    } else {
      this.className = "list-group-item-danger";
    }
  }

  function LogService() {
    this.logs = [];
  }

  LogService.prototype.log = function (msg) {
    var logObj = new LogMsg("success", msg);
    this.logs.push(logObj);
  };

  LogService.prototype.logError = function (msg) {
    var logObj = new LogMsg("error", msg);

    this.logs.push(logObj);
  };

  /**
   * wrapper of received paho message
   * @class
   * @param {Paho.MQTT.Message} msg
   */
  function ReceivedMsg(topic, message) {
    this.topic = topic;
    this.message = message;
    this.receivedTime = Date.now();
  }

  /** controller of the app */
  function AppController(scope) {
    this.clientId = "mqtt-client-" + Math.floor(Math.random() * 100000 + 1);
    this.endpoint = config.host;
    this.identityId = null;
    this.accessKey = null;
    this.secretKey = null;
    this.sessionToken = null;
    this.regionName = config.region;
    this.user = '';
    this.password = '';
    this.scope = scope;

    this.subscriptionChannel = null;
    this.logs = new LogService();
    this.clients = [];
  }

  AppController.$inject = ["$scope"];

  AppController.prototype.connectToCognito = function () {
    var authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails({
      Username: this.user,
      Password: this.password
    });

    var userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool({
      UserPoolId: config.userPoolId,
      ClientId: config.cognitoClientId
    });

    var cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser({
      Username: this.user,
      Pool: userPool
    });

    var _this = this;
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function onSuccess(result) {
        var loginMap = {};
        loginMap[config.loginId] = result.getIdToken().getJwtToken();

        /*Use the idToken for Logins Map when Federating User Pools with Cognito Identity or when passing through an Authorization Header to an API Gateway Authorizer*/

        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: config.identityPoolId,
          Logins: loginMap,
          RoleArn: "arn:aws:iam::603127604728:role/Cognito_UserServiceAuth_Role"
        });

        AWS.config.credentials.get(function (err, data) {
          if (!err) {
            console.log("Retrieved identityId: " + AWS.config.credentials.identityId);
            var cognitoIdentity = new AWS.CognitoIdentity();
            _this.accessKey = AWS.config.credentials.accessKeyId;
            _this.secretKey = AWS.config.credentials.secretAccessKey;
            _this.identityId = AWS.config.credentials.identityId;
            _this.sessionToken = AWS.config.credentials.sessionToken;
            _this.createClient();
          } else {
            console.log("error retrieving identity:" + err);
          }
        });
      },

      onFailure: function onFailure(err) {
        console.log(err);
        _this.logs.logError(err.toString());
      }
    });
  };

  AppController.prototype.createClient = function () {

    var client = AWSIoTData.device({
      //
      // Set the AWS region we will operate in.
      //
      region: this.regionName,
      //
      ////Set the AWS IoT Host Endpoint
      host: this.endpoint.toLowerCase(),
      //
      // Use the clientId created earlier.
      //
      clientId: this.clientId,
      //
      // Connect via secure WebSocket
      //
      protocol: 'wss',
      //
      // Set the maximum reconnect time to 8 seconds; this is a browser application
      // so we don't want to leave the user waiting too long for reconnection after
      // re-connecting to the network/re-opening their laptop/etc...
      //
      maximumReconnectTimeMs: 5000,
      //
      // Enable console debugging information (optional)
      //
      // debug: true,
      accessKeyId: this.accessKey,
      secretKey: this.secretKey,
      sessionToken: this.sessionToken
    });
    var client = new ClientController(this.scope, this.clientId, client, this.logs);

    this.clients.push(client);

    if (this.scope && !this.scope.$$phase) {
      this.scope.$digest();
    }
  };

  function ClientController(scope, clientName, client, logs) {
    this.clientName = clientName;
    this.client = client;
    this.topicName = "system/broadcast";
    this.message = null;
    this.scope = scope;
    this.msgs = [];
    this.logs = logs;
    var self = this;

    this.client.on("connect", function () {
      self.logs.log("connected");
    });
    this.client.on("message", function (topic, msg) {
      console.log(msg.toString());
      self.logs.log("messageA received in " + topic);
      self.msgs.push(new ReceivedMsg(topic, msg.toString()));
      if (this.scope && !this.scope.$$phase) {
        this.scope.$digest();
      }
    });
  }

  ClientController.prototype.subscribe = function () {
    this.client.subscribe(this.topicName);
  };

  ClientController.prototype.publish = function () {
    this.client.publish(this.topicName, this.message);
  };

  ClientController.prototype.msgInputKeyUp = function ($event) {
    if ($event.keyCode === 13) {
      this.publish();
    }
  };

  angular.module("awsiot.sample", []).controller("AppController", AppController);
})();