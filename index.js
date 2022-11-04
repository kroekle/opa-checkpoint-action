const core = require('@actions/core');
// const github = require('@actions/github');
const http = require('@actions/http-client')

try {
  const url = `${core.getInput('tenant')}/v1/data/systems/${core.getInput('system-id')}/${core.getInput('rule')}`
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`This is what I'm calling: ${url}`);
  core.setOutput("messages", ["I see you", "but do you see me"]);
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}

async function getDecision(url, body) {
    const response = await fetch(url);
    const json = await response.json();
}
