describe('Main page: ', ()=>{
    const baseUrl = 'http://localhost:8080/';
    beforeEach(()=> {
        cy.visit(baseUrl);
    });
    describe('a header', ()=>{
        it('should havevital components', ()=>{
            cy.get('h1').should('exist').and('contain.text', 'TVSerieees');
            cy.get('button[class^="menu-component"]').should('exist').and('contain.text', 'Menu');
            cy.get('img[alt="search icon"]').should('exist');
            cy.get('a[href="/login"] button').should('exist').and('have.text', 'Log In');
            cy.get('button.log-in--style--uF14b').should('exist');
            cy.get('a[href="/sign"] button').should('exist').and('have.text', 'Sign Up');
            cy.get('button.sign-in--style--ARCy9').should('exist');

        });
        it('should navigate to main page when search icon is clicked', () => {
            cy.get('a[href="/"] button').click();
            cy.url().should('include', '/');
        });

        it('should navigate to login page when Log In button is clicked', () => {
            cy.get('a[href="/login"] button').click();
            cy.url().should('include', '/login');
        });

        it('should navigate to sign up page when Sign Up button is clicked', () => {
            cy.get('a[href="/sign"] button').click();
            cy.url().should('include', '/sign');
        });
        describe('a menu burger button', ()=>{
            beforeEach(()=> {
                cy.visit(baseUrl);
            });
            it('should open an extended menu on click', () => {
                cy.get('button[class^="menu-component"]').click();
                cy.get('img[alt="cross icon"]').should('exist');
                cy.get('div[class^="menu--style"]').should('be.visible');
                cy.get('h3').should('contain.text', 'Menu');
                cy.get('button[class^="mini-button--style"] img[alt="cross icon"]').should('exist');
                cy.get('ul[class^="menu--style"]').should('exist');
                cy.contains('li[class^="link--style"]', 'top-rated').should('exist');
                cy.contains('li[class^="link--style"]', 'popular').should('exist');
                cy.contains('li[class^="link--style"]', 'on the air').should('exist');
                cy.contains('li[class^="link--style"]', 'airing today').should('exist');
                cy.get('div[class^="auth--style"] a').eq(0).contains('Sign Up').should('exist');
                cy.get('div[class^="auth--style"] a').eq(1).contains('Log In').should('exist');
            });
            it('should open and close the menu', () => {
                cy.get('button[class^="menu-component"]').first().click();
                cy.get('div[class^="menu--style--lA2Qh"]').should('exist');
                cy.get('button[class^="mini-button--style"]').first().click();
                cy.get('div[class^="menu--style--lA2Qh"]').should('not.exist');
            });
            it('should contain a functional login button', () => {
                cy.get('a[href="/login"] button').should('contain.text', 'Log In');
                cy.get('a[href="/login"]').click();
                cy.url().should('include', '/login');
            });

            it('should contain a functional sign-up button', () => {
                cy.get('a[href="/sign"] button').should('contain.text', 'Sign Up');
                cy.get('a[href="/sign"]').click();
                cy.url().should('include', '/sign');
            });
        });
    });
    describe('Footer', () => {
        beforeEach(() => {
            cy.visit(baseUrl);
        });

        it('should have the correct title and description', () => {
            cy.get('footer h4').first().should('have.text', 'TV Serieees');
            cy.get('footer p').first().should('contain.text', 'Discover and explore your favorite TV series');
        });

        it('should have navigation links that work correctly', () => {
            cy.get('footer ul.footer--style--XrH2p li').should('have.length', 4);
            cy.get('footer a[href="/top_rated"]').should('contain.text', 'top-rated');
            cy.get('footer a[href="/popular"]').should('contain.text', 'popular');
            cy.get('footer a[href="/on_the_air"]').should('contain.text', 'on the air');
            cy.get('footer a[href="/airing_today"]').should('contain.text', 'airing today');
            cy.get('footer a[href="/popular"]').click();
            cy.url().should('include', '/popular');
        });

        it('should display contact information correctly', () => {
            cy.get('footer .contactsSection--style--r6V_u h4').should('have.text', 'Contacts');
            cy.get('footer .contact--style--GmTTk').should('have.length', 3);
            cy.get('footer a[href="mailto:margarit.fil@gmail.com"]')
                .should('exist')
                .and('have.text', 'margarit.fil@gmail.com');
            cy.get('footer a[href="mailto:mfilipovych@kse.org.ua"]')
                .should('exist')
                .and('have.text', 'mfilipovych@kse.org.ua');
            cy.get('footer a[href="tel:+38 097 151 9327"]')
                .should('exist')
                .and('have.text', '+38 097 151 9327');
        });

        it('should display copyright information', () => {
            cy.get('footer p.copyright--style--GzPJd')
                .should('contain.text', '© 2025 TV Serieees. All rights reserved.');
        });
    });

    describe('Search and Filter Component', () => {
        beforeEach(() => {
            cy.visit(baseUrl);
        });

        it('should have all filter inputs and search bar', () => {
            cy.get('input[placeholder="year..."]')
                .should('exist')
                .and('have.attr', 'min', '1941')
                .and('have.attr', 'max', '2028')
                .and('have.attr', 'type', 'number');

            cy.get('input[placeholder="Type genre..."]')
                .should('exist')
                .and('have.attr', 'list', 'genre-options');
            cy.get('datalist#genre-options option').should('have.length.at.least', 10);
            cy.get('input[placeholder="Type language..."]')
                .should('exist')
                .and('have.attr', 'list', 'language-options');
            cy.get('input[placeholder="Type country..."]')
                .should('exist')
                .and('have.attr', 'list', 'country-options');
            cy.get('select#filters')
                .should('exist')
                .find('option').should('have.length', 11);

            cy.get('input[placeholder="type name ..."]').should('exist');
        });

        it('should allow entering values in the filters', () => {
            cy.get('input[placeholder="year..."]').clear().type('2020', { delay: 200 });
            cy.get('input[placeholder="year..."]').should('have.value', '2020');
            cy.get('input[placeholder="Type genre..."]').type('Drama', { delay: 200 });
            cy.get('input[placeholder="Type genre..."]').should('have.value', 'Drama');
            cy.get('input[placeholder="Type language..."]').type('English', { delay: 200 });
            cy.get('input[placeholder="Type language..."]').should('have.value', 'English');
            cy.get('input[placeholder="Type country..."]').type('United States', { delay: 200 });
            cy.get('input[placeholder="Type country..."]').should('have.value', 'United States');
            cy.get('select#filters').select('rating (high to low)');
            cy.get('select#filters').should('have.value', 'rating (high to low)');
            cy.get('input[placeholder="type name ..."]').type('Breaking Bad', { delay: 200 });
            cy.get('input[placeholder="type name ..."]').should('have.value', 'Breaking Bad');
        });

        it('should have working dropdown options', () => {
            cy.get('select#filters').select('name (A-Z)');
            cy.get('select#filters').should('have.value', 'name (A-Z)');
            cy.get('select#filters').select('popularity (high to low)');
            cy.get('select#filters').should('have.value', 'popularity (high to low)');
        });

        it('should clear inputs when reset', () => {
            cy.get('input[placeholder="year..."]').type('2022');
            cy.get('input[placeholder="Type genre..."]').type('Comedy');
            cy.get('input[placeholder="year..."]').clear();
            cy.get('input[placeholder="Type genre..."]').clear();
            cy.get('input[placeholder="year..."]').should('have.value', '');
            cy.get('input[placeholder="Type genre..."]').should('have.value', '');
        });
    });

    describe('TV Series Cards', () => {
        beforeEach(() => {
            cy.visit(baseUrl);
        });

        it('should display series cards when there is sth to show', () => {
            cy.get('div[class^="series-container"]').should('exist');
        });
        it('should not display series cards when no data is available', () => {
            cy.intercept('GET', 'https://api.themoviedb.org/3/trending/tv/day**', {
                statusCode: 200,
                body: {
                    page: 1,
                    results: [],
                    total_pages: 0,
                    total_results: 0
                }
            }).as('empty');
            cy.wait('@empty');
            cy.get('div[class^="series-card"]').should('not.exist');
            cy.get('div[class^="series-container"]').should('not.exist');
            cy.get('div[class^="series-card"]').should('not.exist');
        });

            it('should display series cards with correct elements', () => {
            cy.get('div[class^="series-card"]').each(($card) => {
                cy.wrap($card).find('img[class^="image"]').should('exist')
                    .and('have.attr', 'alt').and('include', 'image');
                cy.wrap($card).find('div[class^="h3"]').should('exist').and('not.be.empty');
                cy.wrap($card).find('a[data-discover="true"]').should('exist')
                    .and('have.attr', 'href').and('include', '/serie/');
            });
        });


        it('should navigate to series detail page when clicked', () => {
            cy.get('a[href^="/serie/"]').first().click();
            cy.url().should('include', '/serie/');
        });

        it('should have proper image sources', () => {
            cy.get('img[class^="image"]').each(($img) => {
                cy.wrap($img).should('have.attr', 'src')
                    .and('include', 'https://image.tmdb.org/t/p/w500/');
            });
        });
    });

    describe('Pagination Component', () => {
        beforeEach(() => {
            cy.visit(baseUrl);
        });

        it('should display pagination controls', () => {
            cy.get('div[class^="pagination--style"]').should('exist');
            cy.get('div[class^="pages--style"]').should('exist');
            cy.get('div[class^="pagination--style"] button[class^="mini-button"]').should('have.length', 2);
            cy.get('a[class^="page--style"]').should('have.length', 5);
        });

        it('should have the first page active by default', () => {
            cy.get('a[class^="page--style"]').first()
                .should('have.class', 'active--style--2eRwG');
        });

        it('should have the left arrow button disabled initially', () => {
            cy.get('div[class^="pages--style"] button[class^="mini-button"]').first()
                .should('have.attr', 'disabled');
        });

        it('should have the right arrow button enabled', () => {
            cy.get('div[class^="pages--style"] button[class^="mini-button"]').last()
                .should('not.have.attr', 'disabled');
        });

        it('should navigate to the next page when clicking a page number', () => {
            cy.get('a[class^="page--style"]').eq(1).click();
            cy.get('a[class^="page--style"]').eq(1).should('have.class', 'active--style--2eRwG');
        });


        it('should have a functional "Show more" button', () => {
            cy.get('div[class^="pagination--style"] > button[class^="button--style"]')
                .should('exist')
                .and('contain.text', 'Show more');

            cy.get('div[class^="series-card"]').its('length').then((initialCount) => {
                cy.get('div[class^="pagination--style"] > button[class^="button--style"]').click();
                cy.get('div[class^="series-card"]').should('have.length.greaterThan', initialCount);
            });
        });
        it('should hide pagination controls when no results exist', () => {
            cy.intercept('GET', 'https://api.themoviedb.org/3/trending/tv/day**', {
                statusCode: 200,
                body: {
                    page: 1,
                    results: [],
                    total_pages: 0,
                    total_results: 0
                }
            }).as('noResults');
            cy.visit(baseUrl);
            cy.wait('@noResults');
            cy.get('div[class^="pagination--style"]').should('not.exist');
            cy.get('h2.message--style--c8MtD').should('exist').and('contain.text', 'No results:(((');
        });
    });


});