const baseUrl = 'http://localhost:8081';

export const login = () => {
    cy.get('#email').type('andrii@example.com');
    cy.get('#password').type('12345');
    cy.get('button[type="submit"]').first().click();
};

export const logout = () => {
    cy.get('button.button--style--Ah1MY.log-out--style--JmTx1').contains('Log Out').click();
    cy.get('div.warning--style--F0XrW')
        .find('button.button--style--Ah1MY.log-out--style--JmTx1.warning--style--vBXiz')
        .contains('Log Out')
        .click();
    cy.url().should('eq', `${baseUrl}/`, {delay: 280});
};

describe('Login Page', () => {
    beforeEach(() => {
        cy.visit(`${baseUrl}/login`);
    });

    it('should have the correct UI elements', () => {
        cy.get('h1').should('have.text', 'TVSerieees');
        cy.get('form.form--style--fhI3p').should('exist');

        cy.get('input#email')
            .should('exist')
            .and('have.attr', 'placeholder', 'your email...')
            .and('have.attr', 'type', 'email')
            .and('have.attr', 'required');

        cy.get('input#password')
            .should('exist')
            .and('have.attr', 'placeholder', 'password...')
            .and('have.attr', 'type', 'password')
            .and('have.attr', 'minlength', '5')
            .and('have.attr', 'required');

        cy.get('button[type="submit"]')
            .should('exist')
            .and('have.text', 'Log In')
            .and('have.class', 'log-in--style--uF14b');
    });

    it('should handle failed login', () => {
        cy.intercept('GET', 'https://mapstorage-7e78.restdb.io/rest/my-site-users*', {
            statusCode: 200,
            body: []
        }).as('failedUserLookup');

        cy.get('input#email').type('wrong@example.com');
        cy.get('input#password').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        cy.wait('@failedUserLookup');

        cy.url().should('include', '/login');
        cy.get('p.errorMessage--style--ia1BB')
            .should('exist')
            .and('contain.text', 'Login or password is incorrect!');
    });

    it('should navigate back to home page', () => {
        cy.get('a[href="/"] button').click();
        cy.url().should('eq', `${baseUrl}/`);
    });

    it('should login the existing user', () => {
        login();
        cy.url().should('not.include', '/login', {delay: 290});
    });
});