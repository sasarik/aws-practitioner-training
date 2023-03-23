## Tasks of Module 8 (Integration with SQL Database)

---

### Task 8.1

- [x] Fork a copy of [Cart Service template repository](https://github.com/boale/rs-cart-api)
- [x] Use the guide (https://docs.nestjs.com/faq/serverless) to integrate Nest.js application with serverless.
- [x] Deploy your code to AWS Lambda

---

### Task 8.2

- [x] Use AWS Console to create a database instance in RDS with PostgreSQL and default configuration.
- [x] Connect to database instance via a tool called [DBeaver](https://dbeaver.io/download/) or any other similar tools
  like DataGrip/PgAdmin
- [x] Create the following tables: User, Cart and Cart Item models
- [x] Write SQL script to fill tables with test examples. Store it in your GitHub repository. Execute it for your DB to
  fill data.

---

### Task 8.3

- [x] Change logic in application to use PostgreSQL
- [x] Integrate with RDS
- [x] The use [pg](https://www.npmjs.com/package/pg) module to connect the database from the code.
- [x] Extend your `serverless.yml` file with credentials to your database instance and pass it to lambda’s environment
  variables section.

---

### Task 8.4

- [x] Commit all your work to separate branch (e.g. `task-8` from the latest `master`) in your new repository.
- [x] Create a pull request to the `master` branch.
- [x] Submit the link to the pull request for crosscheck

---

## Evaluation criteria (70 points for covering all criteria)

Reviewers should verify the lambda functions by invoking them through provided URLs.

- [x] Task 8.1 is implemented
- [x] Task 8.2 is implemented
- [x] Task 8.3 is implemented lambda links are provided and cart's data is stored in DB

---

## Additional (optional) tasks

---

- [x] **+20** **(All languages)** - Create orders table and integrated with it Order model:
- [x] **+4** **(All languages)** - Create users table and integrate with it
- [x] **+3** **(All languages)** - Transaction based creation of checkout
- [x] **+3** **(All languages)** - Integrate Cart service with FE repository
