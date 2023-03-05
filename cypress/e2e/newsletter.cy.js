describe("Test the newsletter subscribe field", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("Subscribes with already taken email address", () => {
        cy.get("#exampleInputEmail1").type("test@test.com");
        cy.get(".sub_newsletter").click();
        cy.get(".subscriberesponse").should("contain", "Already Subscribed");
    });

    it("Subscibes with new, proper e-mail address", () => {
        const today = new Date();
        const todayString = today
            .toISOString()
            .slice(0, 10)
            .replaceAll("-", "");
        const pseudorandomString = (Math.random() + 1)
            .toString(36)
            .substring(2, 8);
        const emailAddress = `${todayString}.${pseudorandomString}@test.com`;
        cy.get("#exampleInputEmail1").type(emailAddress);
        cy.get(".sub_newsletter").click();
        cy.get(".subscriberesponse").should(
            "contain",
            "Subscribed Successfully"
        );
    });

    it("Subscibes with new, inproper e-mail address", () => {
        const today = new Date();
        const todayString = today
            .toISOString()
            .slice(0, 10)
            .replaceAll("-", "");
        const pseudorandomString = (Math.random() + 1)
            .toString(36)
            .substring(2, 8);
        const emailAddress = `${todayString}.${pseudorandomString}.test.com`;
        cy.get("#exampleInputEmail1").type(emailAddress);
        cy.get(".sub_newsletter").click();
        cy.get(".subscriberesponse").should(
            "contain",
            "Kindly Enter a Valid Email Address."
        );
    });
});
