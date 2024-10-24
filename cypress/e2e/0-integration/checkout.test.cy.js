/// <reference types="cypress" />

describe('Complete checkout' , () => {
    beforeEach(() => {
        cy.visit('/v1/index.html', {timeout: 10000})
        cy.fixture('account').then(account => {
            const username = account.validUser.username
            const password = account.validUser.password

            cy.loginValid(username, password)
            cy.get('.app_logo').should('be.visible')
            cy.get('.product_label').should('contain.text', 'Products')
            cy.url().should('include', 'inventory.html')

            cy.addToCart()

        });
    });

    it('Should complete the checkout process', () => {
        cy.order()
        cy.url().should('include', 'v1/checkout-complete.html')
    });
});