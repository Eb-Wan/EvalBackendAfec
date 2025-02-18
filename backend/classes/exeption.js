class Exeption extends Error {
    constructor(message, statusCode, clientVisible = false, details) {
        super(message, statusCode);
        this.message = message;
        this.statusCode = statusCode;
        this.clientVisible = clientVisible;
        this.details = details;
    }
}

module.exports = Exeption;