const contactUs = require("../support/pageObjectModels/contactUs_POM");

describe("Contact Us form", () => {
    beforeEach(() => {
        cy.visit("/contact-us");
    });

    it("submits with a proper data", () => {
        contactUs.typeName("John Doe");
        contactUs.typeEmail();
        contactUs.typeSubject("Test subject");
        contactUs.typeMessage(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        );
        contactUs.submit();
        contactUs
            .responseMessage()
            .should("have.class", "alert-success")
            .and("contain", "Message Sent Successfully");
    });

    it("blocks submision with empty message field", () => {
        contactUs.typeName("John Doe");
        contactUs.typeEmail();
        contactUs.typeSubject("Test subject");
        contactUs.submit();
        contactUs
            .responseMessage()
            .should("have.class", "alert-danger")
            .and("contain", "The Message field is required.");
    });

    it("blocks submision with email address with improper domain", () => {
        contactUs.typeName("John Doe");
        contactUs.typeEmail("invalidDomain");
        contactUs.typeSubject("Test subject");
        contactUs.typeMessage(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        );
        contactUs.submit();
        contactUs
            .responseMessage()
            .should("have.class", "alert-danger")
            .and(
                "contain",
                "The Email field must contain a valid email address."
            );
    });
});
