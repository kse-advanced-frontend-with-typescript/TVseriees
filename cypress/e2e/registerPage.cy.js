describe('Sign-up Form', () => {
    const baseUrl = 'http://localhost:8080';

    beforeEach(() => {
        cy.visit(`${baseUrl}/sign`);
    });

    it('should display the sign-up form', () => {
        cy.get('h1').should('have.text', 'TVSerieees');
        cy.get('.form--style--fhI3p').should('be.visible');
        cy.get('#username').should('be.visible');
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#confirmPassword').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });
});