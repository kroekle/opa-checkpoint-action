const core = require('@actions/core');
const github = require('@actions/github');
const httpm = require('@actions/http-client')

try {
  const url = `${core.getInput('tenant')}/v1/data/systems/${core.getInput('system-id')}/${core.getInput('rule')}?publish_decision=true`
  console.log(`This is what I'm calling: ${url}`);
  core.setOutput("messages", ["I see you", "but do you see me"]);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify({input:github.context.payload}, undefined, 2)
//   console.log(`The event payload: ${payload}`);

  const http = new httpm.HttpClient();
  const requestOptions = {
    headers: {
        "Authorization": `Bearer ${core.getInput('token')}`
    }
  }
  const jsonObj = http.postJson(url, payload, requestOptions);
  if (jsonObj.status !== 200) {
    core.setFailed(error.message);
    return
  }
  console.log(`body: ${jsonObj.status}`);

  console.log(`body: ${jsonObj.body}`);

} catch (error) {
  core.setFailed(error.message);
}

async function getDecision(url, body) {
    const response = await fetch(url);
    const json = await response.json();
}
