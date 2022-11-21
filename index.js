const core = require('@actions/core');
const github = require('@actions/github');
const httpm = require('@actions/http-client')

try {
  const jsonObj = getDecision();
  
  //TODO: not sure if I need to check status here
  jsonObj
    .then(m => {core.setOutput("results", m.result.result);if (!m.result.result.allowed) {core.setFailed(m.result.result.messages)}})
    .catch(e => {throw e});
} catch (error) {
  core.setFailed(error.message);
}

function getDecision() {
    const url = `${core.getInput('tenant')}/v1/data/systems/${core.getInput('system-id')}/${core.getInput('rule')}?publish_decision=true`
    // console.log(`This is what I'm calling: ${url}`);
   
    const http = new httpm.HttpClient();
    const additionalHeaders = {
       "Authorization": `Bearer ${core.getInput('api-token')}`
    }
    return http.postJson(url, {input:github.context}, additionalHeaders);
  }
