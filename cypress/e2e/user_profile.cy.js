///<reference types="cypress"/>

const userProfile = require("../support/pageObjectModels/user_profile_POM");
const loginForm = require("../support/pageObjectModels/loginForm_POM");

const OLD_EMAIL = "user@phptravels.com";
const OLD_PASSWORD = "demouser";
const OLD_PHONE_NUMBER = "123456";
const OLD_ADDRESS1 = "Avenue du Maroc";
const OLD_ADDRESS2 = "R2";
const OLD_CITY = "Casablanca";
const OLD_ZIP = "52000";
const OLD_COUNTRY = "Morocco";

describe("User profile form", () => {
    beforeEach(() => {
        cy.session("user", () => {
            cy.visit("/login");
            loginForm.typeUsername("user@phptravels.com");
            loginForm.typePassword("demouser");
            loginForm.clickLoginBtn();
        });
        cy.visit("/account");
        userProfile.switchToMyProfile();
    });

    afterEach(() => {
        //reset to old values
        userProfile.field("email").clear().type(OLD_EMAIL);
        userProfile.field("password").clear().type(OLD_PASSWORD);
        userProfile.field("confirmpassword").clear().type(OLD_PASSWORD);
        userProfile.field("phone").clear().type(OLD_PHONE_NUMBER);
        userProfile.field("address1").clear().type(OLD_ADDRESS1);
        userProfile.field("address2").clear().type(OLD_ADDRESS2);
        userProfile.field("state").clear();
        userProfile.field("city").clear().type(OLD_CITY);
        userProfile.field("zip").clear().type(OLD_ZIP);
        userProfile.dropdown("country").select(OLD_COUNTRY);
        userProfile.submitProfileForm();
    });

    it("changes user phone number for new, proper one", () => {
        const NEW_PHONE_NUMBER = "987654";
        userProfile.field("phone").clear().type(NEW_PHONE_NUMBER);
        userProfile.submitProfileForm();
        userProfile
            .formAlert()
            .should("have.text", "Profile Updated Successfully.")
            .and("have.class", "alert-success");
        cy.reload();
        userProfile.switchToMyProfile();
        userProfile.field("phone").should("have.value", NEW_PHONE_NUMBER);
    });

    it("deletes user phone number", () => {
        userProfile.field("phone").clear();
        userProfile.submitProfileForm();
        userProfile
            .formAlert()
            .should("have.text", "Profile Updated Successfully.")
            .and("have.class", "alert-success");
        cy.reload();
        userProfile.switchToMyProfile();
        userProfile.field("phone").should("have.value", "");
    });

    it("changes user password", () => {
        const NEW_PASSWORD = "demouser1";

        userProfile.field("password").clear().type(NEW_PASSWORD);
        userProfile.field("confirmpassword").clear().type(NEW_PASSWORD);
        userProfile.submitProfileForm();
        userProfile
            .formAlert()
            .should("have.text", "Profile Updated Successfully.")
            .and("have.class", "alert-success");
        cy.reload();
        userProfile.switchToMyProfile();
    });

    it("doesn't change user password without password confirmation", () => {
        const NEW_PASSWORD = "demouser1";

        userProfile.field("password").clear().type(NEW_PASSWORD);
        userProfile.field("confirmpassword").clear();
        userProfile.submitProfileForm();
        userProfile
            .formAlert()
            .should("have.text", "The Password field is required.\n")
            .and("have.class", "alert-danger");
        cy.reload();
        userProfile.switchToMyProfile();
    });

    it("changes user email address for the new, proper one", () => {
        const NEW_EMAIL = "usersnewemail@phptravels.com";

        userProfile.field("email").clear().type(NEW_EMAIL);
        userProfile.submitProfileForm();
        userProfile
            .formAlert()
            .should("have.text", "Profile Updated Successfully.")
            .and("have.class", "alert-success");
        cy.reload();
        userProfile.switchToMyProfile();
        userProfile.field("email").should("have.value", NEW_EMAIL);
    });

    it("doesn't allow to change user email address for the new, with no @ sign", () => {
        const NEW_EMAIL = "usersnewemail.at.phptravels.com";

        userProfile.field("email").clear().type(NEW_EMAIL);
        userProfile.submitProfileForm();
        userProfile
            .formAlert()
            .should(
                "have.text",
                "The Email field must contain a valid email address.\n"
            )
            .and("have.class", "alert-danger");
        cy.reload();
        userProfile.switchToMyProfile();
        userProfile.field("email").should("have.value", OLD_EMAIL);
    });

    it("doesn't allow to change user email address for the new, with improper domain", () => {
        const NEW_EMAIL = "usersnewemail@phptravels";

        userProfile.field("email").clear().type(NEW_EMAIL);
        userProfile.submitProfileForm();
        userProfile
            .formAlert()
            .should(
                "have.text",
                "The Email field must contain a valid email address.\n"
            )
            .and("have.class", "alert-danger");
        cy.reload();
        userProfile.switchToMyProfile();
        userProfile.field("email").should("have.value", OLD_EMAIL);
    });

    it("changes user postal address", () => {
        const NEW_ADDRESS1 = "Unit A01 Thong khan kham";
        const NEW_ADDRESS2 = "Asean Rd";
        const NEW_STATE = "Chanthabuly District";
        const NEW_CITY = "Vientiane";
        const NEW_ZIP = "12345";
        const NEW_COUNTRY = "Laos";
        const NEW_COUNTRY_SHORT = "LA";

        userProfile.field("address1").clear().type(NEW_ADDRESS1);
        userProfile.field("address2").clear().type(NEW_ADDRESS2);
        userProfile.field("state").clear().type(NEW_STATE);
        userProfile.field("city").clear().type(NEW_CITY);
        userProfile.field("zip").clear().type(NEW_ZIP);
        userProfile.dropdown("country").select(NEW_COUNTRY);
        userProfile.submitProfileForm();
        userProfile
            .formAlert()
            .should("have.text", "Profile Updated Successfully.")
            .and("have.class", "alert-success");
        cy.reload();
        userProfile.switchToMyProfile();
        userProfile.field("address1").should("have.value", NEW_ADDRESS1);
        userProfile.field("address2").should("have.value", NEW_ADDRESS2);
        userProfile.field("state").should("have.value", NEW_STATE);
        userProfile.field("city").should("have.value", NEW_CITY);
        userProfile.field("zip").should("have.value", NEW_ZIP);
        userProfile.dropdown("country").should("have.value", NEW_COUNTRY_SHORT);
    });
});
