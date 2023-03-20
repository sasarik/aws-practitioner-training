## Module 7 Tasks

---

### Task 7.1

- [x] Created a new service called `authorization-service` at the same level as Product and Import services with its
  own `serverless.yml` file. The backend project structure look like this:
- [x] Created a lambda function called `basicAuthorizer` under the same Serverless config file (`serverless.yaml`)
  of the Authorization Service.
- [x] This lambda have one environment variable with the following credentials:
- [x] This `basicAuthorizer` lambda takes _Basic Authorization_ token, decode it and check that credentials
  provided by token exist in the lambda environment variable.
- [x] This returns 403 HTTP status if access is denied for this user (invalid `authorization_token`) and 401
  HTTP status if Authorization header is not provided.

---

### Task 7.2

- [x] Lambda authorization added to the `/import` path of the Import Service API Gateway.
- [x] The `basicAuthorizer` lambda used as the `/import` Lambda authorizer

---

### Task 7.3

- [x] Request from the client application to the `/import` path of the Import Service should have _Basic Authorization_
  header:
- [x] Client takes `authorization_token` value from
  browser [localStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage)

---

### Task 7.4

- [x] All work committed to separate branch (`task-7` from the latest `master`) in my own repository.
- [x] Created a pull request.
- [x] Submitted the link to the pull request for crosscheck

---

## Evaluation criteria(s) (70 points for covering all criteria)

- [x] `authorization-service` is added to the repo, has correct `basicAuthorizer` lambda and correct `serverless.yaml`
  file
- [x] Import Service `serverless.yaml` file has authorizer configuration for the `importProductsFile` lambda.
- [x] Request to the `importProductsFile` lambda works only with correct `authorization_token` being decoded and checked
  by `basicAuthorizer` lambda.
- [x] Response returns 403 HTTP status if access is denied for this user (invalid `authorization_token`)
  and in 401 HTTP status if Authorization header is not provided.
- [x] Client application is updated to send "Authorization: Basic `authorization_token`" header on import. Client takes
  `authorization_token` value from
  browser [localStorage](https://developer.mozilla.org/ru/docs/Web/API/Window/localStorage)

---

## Additional (optional) tasks

---

## Recommended

- [x] **+30** - Client application displays alerts for the responses in 401 and 403 HTTP statuses.
- **Just Practice, No Evaluation** - Add Login page and protect `getProductsList` lambda by the Cognito Authorizer
  - Create Cognito User Pool using a demo from the lecture. Leave `email` in a list of standard required attributes.
    Checkbox `Allow users to sign themselves up` should be checked. Also, set `email` as an attribute that you want to
    verify.
  - Add `App Client` to the User Pool
  - In the `App Client Settings` section select all `Identity Providers`. Fill the `Callback URL(s)` field with your
    Client Application URL (i.e. `http://localhost:3000/`). Allow only `Authorization code grant` OAuth Flow. Allow
    all `OAuth Scopes`
  - Create Domain name
  - After all of these manipulations, you can open your `Login Page` by clicking on the `Launch Hosted UI` link in
    the `App Client Settings`
  - Provide this link to your reviewers. The reviewer can just confirm that everything works for him too.
  - Add Cognito authorizer to the `getProductsList` lambda. Use `Authorization` as a `Token Source`
  - How to make sure that everything works as expected:
    - Open Login Page and `Sign Up` a new user. Use a real email address to create this user
    - Verify user using code from the email
    - After verification and after every login you will be redirected to the Client application. URL should
      contain `id_token` which can be used to access the `getProductsList` lambda
    - Call `getProductsList` lambda using `id_token` as a value for the `Authorization` header
  - Remove authorization from the `getProductsList` after your task will be checked
