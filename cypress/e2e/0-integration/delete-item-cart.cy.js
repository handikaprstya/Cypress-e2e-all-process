/// <reference types="cypress" />

describe('', () => {
    beforeEach(() => {
        cy.visit('/v1/index.html', {timeout: 10000})
        cy.fixture('account').then(account => {
            const username = account.validUser.username
            const password = account.validUser.password

            cy.loginValid(username, password)
            cy.get('.app_logo').should('be.visible')
            cy.get('.product_label').should('contain.text', 'Products')
            cy.url().should('include', 'inventory.html')

            // cy.addToCart()
            cy.multipleCart()
        });
    });

    it('Remove Item From Cart', () => {
        cy.removeCart()
    });
});