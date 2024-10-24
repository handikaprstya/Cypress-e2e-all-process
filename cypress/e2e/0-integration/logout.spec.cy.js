/// <reference types="cypress" />

describe('logout user test', () => {
    beforeEach(() => {
        cy.visit('//v1/index.html', {timeout: 10000})
        cy.fixture('account').then(account => {
            const username= account.validUser.username
            const password= account.validUser.password

            cy.loginValid(username, password)

        });
    });

    it('User success Logout', () => {
        cy.logout()
    });
});