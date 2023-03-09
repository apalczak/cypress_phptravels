const userProfile = {
    field(name) {
        return cy
            .xpath(`//form[@id="profilefrm"]//input[@name="${name}"]`)
            .scrollIntoView();
    },

    dropdown(name) {
        return cy
            .xpath(`//form[@id="profilefrm"]//select[@name="${name}"]`)
            .scrollIntoView();
    },

    switchToMyProfile() {
        cy.get("#body-section ul li a")
            .eq(1)
            .invoke("removeAttr", "onclick")
            .click();
    },

    submitProfileForm() {
        cy.xpath(`//form[@id="profilefrm"]//button[text()=" Submit "]`)
            .scrollIntoView()
            .click();
    },

    formAlert() {
        return cy.get("#profile").find(".alert");
    },
};

export default userProfile;
