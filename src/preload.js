const { flomo } = require("./flomo")

function custom_fmt(msg) {
    return `#retalk #utools ${msg}`
}

async function asyncEnter(utools, action, callbackSetList) {
}

async function asyncSearch(utools, action, searchWord, callbackSetList) {
    callbackSetList([{
        title: searchWord,
        description: `send to flomo:\n ${custom_fmt(searchWord)}`
    }])
}

async function asyncSelect(utools, action, itemData, callbackSetList) {
    const msg = custom_fmt(itemData.title)
    try {
        await flomo.send(msg)
        utools.showNotification(`hi, send to flomo success:\n ${msg}`)
    } catch (e) {
        utools.copyText(itemData.title)
        utools.showNotification(`oh! send to flomo fail, but you msg has copy to clipboard ^_^:\n ${JSON.stringify(e)}`)
    }
    utools.hideMainWindow();
    utools.outPlugin()
}



window.exports = {
    "rk": {
        mode: "list",
        args: {
            enter: (action, callbackSetList) => {
                asyncEnter(window.utools, action, callbackSetList)
            },
            search: (action, searchWord, callbackSetList) => {
                asyncSearch(window.utools, action, searchWord, callbackSetList)
            },
            select: (action, itemData, callbackSetList) => {
                asyncSelect(window.utools, action, itemData, callbackSetList)
            },
            placeholder: "retalk"
        }
    }
}