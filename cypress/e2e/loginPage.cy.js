describe('Login Page', () => {
    const baseUrl = 'http://localhost:8080';

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

    it('should validate form fields', () => {
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
        cy.get('input#email').type('invalid-email');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
        cy.get('input#email').clear().type('test@example.com');
        cy.get('input#password').type('1234');
        cy.get('button[type="submit"]').click();
        cy.url().should('include', '/login');
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

});