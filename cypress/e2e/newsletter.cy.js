const Newsletter = require("../support/pageObjectModels/newsletter_POM");

describe("Test the newsletter subscription form", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Subscribes with already taken email address", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        Newsletter.typeRandomEmail();
        cy.get(".sub_newsletter").click();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "Already Subscribed");
        cy.get(".subscriberesponse").should("contain", "Already Subscribed");
    });

    it("Subscribes with new, proper e-mail address", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        Newsletter.typeRandomEmail();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "Subscribed Successfully");
        cy.get(".subscriberesponse").should(
            "contain",
            "Subscribed Successfully"
        );
    });

    it("Subscribes with new, improper e-mail address - no @ sign", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        Newsletter.typeRandomEmail("noAtSign");
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "<p>Kindly Enter a Valid Email Address.</p>");
        cy.get(".subscriberesponse").should(
            "contain",
            "Kindly Enter a Valid Email Address."
        );
    });
    it("Subscribes with new, improper e-mail address - invalid domain", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        Newsletter.typeRandomEmail("invalidDomain");
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "<p>Kindly Enter a Valid Email Address.</p>");
        cy.get(".subscriberesponse").should(
            "contain",
            "Kindly Enter a Valid Email Address."
        );
    });
});
