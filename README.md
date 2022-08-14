# add-card-to-project
just add issue or pr to github project


#### Example Usage

```yaml
name: Add card to project

on:
  issues:
    types:
      - opened

jobs:
  add-card-to-project:
    name: Add issue to project
    runs-on: ubuntu-latest
    steps:
      - uses: stNamco/add-card-to-project@v0.0.1
        with:
          githubToken: ${{secrets.EXAMPLE_PAT}}
          ownerType: user
          ownerName: stNamco
          projectNumber: 6
          repositoryName: example-issues
          issueId: ${{ github.event.issue.number }}
```


### Action inputs

| Name | Description |
| --- | --- |
| githubToken | `repo` and `project` scoped [Personal Access Token (PAT)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token). |
| ownerType | `user` or `organization`. |
| ownerName | user name or organization name. |
| repositoryName | github repository name. |
| projectNumber | github project numeber. | 
| issueId | the issue or pr id. |
