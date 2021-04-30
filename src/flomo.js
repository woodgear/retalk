const fs = require("fs")
const homedir = require('os').homedir();
const got = require('got');

async function postJson(url, data) {
    return got.post(url, { json: data })
}

class Flomo {
    constructor(url) {
        this.url = url
    }
    async send(msg) {
        return postJson(this.url, { content: msg })
    }

    static fromConfig(path) {
        const configJsonStr = fs.readFileSync(path)
        const config = JSON.parse(configJsonStr)
        return new Flomo(config.flomo)
    }
}

const flomo = Flomo.fromConfig(`${homedir}/.retalk_rc`)


module.exports = {
    flomo
}