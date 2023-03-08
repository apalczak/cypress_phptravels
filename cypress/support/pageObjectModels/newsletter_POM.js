const randomEmail = require("../../fixtures/random_email");

class Newsletter {
    static typeEmail(type) {
        cy.get("#exampleInputEmail1").type(randomEmail(type));
    }

    static submit() {
        cy.get(".sub_newsletter").click();
        cy.debug();
    }

    static responseMessage() {
        return cy.get(".subscriberesponse");
    }
}

export default Newsletter;
