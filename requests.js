const request = require('request');

class Requests {
    constructor() {
        this.account_data = undefined;
        this.api = 'https://payeer.com/ajax/api/api.php';
        this.headers = {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }

    async request(url, action) {
        return new Promise((resolve, reject) => {
            request.post(this.api + url, {
                headers: this.headers,
                body: this.account_data + action
            }, (error, response, body) => {
                if (error) reject(error)
                else resolve(JSON.parse(body))
            });
        });
    }
}

module.exports = { Requests };