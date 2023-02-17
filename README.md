# The CloudX: AWS Practitioner for JS #4 Training nx:monorepo

---

[![serverless](http://public.serverless.com/badges/v3.svg)](http://www.serverless.com)
[![](https://img.shields.io/badge/monorepo-Nx-blue)](https://nx.dev/)
![npm peer dependency version (scoped)](https://img.shields.io/npm/dependency-version/eslint-config-prettier/peer/eslint)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)
![esbuild](https://badges.aleen42.com/src/esbuild.svg)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/sasarik/aws-practitioner-training/blob/main/LICENSE)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

---

## Serverless

### Package serverless stack

- To package single serverless stack

  ```shell
  nx run <STACK_NAME>:build --stage=<STAGE_NAME>
  ```

- To package serverless stack affected by a change

  ```shell
  nx affected:build --stage=<STAGE_NAME>
  ```

- To package all serverless stacks
  ```shell
  nx run-many --target=build --stage=<STAGE_NAME>
  ```

### Deploy serverless stack to cloud

- To deploy single serverless stack

  ```shell
  nx run <STACK_NAME>:deploy --stage=<STAGE_NAME>
  ```

- To deploy serverless stack affected by a change

  ```shell
  nx affected:deploy --stage=<STAGE_NAME>
  ```

- To deploy all serverless stacks
  ```shell
  nx run-many --target=deploy --all --stage=<STAGE_NAME>
  ```

### Remove serverless stack from cloud

- To remove single serverless stack

  ```shell
  nx run <STACK_NAME>:remove --stage=<STAGE_NAME>
  ```

- To remove serverless stack affected by a change

  ```shell
  nx affected:remove --stage=<STAGE_NAME>
  ```

- To remove all serverless stacks
  ```shell
  nx run-many --target=remove --all --stage=<STAGE_NAME>
  ```

---

## Repo usage

- **Generate small node library**

  ```shell
  nx g @nrwl/node:lib --skipBabelrc --tags lib <LIB_NAME>
  ```

  > Run with `-d` or `--dry-run` flag for dry run

- **Generate a new serverless stack**

  ```shell
  nx workspace-generator serverless <STACK_NAME>
  ```

  > Run with `-d` or `--dry-run` flag for dry run

- **Remove generated serverless stack**
  ```shell
  npx nx generate remove <STACK_NAME>
  ```

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
