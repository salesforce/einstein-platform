# LLM Open Connector

Artificial intelligence is becoming increasingly personalized and specialized. At Salesforce we recognize the growing need for businesses and developers to integrate their chosen large language models (LLMs) into the Einstein AI Platform. To address this need, we've developed the Bring Your Own Large Language Model (BYOLLM) Open Connector. With this connector, you can connect the Einstein AI Platform to any language model, whether it's an industry established leader or a niche, custom-built solution. The Open Connector is designed to provide powerful AI solutions to customers, independent software vendors (ISVs), and internal Salesforce teams. Our goal is to provide unparalleled flexibility and choice to meet the evolving demands of our users.

<p>The BYOLLM Open Connector is more than just a technical upgrade; it's a commitment to community-driven growth and innovation. By allowing users to integrate any LLM—from those models hosted on major cloud platforms to those models developed in-house—we're opening up a world of possibilities for enhanced, bespoke AI applications. This capability not only caters to the needs of large enterprises looking to leverage specific models like IBM Granite or Databricks DBRX but also supports smaller teams eager to experiment with open-source models. With features designed to ensure ease of use, such as a streamlined UX in Einstein Studio and API specifications closely based on the OpenAI API, this connector empowers our users to enhance their AI-driven applications while maintaining high standards of security and compatibility.

## Usage

1. Clone this repository
2. Implement HTTP REST service using llm-open-connector openapi specification

- [OpenAPI Specification](api-specs/llm-open-connector/llm-open-connector.yml)

3. Test your service connection using [Bring Your Own Large Language Model in Einstein 1 Studio](https://developer.salesforce.com/blogs/2024/03/bring-your-own-large-language-model-in-einstein-1-studio)

## License Info

[Apache License v2](https://opensource.org/license/apache-2-0/) license.

The shorter version of license text must be added as a comment to all Salesforce-authored source code and configuration files that support comments. This rule applies to file formats like HTML, CSS, JavaScript, and so on, which aren't directly code, but are still critical to the project code.

```
/*
 * Copyright (c) 2023, Salesforce, Inc.
 * SPDX-License-Identifier: Apache-2
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
```

# Salesforce Open Source Community Code of Conduct

## About the Code of Conduct

Equality is a core value at Salesforce. We believe a diverse and inclusive
community fosters innovation and creativity, and are committed to building a
culture where everyone feels included.

Salesforce open-source projects are committed to providing a friendly, safe, and
welcoming environment for all, regardless of gender identity and expression,
sexual orientation, disability, physical appearance, body size, ethnicity, nationality,
race, age, religion, level of experience, education, socioeconomic status, or
other similar personal characteristics.

The goal of this code of conduct is to specify a baseline standard of behavior so
that people with different social values and communication styles can work
together effectively, productively, and respectfully in our open-source community.
It also establishes a mechanism for reporting issues and resolving conflicts.

All questions and reports of abusive, harassing, or otherwise unacceptable behavior
in a Salesforce open-source project may be reported by contacting the Salesforce
Open Source Conduct Committee at ossconduct@salesforce.com.

## Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of gender
identity and expression, sexual orientation, disability, physical appearance,
body size, ethnicity, nationality, race, age, religion, level of experience, education,
socioeconomic status, or other similar personal characteristics.

## Our Standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy toward other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Personal attacks, insulting/derogatory comments, or trolling
- Public or private harassment
- Publishing, or threatening to publish, others' private information—such as
  a physical or electronic address—without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting
- Advocating for or encouraging any of the above behaviors

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned with this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

## Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project email
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

## Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the Salesforce Open Source Conduct Committee
at ossconduct@salesforce.com. All complaints will be reviewed and investigated
and will result in a response that is deemed necessary and appropriate to the
circumstances. The committee is obligated to maintain confidentiality with
regard to the reporter of an incident. Further details of specific enforcement
policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership and the Salesforce Open Source Conduct
Committee.

## Attribution

This Code of Conduct is adapted from the [Contributor Covenant][contributor-covenant-home],
version 1.4, available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html.
It includes adaptions and additions from [Go Community Code of Conduct][golang-coc],
[CNCF Code of Conduct][cncf-coc], and [Microsoft Open Source Code of Conduct][microsoft-coc].

This Code of Conduct is licensed under the [Creative Commons Attribution 3.0 License][cc-by-3-us].

[contributor-covenant-home]: https://www.contributor-covenant.org "https://www.contributor-covenant.org/"
[golang-coc]: https://golang.org/conduct
[cncf-coc]: https://github.com/cncf/foundation/blob/master/code-of-conduct.md
[microsoft-coc]: https://opensource.microsoft.com/codeofconduct/
[cc-by-3-us]: https://creativecommons.org/licenses/by/3.0/us/

# Security

Please report any security issue to [security@salesforce.com](mailto:security@salesforce.com)
as soon as it is discovered. This library limits its runtime dependencies in
order to reduce the total cost of ownership as much as can be, but all consumers
should remain vigilant and have their security stakeholders review all third-party
products (3PP) like this one and their dependencies.

# Contributing Guide For LLM Open Connector

This page lists the operational governance model of this project, as well as the recommendations and requirements for how to best contribute to llm-open-connector. We strive to obey these as best as possible. As always, thanks for contributing – we hope these guidelines make it easier and shed some light on our approach and processes.

# Governance Model

## Salesforce Sponsored

The intent and goal of open sourcing this project is to increase the contributor and user base. However, only Salesforce employees will be given `admin` rights and will be the final arbitrars of what contributions are accepted or not.

# Getting started

Please join the community on Slack [#salesforce-einstein-llm-open-connector](). Also please make sure to take a look at the project [roadmap](ROADMAP.md) to see where are headed.

# Issues, requests & ideas

Use GitHub Issues page to submit issues, enhancement requests and discuss ideas.

### Bug Reports and Fixes

- If you find a bug, please search for it in the [Issues](https://github.com/{project_slug}/issues), and if it isn't already tracked,
  [create a new issue](https://github.com/{project_slug}/issues/new). Fill out the "Bug Report" section of the issue template. Even if an Issue is closed, feel free to comment and add details, it will still
  be reviewed.
- Issues that have already been identified as a bug (note: able to reproduce) will be labeled `bug`.
- If you'd like to submit a fix for a bug, [send a Pull Request](#creating_a_pull_request) and mention the Issue number.
- Include tests that isolate the bug and verifies that it was fixed.

### New Features

- If you'd like to add new functionality to this project, describe the problem you want to solve in a [new Issue](https://github.com/{project_slug}/issues/new).
- Issues that have been identified as a feature request will be labeled `enhancement`.
- If you'd like to implement the new feature, please wait for feedback from the project
  maintainers before spending too much time writing the code. In some cases, `enhancement`s may
  not align well with the project objectives at the time.

### Tests, Documentation, Miscellaneous

- If you'd like to improve the tests, you want to make the documentation clearer, you have an
  alternative implementation of something that may have advantages over the way it's currently
  done, or you have any other change, we would be happy to hear about it!
- If it's a trivial change, go ahead and [send a Pull Request](#creating_a_pull_request) with the changes you have in mind.
- If not, [open an Issue](https://github.com/{project_slug}/issues/new) to discuss the idea first.

If you're new to our project and looking for some way to make your first contribution, look for
Issues labeled `good first contribution`.

# Contribution Checklist

- [x] Clean, simple, well styled code
- [x] Commits should be atomic and messages must be descriptive. Related issues should be mentioned by Issue number.
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

# Creating a Pull Request

1. **Ensure the bug/feature was not already reported** by searching on GitHub under Issues. If none exists, create a new issue so that other contributors can keep track of what you are trying to add/fix and offer suggestions (or let you know if there is already an effort in progress).
2. **Clone** the forked repo to your machine.
3. **Create** a new branch to contain your work (for example, `git br fix-issue-11`)
4. **Commit** changes to your own branch.
5. **Push** your work back up to your fork. (for example, `git push fix-issue-11`)
6. **Submit** a Pull Request against the `main` branch and refer to the issue (or issues) that you are fixing. Try not to pollute your pull request with unintended changes. Keep it simple and small.
7. **Sign** the Salesforce CLA (you will be prompted to do so when submitting the pull request)

> **NOTE**: Be sure to [sync your fork](https://help.github.com/articles/syncing-a-fork/) before making a pull request.

# Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md).

# License

By contributing your code, you agree to license your contribution under the terms of our project [LICENSE](LICENSE.txt) and to sign the [Salesforce CLA](https://cla.salesforce.com/sign-cla)
