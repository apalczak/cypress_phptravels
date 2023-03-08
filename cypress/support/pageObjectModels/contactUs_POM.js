const randomEmail = require("../../fixtures/random_email");

class ContactUs {
    static typeName(name) {
        cy.xpath('//div[@id="body-section"]//form//input[@name="contact_name"]')
            .scrollIntoView()
            .clear()
            .type(name)
            .should("have.attr", "required");
    }

    static typeEmail(type) {
        cy.xpath(
            '//div[@id="body-section"]//form//input[@name="contact_email"]'
        )
            .scrollIntoView()
            .clear()
            .type(randomEmail(type))
            .should("have.attr", "required");
    }

    static typeSubject(subject) {
        cy.xpath(
            '//div[@id="body-section"]//form//input[@name="contact_subject"]'
        )
            .scrollIntoView()
            .clear()
            .type(subject)
            .should("have.attr", "required");
    }

    static typeMessage(message) {
        cy.xpath(
            '//div[@id="body-section"]//form//textarea[@name="contact_message"]'
        )
            .scrollIntoView()
            .clear()
            .type(message);
    }

    static submit() {
        cy.xpath(
            '//div[@id="message-contact"]/../..//*[@name="submit_contact"]'
        )
            .scrollIntoView()
            .click();
    }

    static responseMessage() {
        return cy.xpath('//div[@id="body-section"]//form/div[1]/div[1]');
    }
}

export default ContactUs;
