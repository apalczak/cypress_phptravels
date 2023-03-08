class LoginForm {
    static typeUsername(username) {
        cy.xpath('//form[@id="loginfrm"]//input[@name="username"]')
            .scrollIntoView()
            .clear()
            .type(username)
            .should("have.attr", "required");
    }

    static typePassword(password) {
        cy.xpath('//form[@id="loginfrm"]//input[@name="password"]')
            .scrollIntoView()
            .clear()
            .type(password)
            .should("have.attr", "required");
    }

    static clickLoginBtn() {
        cy.xpath('//form[@id="loginfrm"]//button[text()="Login"]')
            .scrollIntoView()
            .click();
    }
}

export default LoginForm;
