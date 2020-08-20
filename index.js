const url = "https://sapui5.hana.ondemand.com/1.71.14/test-resources/sap/ca/scfld/md/designtime/api.json";

const axios = require('axios');

// CommonJS
const fetch = require('node-fetch');
const tunnel = require('tunnel')
let agent
console.log(process.env['http-proxy'])
if (process.env['http-proxy']) {
    const httpsProxyObject = new URL(process.env['http-proxy'])
    console.log(httpsProxyObject)
    const { hostname } = httpsProxyObject
    const { port } = httpsProxyObject
    agent = tunnel.httpsOverHttp({
              proxy: {
                host: httpsProxyObject.hostname,
                port: httpsProxyObject.port,
                proxyAuth: httpsProxyObject.auth
              },
            })
  }
  const requestConfig = {};
  if (agent) {
    console.log('using agent')
    requestConfig.httpsAgent = agent
    requestConfig.proxy = false
  }


async function getUser() {
    try {
      const response = await axios.get(url, requestConfig);
      console.log("worked on axios");
    } catch (error) {
      console.error("error on axios");
    }
  }

  getUser();

  

(async () => {
    try {
        const response = await fetch(url, { agent: agent });
        console.log("worked on node-fetch");
      } catch (error) {
        console.error("error on node-fetch");
      }
	
})();
