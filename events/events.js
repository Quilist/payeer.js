const cache = require('./cache.json');
const fs = require('fs');
const Events = require('events');

class EventHandler extends Events.EventEmitter {
    constructor(client) {
        super();
        this.client = client;
        this.set_callbacks();
    }

    async set_callbacks() {
        const updates = this.client.history();

        const callback = () => {
            updates.then((data) => {
                const array = new Array();
                const history = data.history;
                const keys = Object.keys(data.history);
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