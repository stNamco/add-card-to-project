async function main() {
  const core = require('@actions/core');
  const github = require('@actions/github');

  const ghToken = core.getInput('githubToken', {required: true});
  const octokit = github.getOctokit(ghToken);
  const projectOwnerType = core.getInput('ownerType', {required: true});
  const projectOwnerName = core.getInput('ownerName', {required: true});
  const projectNumber = parseInt(core.getInput('projectNumber', {required: true}));
  const repositoryName = core.getInput('repositoryName', {required: true});
  const issueId = parseInt(core.getInput('issueId', {required: true}));

  const idResp = await octokit.graphql(
    `query getProject($projectOwnerName: String!, $projectNumber: Int!) {
      ${projectOwnerType}(login: $projectOwnerName) {
        projectV2(number: $projectNumber) {
          id
        }
      }
    }`,
    {
      projectOwnerName,
      projectNumber
    }
  )

  const projectId = idResp[projectOwnerType]?.projectV2.id

  const issue = await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', {
    owner: projectOwnerName,
    repo: repositoryName,
    issue_number: issueId
  });
  const contentId = issue.data.node_id;

  const addResp = await octokit.graphql(
    `mutation addIssueToProject($input: AddProjectV2ItemByIdInput!) {
      addProjectV2ItemById(input: $input) {
        item {
          id
        }
      }
    }`,
    {
      input: {
        projectId,
        contentId
      }
    }
  )

  core.setOutput('itemId', addResp.addProjectV2ItemById.item.id)
}
main()
