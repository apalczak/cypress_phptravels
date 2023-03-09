const newsletter = require("../support/pageObjectModels/newsletter_POM");

describe("newsletter subscribction form", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("blocks subscription with already subscribed address", () => {
        newsletter.typeEmail();
        newsletter.submit();
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        newsletter.submit();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "Already Subscribed");
        newsletter.responseMessage().should("contain", "Already Subscribed");
    });

    it("makes a subscription with a new address", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        newsletter.typeEmail();
        newsletter.submit();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "Subscribed Successfully");
        newsletter
            .responseMessage()
            .should("contain", "Subscribed Successfully");
    });

    it("blocks a subscription with an improper addres - no @ sign", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        newsletter.typeEmail("noAtSign");
        newsletter.submit();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "<p>Kindly Enter a Valid Email Address.</p>");
        newsletter
            .responseMessage()
            .should("contain", "Kindly Enter a Valid Email Address.");
    });
    it("blocks a subscription with an improper address - invalid domain", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        newsletter.typeEmail("invalidDomain");
        newsletter.submit();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "<p>Kindly Enter a Valid Email Address.</p>");
        newsletter
            .responseMessage()
            .should("contain", "Kindly Enter a Valid Email Address.");
    });
});
