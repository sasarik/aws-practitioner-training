### Task 5.1

- [x] Created a new service called `import-service` at the same level as Product Service with its own `serverless.yml`
  file. The backend project structure looks like this:

```
   backend-repository
      product-service
      import-service
```

- [x] In the AWS Console **created** and **configured** a new S3 `aws-training-import-bucket` bucket with a folder
  called `uploaded`.
- [x] Using `serverless.ts` The S3 `aws-training-products-import-bucket` bucket **created** and **configured** to use
  for `import products` routines.

---

### Task 5.2

- [x] Created a lambda function called `importProductsFile` under the same Serverless config file `serverless.yaml` of
  the Import Service which triggered by the HTTP GET method.
- [x] The requested URL is `/import`.
- [x] Implemented its logic: it expects a request with a name of CSV file with products and create a new **Signed URL**
  with the following key: `uploaded/${fileName}`.
- [x] The name is passed in a _query string_ as a `fileName` parameter
- [x] Updated `serverless.yml` with policies to allow lambda functions to interact with S3.
- [x] The response from the lambda created **Signed URL**.
- [x] The lambda endpoint integrated with the frontend by updating `import` property of the API paths configuration.

---

### Task 5.3

- [x] Created a lambda function called `importFileParser` under the same `serverless.yml` file which is triggered by an
  S3 event.
- [x] The event is `s3:ObjectCreated:*`
- [x] Configured event to be fired only by changes in the `uploaded` folder in S3.
- [x] The lambda function used a _readable stream_ to get an object from S3, parsed it using `csv-parser` package and
  log each record to be shown in CloudWatch.

---

### Task 5.4

- [x] All my work committed to separate branch (`Task-5` from the latest `master`) in my own repository.
- [x] Created a pull request to the `master` branch.
- [x] Submitted the link to the pull request for crosscheck
- [x] Find please the SWAGGER files in the `docs\swagger`

---

## Evaluation criteria (70 points for covering all criteria)

Please verify the lambda functions by invoking them through provided URLs.

- [x] File `serverless.yml` contains configuration for `importProductsFile` function
- [x] The `importProductsFile` lambda function returns a correct response which can be used to upload a file into the S3
  bucket
- [x] Frontend application is integrated with `importProductsFile` lambda
- [x] The `importFileParser` lambda function is implemented and `serverless.yml` contains configuration for the lambda

---

## Additional (optional) tasks

- [x] **+10** **(for JS only)** - **async/await** is used in lambda functions
- [x] **+10** **(All languages)** - `importProductsFile` lambda is covered by _unit tests_.
- [x] **+10** **(All languages)** - At the end of the stream the lambda function should move the file from
  the `uploaded` folder into the `parsed` folder (`move the file` means that file should be copied into a new folder in
  the same bucket called `parsed`, and then deleted from `uploaded` folder)
