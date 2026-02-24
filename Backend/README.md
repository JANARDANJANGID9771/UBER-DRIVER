# Backend API Documentation

## User Registration Endpoint

### `POST /users/register`

Registers a new user in the system.

#### Description
This endpoint allows clients to create a new user by providing their full name, email, and password. The request body is validated using `express-validator` and a hashed password is stored in the database. On success, a JSON Web Token is returned along with the user information (excluding the password).

#### Request Format
Content-Type: `application/json`

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"        
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

- `fullname.firstname` (string, required): At least 3 characters.
- `fullname.lastname` (string, optional): At least 3 characters if provided.
- `email` (string, required): Must be a valid email format and at least 5 characters.
- `password` (string, required): Minimum 6 characters.

#### Responses

- **201 Created**
  - Body: `{ "token": "<jwt-token>", "user": { ... } }`
  - Indicates successful registration; the `token` can be used for authenticated requests.

- **400 Bad Request**
  - Body: `{ "errors": [ { "msg": "<error message>", ... } ] }`
  - Returned when validation fails or required fields are missing.

- **500 Internal Server Error**
  - Returned on unexpected server/database errors.

#### Notes
- Passwords are hashed using bcrypt before being saved.
- The `token` is generated with `jwt.sign` using `process.env.JWT_SECRET`.

---

> This documentation is located in the `Backend/README.md` file. Adjust as needed when other endpoints are added.