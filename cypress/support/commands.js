// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('loginValid', (username, password) => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.get('#user-name').clear()
    cy.get('#user-name').type(username)
    cy.get('#password').clear()
    cy.get('#password').type(password)
    cy.get('#login-button').click()
});

Cypress.Commands.add('loginInvalid', (username, password) => {
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.get('#user-name').clear()
    cy.get('#user-name').type(username)
    cy.get('#password').clear()
    cy.get('#password').type(password)
    cy.get('#login-button').click()
});

Cypress.Commands.add('addToCart', () => {
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.get('.inventory_item').last().find('button').click()
    cy.get('.shopping_cart_badge').should('contain.text', '1')
});

Cypress.Commands.add('multipleCart', () => {
    cy.get('.inventory_item').each(($item) => {
        cy.wrap($item).find('button').click()
    });
    cy.get('.shopping_cart_badge').should('contain.text', '6')
});

Cypress.Commands.add('removeCart', () => {
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.get('.fa-layers-counter').click();
    // cy.get('.cart_item').find('button').click();
    cy.get('.cart_item').each(($el) => {
        cy.wrap($el).find('button').click()
    });
    cy.get('.btn_secondary').click()
    // cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    // cy.get('.shopping_cart_badge').should('not.exist');
});

Cypress.Commands.add('checkout', () => {
    cy.clearCookies()
    cy.clearAllLocalStorage()
    cy.get('#login-button').click();
    cy.get('.inventory_item').first().find('button').click();
    cy.get('.shopping_cart_link').click();
});

Cypress.Commands.add('order', () => {

    cy.get('.fa-layers-counter').click();
    cy.get('.btn_action').click();
    cy.get('[data-test="firstName"]').type('Handika');
    cy.get('[data-test="lastName"]').type('Prasetya');
    cy.get('[data-test="postalCode"]').type('12345');
    cy.get('.btn_primary').click();
    cy.get('.btn_action').click();
    cy.get('.complete-header').should('contain.text', 'THANK YOU FOR YOUR ORDER');
});

Cypress.Commands.add('logout', () => {
    cy.get('.bm-burger-button').click();
    cy.get('#logout_sidebar_link').click();
    cy.url().should('include', '/');
    cy.get('.login_logo').should('be.visible')
    cy.get('#login_credentials > h4').should('contain.text', 'Accepted usernames are:')
});