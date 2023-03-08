const ContactUs = require("../support/pageObjectModels/contactUs_POM");

describe("Contact Us form", () => {
    beforeEach(() => {
        cy.visit("/contact-us");
    });

    it("submits with a proper data", () => {
        ContactUs.typeName("John Doe");
        ContactUs.typeEmail();
        ContactUs.typeSubject("Test subject");
        ContactUs.typeMessage(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        );
        ContactUs.submit();
        ContactUs.responseMessage()
            .should("have.class", "alert-success")
            .and("contain", "Message Sent Successfully");
    });

    it("blocks submision with empty message field", () => {
        ContactUs.typeName("John Doe");
        ContactUs.typeEmail();
        ContactUs.typeSubject("Test subject");
        ContactUs.typeMessage("");
        ContactUs.submit();
        ContactUs.responseMessage()
            .should("have.class", "alert-danger")
            .and("contain", "The Message field is required.");
    });

    it("blocks submision with email address with improper domain", () => {
        ContactUs.typeName("John Doe");
        ContactUs.typeEmail("invalidDomain");
        ContactUs.typeSubject("Test subject");
        ContactUs.typeMessage(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        );
        ContactUs.submit();
        ContactUs.responseMessage()
            .should("have.class", "alert-danger")
            .and(
                "contain",
                "The Email field must contain a valid email address."
            );
    });
});
