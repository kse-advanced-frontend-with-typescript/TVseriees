describe('Sign-up Form', () => {
    const baseUrl = 'http://localhost:8081';

    beforeEach(() => {
        cy.visit(`${baseUrl}/sign`);
    });

    it('should display the form', () => {
        cy.get('h1').should('have.text', 'TVSerieees');
        cy.get('.form--style--fhI3p').should('be.visible');
        cy.get('#username').should('be.visible');
        cy.get('#email').should('be.visible');
        cy.get('#password').should('be.visible');
        cy.get('#confirmPassword').should('be.visible');
        cy.get('button[type="submit"]').should('be.visible');
    });
    it('should register a new user', () => {
        cy.get('.form--style--fhI3p').should('be.visible');
        cy.get('#username').type('andrii');
        cy.get('#email').type('andrii@example.com');
        cy.get('#password').type('12345');
        cy.get('#confirmPassword').type('12345');
        cy.get('button[type="submit"]').first().click();
        cy.url().should('include', '/login', {delay: 290});
    });
});