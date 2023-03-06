class Newsletter {
    static typeRandomEmail = (type) => {
        const today = new Date();
        const todayString = today
            .toISOString()
            .slice(0, 10)
            .replaceAll("-", "");
        const pseudorandomString = (Math.random() + 1)
            .toString(36)
            .substring(2, 8);

        let emailAddress = `${todayString}.${pseudorandomString}@test.com`;
        switch (type) {
            case "noAtSign":
                emailAddress = `${todayString}.${pseudorandomString}.at.test.com`;
                break;
            case "invalidDomain":
                emailAddress = `${todayString}.${pseudorandomString}@.test`;
                break;
            default:
                emailAddress = `${todayString}.${pseudorandomString}@test.com`;
        }
        cy.get("#exampleInputEmail1").type(emailAddress);
        cy.get(".sub_newsletter").click();
    };
}

export default Newsletter;
