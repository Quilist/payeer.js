const { EventHandler } = require("./events/events");
const { Requests } = require("./requests");

class Payeer extends Requests {
    constructor(account, api_id, api_pass) {
        super()
        this.account = account;
        this.api_id = api_id;
        this.api_pass = api_pass;
        this.account_data = `account=${this.account}&apiId=${this.api_id}&apiPass=${this.api_pass}`;
    }

    async AuthorizationСheck() {
        return this.request("", "")
    }

    async getBalance() {
        return this.request("?getBalance", "&action=getBalance")
    }

    async transfer(curIn, sum, curOut, to) {
        return this.request("?transfer", `&action=transfer&curIn=${curIn}&sum=${sum}&curOut=${curOut}&to=${to}`)
    }

    async checkUser(user) {
        return this.request("?checkUser", `&action=checkUser&user=${user}`)
    }

    async getExchangeRate(output) {
        return this.request("?getExchangeRate", `&action=getExchangeRate&output=${output}`)
    }

    async payoutChecking(payout_id, sumIn, curIn, curOut, param_ACCOUNT_NUMBER) {
        return this.request("?payoutChecking", `&action=payoutChecking&ps=${payout_id}&sumIn=${sumIn}&curIn=${curIn}&curOut=${curOut}&param_ACCOUNT_NUMBER=${param_ACCOUNT_NUMBER}`)
    }

    async payout(payout_id, sumIn, curIn, curOut, param_ACCOUNT_NUMBER) {
        return this.request("?payout", `&action=payout&ps=${payout_id}&sumIn=${sumIn}&curIn=${curIn}&curOut=${curOut}&param_ACCOUNT_NUMBER=${param_ACCOUNT_NUMBER}`)
    }

    async getPaySystems() {
        return this.request("?getPaySystems", `&action=getPaySystems`)
    }

    async paymentDetails(merchantId, referenceId) {
        return this.request("?paymentDetails", `&action=paymentDetails&merchantId=${merchantId}&referenceId=${referenceId}`)
    }

    async history() {
        return this.request("?history", `&action=history`)
    }

    async payoutDetails(referenceId) {
        return this.request("?payoutDetails", `&action=payoutDetails&referenceId=${referenceId}`)
    }

    async invoiceCreate(m_shop, m_orderid, m_amount, m_curr, m_desc) {
        return this.request("?invoiceCreate", `&action=invoiceCreate&m_shop=${m_shop}&m_orderid=${m_orderid}&m_amount=${m_amount}&m_curr=${m_curr}&m_desc=${encodeURI(m_desc)}`)
    }

    async on(event, callback) {
        if (this.event === undefined) {
            this.event = new EventHandler(this);
        }
        this.event.on(event, callback);
    }
}

exports.default = Payeer;
