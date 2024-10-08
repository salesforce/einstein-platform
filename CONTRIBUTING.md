# Contributing Guide

This page lists the operational governance model of this project, as well as the recommendations and requirements for how to best contribute to this project. As always, thanks for contributing. We hope these guidelines make it easier and shed some light on our approach and processes.

## Governance Model

### Salesforce Sponsored

The intent and goal of open sourcing this project is to increase the contributor and user base. However, only Salesforce employees will be given `admin` rights and will be the final arbitrars of what contributions are accepted or not.

## Issues, Requests, and Ideas

Use the GitHub Issues page to submit issues, enhancement requests and discuss ideas.

## Bug Reports and Fixes

- If you find a bug, please search for it on the repo's [Issues](https://github.com/salesforce/einstein-platform/issues) page. If the issue isn't already tracked,
  [create a new issue](https://github.com/salesforce/einstein-platform/issues/new). Fill out the "Bug Report" section of the issue template. Even if an issue is closed, feel free to comment and add details, it will still
  be reviewed.
- Issues that have already been identified as a bug (note: able to reproduce) will be labeled `bug`.
- If you'd like to submit a fix for a bug, [create a pull request](#create-a-pull-request) and mention the issue number.
- Include tests that isolate the bug and verifies that it was fixed.

## New Features

- If you'd like to add new functionality to this project, describe the problem you want to solve in a [new issue](https://github.com/salesforce/einstein-platform/issues/new).
- Issues that have been identified as a feature request will be labeled `enhancement`.
- If you'd like to implement the new feature, please wait for feedback from the project
  maintainers before spending too much time writing the code. In some cases, `enhancement` issues may
  not align well with the project objectives at the time.

## Tests, Documentation, Miscellaneous

- If you'd like to improve the tests, you want to make the documentation clearer, you have an
  alternative implementation of something that may have advantages over the way it's currently
  done, or you have any other changes, we would be happy to hear about it!
- If it's a trivial change, go ahead and [create a pull request](#create-a-pull-request) with the changes you have in mind.
- If not, [open an issue](https://github.com/salesforce/einstein-platform/issues/new) to discuss the idea first.

If you're new to our project and looking for some way to make your first contribution, look for
issues labeled `good first contribution`.

## Contribution Checklist

- [x] Clean, simple, well styled code
- [x] Commits should be atomic and messages must be descriptive. Related issues should be mentioned by issue number.
- [x] Comments
  - Module-level & function-level comments.
  - Comments on complex blocks of code or algorithms (include references to sources).
- [x] Tests
  - The test suite, if provided, must be complete and pass
  - Increase code coverage, not versa.
  - Use any of our testkits that contains a bunch of testing facilities you would need. For example: `import com.salesforce.op.test._` and borrow inspiration from existing tests.
- [x] Dependencies
  - Minimize number of dependencies.
  - Prefer Apache 2.0, BSD3, MIT, ISC, and MPL licenses.
- [x] Reviews
  - Changes must be approved via peer code review

## Create a Pull Request

1. **Ensure the bug/feature was not already reported** by searching on GitHub under the [Issues](https://github.com/salesforce/einstein-platform/issues) page. If none exists, create a new issue so that other contributors can keep track of what you are trying to add or fix and offer suggestions (or let you know if there is already an effort in progress).
2. **Clone** the forked repo to your machine.
3. **Create** a new branch to contain your work (for example, `git br fix-issue-11`)
4. **Commit** changes to your own branch.
5. **Push** your work back up to your fork. (for example, `git push fix-issue-11`)
6. **Submit** a pull request against the `main` branch and refer to the issue (or issues) that you are fixing. Try not to pollute your pull request with unintended changes. Keep it simple and small.
7. **Sign** the Salesforce CLA (you will be prompted to do so when submitting the pull request)

> **NOTE**: Be sure to [sync your fork](https://help.github.com/articles/syncing-a-fork/) before making a pull request.

## Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

By contributing your code, you agree to license your contribution under the terms of our project [LICENSE](LICENSE) and to sign the [Salesforce CLA](https://cla.salesforce.com/sign-cla).
