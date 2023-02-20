## Tasks

---

### Task 3.1

- [x] Create a lambda function called `getProductsList` under the same Serverless config file (i.e. `serverless.yaml`) of Product Service which will be triggered by the HTTP GET method.
- [x] The requested URL should be `/products`.
- [x] The response from the lambda should be a _full_ array of products (mock data should be used - this mock data should be stored in Product Service).
- [x] This endpoint should be integrated with Frontend app for _PLP_ (Product List Page) representation.

### Task 3.2

- [x] Create a lambda function called `getProductsById` under the same Serverless config file (i.e. `serverless.yaml`) of Product Service which will be triggered by the HTTP GET method.
- [x] The requested URL should be `/products/{productId}` (what `productId` is in your application is up to you - productName, UUID, etc.).
- [x] The response from the lambda should be 1 searched product from an array of products (mock data should be used - this mock data should be stored in Product Service).
- [x] This endpoint is not needed to be integrated with Frontend right now.

### Task 3.3

-[x] Commit all your work to separate branch (e.g. `task-3` from the latest `master`) in your own repository. -[x] Create a pull request to the `master` branch. -[ ] Submit the link to the pull request for crosscheck

## Evaluation criteria (each mark includes previous mark criteria)

---

Reviewers should verify the lambda functions by invoking them through provided URLs.

- [ ] **18** - Product Service Serverless config contains configuration for 2 lambda functions, API is not working at all, but YAML configuration is correct
- [x] **36** - The `getProductsList` OR `getProductsById` lambda function returns a correct response (POINT1)
- [x] **54** - The `getProductsById` AND `getProductsList` lambda functions return a correct response code (POINT2)
- [x] **72** - Your own Frontend application is integrated with Product Service (`/products` API) and products from Product Service are represented on Frontend. AND POINT1 and POINT2 are done.

## Additional (optional) tasks

---

- [ ] **+4** - Async/await is used in lambda functions
- [ ] **+4** - ES6 modules are used for Product Service implementation
- [ ] **+4** - Custom Webpack/ESBuild/etc is manually configured for Product Service. Not applicable for preconfigured/built-in bundlers that come with templates, plugins, etc.
- [ ] **+4** **(All languages)** - SWAGGER documentation is created for Product Service
- [ ] **+4** **(All languages)** - Lambda handlers are covered by basic UNIT tests (NO infrastructure logic is needed to be covered)
- [x] **+4** **(All languages)** - Lambda handlers (`getProductsList`, `getProductsById`) code is written not in 1 single module (file) and separated in codebase.
- [x] **+4** **(All languages)** - Main error scenarios are handled by API ("Product not found" error).

## Description Template for PRs

---

The following should be present in PR's description field:

- [ ] What was done?

  Example:

```
   Service is done, but FE is not working...

   Additional scope - webpack, swagger, unit tests
```

- [ ] Link to Product Service API - .....
- [ ] Link to FE PR (YOUR OWN REPOSITORY) - ...

- [ ] In case SWAGGER file is not provided - please provide product schema in PR description
