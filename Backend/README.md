# Backend API Documentation

This file documents the two user-related endpoints currently implemented.

---

## 1. Register

**`POST /users/register`**

**Description:**
Create a new account by supplying full name, email and password. The email must be unique and the password will be hashed.

**Request body (`application/json`):**

```json
{
  "fullname": { "firstname": "John", "lastname": "Doe" },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

- `fullname.firstname`: string, required (min 3 chars)
- `fullname.lastname`: string, optional (min 3 chars if provided)
- `email`: valid email, required, unique
- `password`: string, required (min 6 chars)

**Success (201 Created):**

```json
{ "token": "<jwt>", "user": { "_id": "...", "email": "john.doe@example.com", ... } }
```

**Errors:**

- `400` with validation details or `Email already registered`
- `500` on server/db failure

---

## 2. Login

**`POST /users/login`**

**Description:**
Authenticate an existing user. The server **does not disclose** whether the email or password was wrong – you will receive a generic message instead. On success a JSON Web Token is returned in the body and set as an `HttpOnly` cookie named `token`.

**Request body (`application/json`):**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

- `email`: valid email, required
- `password`: string, required (min 6 chars)

**Successful response (200 OK):**

```json
{
  "token": "<jwt>",
  "user": { "_id": "...", "email": "john.doe@example.com", ... }
}
```

> The same token will also be sent in a `Set-Cookie` header. Clients that rely on cookies (e.g. browsers) can use the stored cookie instead of the JSON field.

**Failure responses:**

- `400` if request validation fails
- `401` with body `{ "message": "Invalid email or password" }` when credentials do not match any record.  
  (_This is the error you saw – it means either the email doesn't exist or the password is incorrect._)
- `500` on unexpected errors

---

> ⇨ ensure you call `/users/register` first and that the registration returns a token before attempting login.
>
> If you still receive the `Invalid email or password` message, verify the user exists in the database and that the password you supplied is exactly the one used during registration. The stored password is hashed, so you must supply the original plaintext.

---

## 3. Profile

**`GET /users/profile`**

**Description:**
Returns information about the currently authenticated user. The request must include a valid JWT in the `Authorization` header as `Bearer <token>` or the `token` cookie set by login.

**Request headers:**

- `Authorization`: `Bearer <jwt>` (optional if cookie is used)
- Cookie containing `token` (HttpOnly)

**Successful response (200 OK):**

```json
{
  "user": { "_id": "...", "email": "john.doe@example.com", "fullname": { "firstname": "John", "lastname": "Doe" }, ... }
}
```

**Errors:**

- `401` if the JWT is missing, expired, or invalid.
- `500` on server/db failure.

---

## 4. Logout

**`GET /users/logout`**

**Description:**
Invalidates the user's session by adding the supplied token to a blacklist and clearing the `token` cookie. The user must be authenticated (same requirements as `/profile`).

**Request headers:**

- `Authorization`: `Bearer <jwt>` (or rely on the `token` cookie)

**Successful response (200 OK):**

```json
{ "message": "Logged out successfully" }
```

**Errors:**

- `401` if the user is not authenticated.
- `500` on internal errors.

---
