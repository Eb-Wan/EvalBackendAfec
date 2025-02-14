class Exeption extends Error {
    constructor(message, statusCode, clientVisible = false) {
        super(message, statusCode);
        this.message = message;
        this.statusCode = statusCode;
        this.clientVisible = clientVisible;
    }
}

module.exports = Exeption;