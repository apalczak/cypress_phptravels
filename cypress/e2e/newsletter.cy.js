const Newsletter = require("../support/pageObjectModels/newsletter_POM");

describe("Newsletter subscribction form", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("blocks subscription with already subscribed address", () => {
        cy.intercept({ method: "POST", url: "**/subscribe" }).as("subscribe");
        Newsletter.typeRandomEmail();
        cy.get(".sub_newsletter").click();
        cy.wait("@subscribe").its("response.statusCode").should("eq", 200);
        cy.get("@subscribe")
            .its("response.body")
            .should("contain", "Already Subscribed");
        cy.get(".subscriberesponse").should("contain", "Already Subscribed");
    });

    it("makes a subscription with a new address", () => {
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

    it("blocks a subscription with an improper addres - no @ sign", () => {
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
    it("blocks a subscription with an improper address - invalid domain", () => {
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
