const core = require('@actions/core');
const github = require('@actions/github');
const httpm = require('@actions/http-client')

try {
  console.log(`Just a little: ${core.getInput('api-token').substring(0,10)}`);
  core.setOutput("messages", ["I see you", "but do you see me"]);

    const jsonObj = getDecision();

    jsonObj
      .then(m => {console.log(`body: ${m}`);core.setOutput("results", m)})
      .catch(e => {throw e});

} catch (error) {
  core.setFailed(error.message);
}

async function getDecision() {
    const url = `${core.getInput('tenant')}/v1/data/systems/${core.getInput('system-id')}/${core.getInput('rule')}?publish_decision=true`
    console.log(`This is what I'm calling: ${url}`);
   
    const http = new httpm.HttpClient();
    const additionalHeaders = {
       "Authorization": `Bearer ${core.getInput('api-token')}`
    }
    const jsonObj = await http.postJson(url, {input:{event:github.event_name, context:github.context.payload}}, additionalHeaders);
    return jsonObj;
  }
