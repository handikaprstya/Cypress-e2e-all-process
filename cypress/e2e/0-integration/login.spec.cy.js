/// <reference types="cypress" />

describe('Login Test', () => {
    beforeEach(() => {
        cy.visit('/v1/index.html', {timeout: 10000})
    });

    it('Should login with valid credentials', () => {
        cy.fixture('account').then(account => {
            const username = account.validUser.username
            const password = account.validUser.password

            cy.loginValid(username, password)
            cy.get('.app_logo').should('be.visible')
            cy.get('.product_label').should('contain.text', 'Products')
            cy.url().should('include', 'inventory.html')
        });
    });

    it('Should login with invalid credentials', () => {
        cy.fixture('account').then(account => {
            const username = account.invalidUser.username
            const password = account.invalidUser.password

            cy.loginInvalid(username, password)
            cy.get('h3').should('contain.text', 'Epic sadface: Username and password do not match any user in this service')
            cy.url().should('include', 'index.html')
        });
    });
});