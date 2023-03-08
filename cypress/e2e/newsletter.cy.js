const Newsletter = require("../support/pageObjectModels/newsletter_POM");

describe("Newsletter subscribction form", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("blocks subscription with already subscribed address", () => {
        Newsletter.typeEmail();
        Newsletter.submit();
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        Newsletter.submit();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "Already Subscribed");
        Newsletter.responseMessage().should("contain", "Already Subscribed");
    });

    it("makes a subscription with a new address", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        Newsletter.typeEmail();
        Newsletter.submit();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "Subscribed Successfully");
        Newsletter.responseMessage().should(
            "contain",
            "Subscribed Successfully"
        );
    });

    it("blocks a subscription with an improper addres - no @ sign", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        Newsletter.typeEmail("noAtSign");
        Newsletter.submit();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "<p>Kindly Enter a Valid Email Address.</p>");
        Newsletter.responseMessage().should(
            "contain",
            "Kindly Enter a Valid Email Address."
        );
    });
    it("blocks a subscription with an improper address - invalid domain", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        Newsletter.typeEmail("invalidDomain");
        Newsletter.submit();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "<p>Kindly Enter a Valid Email Address.</p>");
        Newsletter.responseMessage().should(
            "contain",
            "Kindly Enter a Valid Email Address."
        );
    });
});
