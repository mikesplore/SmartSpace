{
  "swagger": "2.0",
  "info": {
    "title": "eventspace-api",
    "description": "A REST API for an event-space system.",
    "termsOfService": "https://www.google.com/policies/terms/",
    "license": {
      "name": "BSD License"
    },
    "version": "v1"
  },
  "host": "127.0.0.1:8000",
  "schemes": [
    "http"
  ],
  "basePath": "/api",
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "securityDefinitions": {
    "Basic": {
      "type": "basic"
    }
  },
  "security": [
    {
      "Basic": []
    }
  ],
  "paths": {
    "/spaces/": {
      "get": {
        "operationId": "spaces_list",
        "summary": "List all spaces",
        "description": "Get a list of all available event spaces",
        "parameters": [],
        "responses": {
          "200": {
            "description": "List of spaces retrieved successfully",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Space"
              }
            }
          }
        },
        "tags": [
          "spaces"
        ]
      },
      "parameters": []
    },
    "/spaces/create/": {
      "post": {
        "operationId": "spaces_create_create",
        "summary": "Create a new space",
        "description": "Create a new event space with the provided details",
        "parameters": [
          {
            "name": "data",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Space"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "Space created successfully",
            "schema": {
              "$ref": "#/definitions/Space"
            }
          },
          "400": {
            "description": "Bad request - validation errors",
            "schema": {
              "type": "object",
              "properties": {
                "error": {
                  "type": "string"
                }
              }
            }
          }
        },
        "tags": [
          "spaces"
        ]
      },
      "parameters": []
    },
    "/users/login/": {
      "post": {
        "operationId": "users_login_create",
        "summary": "Login user to get generate JWT token.",
        "description": "",
        "parameters": [
          {
            "name": "data",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/Login"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/Login"
            }
          }
        },
        "tags": [
          "users"
        ]
      },
      "parameters": []
    },
    "/users/logout/": {
      "post": {
        "operationId": "users_logout_create",
        "summary": "Log out a user.",
        "description": "",
        "parameters": [
          {
            "name": "data",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/LogoutUsererializer"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/LogoutUsererializer"
            }
          }
        },
        "tags": [
          "users"
        ]
      },
      "parameters": []
    },
    "/users/password-reset-confirm/{uidb64}/{token}/": {
      "get": {
        "operationId": "users_password-reset-confirm_read",
        "summary": "Confirm Password.",
        "description": "",
        "parameters": [],
        "responses": {
          "200": {
            "description": ""
          }
        },
        "tags": [
          "users"
        ]
      },
      "parameters": [
        {
          "name": "uidb64",
          "in": "path",
          "required": true,
          "type": "string"
        },
        {
          "name": "token",
          "in": "path",
          "required": true,
          "type": "string"
        }
      ]
    },
    "/users/password-reset/": {
      "post": {
        "operationId": "users_password-reset_create",
        "summary": "Request for a password reset.",
        "description": "",
        "parameters": [
          {
            "name": "data",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/PasswordResetRequest"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/PasswordResetRequest"
            }
          }
        },
        "tags": [
          "users"
        ]
      },
      "parameters": []
    },
    "/users/register/": {
      "post": {
        "operationId": "users_register_create",
        "summary": "Register a user.",
        "description": "",
        "parameters": [
          {
            "name": "data",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/UserRegister"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/UserRegister"
            }
          }
        },
        "tags": [
          "users"
        ]
      },
      "parameters": []
    },
    "/users/set-new-password/": {
      "patch": {
        "operationId": "users_set-new-password_partial_update",
        "summary": "Set new password.",
        "description": "",
        "parameters": [
          {
            "name": "data",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/SetNewPassword"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/SetNewPassword"
            }
          }
        },
        "tags": [
          "users"
        ]
      },
      "parameters": []
    },
    "/users/verify-email/": {
      "post": {
        "operationId": "users_verify-email_create",
        "summary": "Verifying account using OTP sent to email",
        "description": "",
        "parameters": [
          {
            "name": "data",
            "in": "body",
            "required": true,
            "schema": {
              "required": [
                "otp"
              ],
              "type": "object",
              "properties": {
                "otp": {
                  "description": "One-Time Password (OTP) sent to user email",
                  "type": "string"
                }
              }
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Email verified successfully",
            "schema": {
              "type": "object",
              "properties": {
                "message": {
                  "description": "Success message",
                  "type": "string"
                }
              }
            }
          }
        },
        "tags": [
          "users"
        ]
      },
      "parameters": []
    }
  },
  "definitions": {
    "Space": {
      "required": [
        "name",
        "location",
        "capacity",
        "price_per_hour"
      ],
      "type": "object",
      "properties": {
        "id": {
          "title": "ID",
          "type": "integer",
          "readOnly": true
        },
        "name": {
          "title": "Name",
          "type": "string",
          "maxLength": 255,
          "minLength": 1
        },
        "location": {
          "title": "Location",
          "type": "string",
          "maxLength": 255,
          "minLength": 1
        },
        "capacity": {
          "title": "Capacity",
          "type": "integer",
          "maximum": 9.223372036854776e+18,
          "minimum": -9.223372036854776e+18
        },
        "image1": {
          "title": "Image1",
          "type": "string",
          "readOnly": true,
          "x-nullable": true,
          "format": "uri"
        },
        "image2": {
          "title": "Image2",
          "type": "string",
          "readOnly": true,
          "x-nullable": true,
          "format": "uri"
        },
        "image3": {
          "title": "Image3",
          "type": "string",
          "readOnly": true,
          "x-nullable": true,
          "format": "uri"
        },
        "image4": {
          "title": "Image4",
          "type": "string",
          "readOnly": true,
          "x-nullable": true,
          "format": "uri"
        },
        "image5": {
          "title": "Image5",
          "type": "string",
          "readOnly": true,
          "x-nullable": true,
          "format": "uri"
        },
        "status": {
          "title": "Status",
          "type": "string",
          "enum": [
            "booked",
            "free"
          ]
        },
        "description": {
          "title": "Description",
          "type": "string",
          "x-nullable": true
        },
        "equipment": {
          "title": "Equipment",
          "type": "string",
          "x-nullable": true
        },
        "features": {
          "title": "Features",
          "type": "string",
          "x-nullable": true
        },
        "price_per_hour": {
          "title": "Price per hour",
          "type": "string",
          "format": "decimal"
        },
        "created_at": {
          "title": "Created at",
          "type": "string",
          "format": "date-time",
          "readOnly": true
        },
        "updated_at": {
          "title": "Updated at",
          "type": "string",
          "format": "date-time",
          "readOnly": true
        }
      }
    },
    "Login": {
      "required": [
        "email",
        "password"
      ],
      "type": "object",
      "properties": {
        "email": {
          "title": "Email",
          "type": "string",
          "format": "email",
          "maxLength": 255,
          "minLength": 6
        },
        "password": {
          "title": "Password",
          "type": "string",
          "maxLength": 60,
          "minLength": 1
        },
        "access_token": {
          "title": "Access token",
          "type": "string",
          "readOnly": true,
          "maxLength": 255,
          "minLength": 1
        },
        "refresh_token": {
          "title": "Refresh token",
          "type": "string",
          "readOnly": true,
          "maxLength": 255,
          "minLength": 1
        }
      }
    },
    "LogoutUsererializer": {
      "required": [
        "refresh_token"
      ],
      "type": "object",
      "properties": {
        "refresh_token": {
          "title": "Refresh token",
          "type": "string",
          "minLength": 1
        }
      }
    },
    "PasswordResetRequest": {
      "required": [
        "email"
      ],
      "type": "object",
      "properties": {
        "email": {
          "title": "Email",
          "type": "string",
          "format": "email",
          "maxLength": 255,
          "minLength": 1
        }
      }
    },
    "UserRegister": {
      "required": [
        "email",
        "first_name",
        "last_name",
        "password",
        "password_confirm"
      ],
      "type": "object",
      "properties": {
        "id": {
          "title": "ID",
          "type": "integer",
          "readOnly": true
        },
        "email": {
          "title": "Email Address",
          "type": "string",
          "format": "email",
          "maxLength": 255,
          "minLength": 1
        },
        "first_name": {
          "title": "First Name",
          "type": "string",
          "maxLength": 100,
          "minLength": 1
        },
        "last_name": {
          "title": "Last Name",
          "type": "string",
          "maxLength": 100,
          "minLength": 1
        },
        "password": {
          "title": "Password",
          "type": "string",
          "maxLength": 68,
          "minLength": 6
        },
        "password_confirm": {
          "title": "Password confirm",
          "type": "string",
          "maxLength": 68,
          "minLength": 6
        }
      }
    },
    "SetNewPassword": {
      "required": [
        "password",
        "password_confirm",
        "uidb64",
        "token"
      ],
      "type": "object",
      "properties": {
        "password": {
          "title": "Password",
          "type": "string",
          "maxLength": 100,
          "minLength": 6
        },
        "password_confirm": {
          "title": "Password confirm",
          "type": "string",
          "maxLength": 100,
          "minLength": 6
        },
        "uidb64": {
          "title": "Uidb64",
          "type": "string",
          "minLength": 1
        },
        "token": {
          "title": "Token",
          "type": "string",
          "minLength": 1
        }
      }
    }
  }
}