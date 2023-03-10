## Tasks

---

### Task 6.1

- [x] Created a lambda function `catalogBatchProcess` under the same Serverless config file (i.e. `serverless.yaml`) of
  the Product Service which triggered by an SQS event.
- [x] Created an SQS queue called `catalogItemsQueue`, in the resources section of the same `serverless.yml` file.
- [x] Configured the SQS to trigger lambda `catalogBatchProcess` with _5 messages_ at once via `batchSize` property.
- [x] The lambda function iterate over all SQS messages and create corresponding products in the products table.

### Task 6.2

- [x] Updated the `importFileParser` lambda function in the Import Service by sending each CSV record into SQS.
- [x] It should no longer log entries from the _readable stream_ to CloudWatch.

### Task 6.3

- [x] Created an SNS topic `createProductTopic` and email subscription in the resources section in `serverless.yml` of
  the Product Service.
- [x] Created a subscription for this SNS topic with an `email` endpoint type with your own email in there.
- [x] Updated the `catalogBatchProcess` lambda function in the Product Service by sending an event to the SNS topic once
  it creates products.

### Task 6.4

- [x] Commit all my work to separate branch (e.g. `task-6` from the latest `master`) in your own repository.
- [x] Created a pull request to the `master` branch.
- [x] Submit the link to the pull request for crosscheck

## Evaluation criteria (70 points for covering all criteria)

Reviewers should verify the lambda functions, SQS and SNS topic and subscription in PR.

- [x] File `serverless.yml` contains configuration for `catalogBatchProcess` function
- [x] File `serverless.yml` contains policies to allow lambda `catalogBatchProcess` function to interact with SNS and
  SQS
- [x] File `serverless.yml` contains configuration for SQS `catalogItemsQueue`
- [x] File `serverless.yml` contains configuration for SNS Topic `createProductTopic` and email subscription

---

## Additional (optional) tasks

- [x] **+15** **(All languages)** - `catalogBatchProcess` lambda is covered by **unit** tests
- [x] **+15** **(All languages)** - set a Filter Policy for SNS `createProductTopic` in `serverless.yml` and create an
  additional email subscription to distribute messages to different emails depending on the filter for any product
  attribute

---

## Description Template for PRs

The following should be present in PR's description field:

- [x] What was done?
- [x] Link to Product Service and Import Service APIs - .....
- [x] Link to FE PR (YOUR OWN REPOSITORY) - ...
- [x] SWAGGER file(s)
