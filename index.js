const core = require('@actions/core');
const github = require('@actions/github');
const httpm = require('@actions/http-client')

try {
  const url = `${core.getInput('tenant')}/v1/data/systems/${core.getInput('system-id')}/${core.getInput('rule')}?publish_decision=true`
  console.log(`This is what I'm calling: ${url}`);
  console.log(`Do I have a token: ${core.getInput('api-token').startsWith("f50")}`);
  console.log(`Just a little: ${core.getInput('api-token').substring(0,10)}`);
  core.setOutput("messages", ["I see you", "but do you see me"]);
  // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify({input:github.context.payload}, undefined, 2)
//   console.log(`The event payload: ${payload}`);

  const http = new httpm.HttpClient();
  const additionalHeaders = {
     "Authorization": `Bearer ${core.getInput('api-token')}`
  }
  const jsonObj = http.postJson(url, {input:github.context.payload}, additionalHeaders);

  console.log(`body: ${jsonObj.result}`);

} catch (error) {
  core.setFailed(error.message);
}

async function getDecision(url, body) {
    const response = await fetch(url);
    const json = await response.json();
}
