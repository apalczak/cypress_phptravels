///<reference types="cypress"/>

const LoginForm = require("../support/pageObjectModels/loginForm_POM");

describe("Login form", () => {
    beforeEach(() => {
        cy.visit("/login");
    });
    it("logs in correctly with a proper username and password", () => {
        LoginForm.typeUsername("user@phptravels.com");
        LoginForm.typePassword("demouser");
        LoginForm.clickLoginBtn();
        cy.xpath('//div[@id="body-section"]//h3').should(
            "contain",
            "Hi, Johny Smith"
        );
        cy.xpath('//nav//ul[@class="dropdown-menu"]').should(
            "contain",
            "Logout"
        );
    });

    it("doesn't log in correctly with a proper username and improper password", () => {
        LoginForm.typeUsername("user@phptravels.com");
        LoginForm.typePassword("wrongPassword");
        LoginForm.clickLoginBtn();
        cy.xpath('//div[@id="body-section"]//form/div[1]/div[2]/div')
            .should("have.class", "alert-danger")
            .and("contain", "Invalid Email or Password");
    });

    it.only("doesn't log in correctly with a proper username and without password", () => {
        LoginForm.typeUsername("user@phptravels.com");
        LoginForm.clickLoginBtn();
        cy.xpath('//div[@id="body-section"]//form/div[1]/div[2]/div')
            .should("have.class", "alert-danger")
            .and("contain", "Invalid Email or Password");
    });
});
