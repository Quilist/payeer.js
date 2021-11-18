const cache = require('./cache.json');
const fs = require('fs');
const Events = require('events');
const request = require('request');

class EventHandler extends Events.EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this.set_callbacks();
    }

    async set_callbacks() {

        const updates = () => {
            return new Promise((resolve, reject) => {
                request.post('https://payeer.com/ajax/api/api.php?history', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `account=${this.client.account}&apiId=${this.client.api_id}&apiPass=${this.client.api_pass}&action=history`
                }, (error, response, body) => {
                    if (error) reject(error)
                    else resolve(JSON.parse(body))
                });
            })
        }

        const callback = () => {
            updates().then((data) => {

                const array = new Array();
                const history = data.history;
                const keys = Object.keys(history);
                const last_element = history[keys[keys.length - 1]]

                if (cache.history.id !== last_element.id) {
                    for (let key in history) array.push(history[key])
                    const reversed_array = array.reverse()

                    reversed_array.some((element) => {
                        if (cache.history.id === element.id) {
                            cache.history = reversed_array[0]
                            return element;
                        }
                        if (cache.history.id === -1) {
                            cache.history = reversed_array[0]
                            return element;
                        }
                        if (element.id === reversed_array[reversed_array.length - 1].id) {
                            cache.history = reversed_array[0]
                            return element;
                        }
                        this.emit('data', element)
                    })

                }
                fs.writeFileSync(`${__dirname}/cache.json`, JSON.stringify(cache, null, 4), err => console.error(err))
                setTimeout(callback, 2000);
            })
        }
        callback();
    }
}

module.exports = { EventHandler };
