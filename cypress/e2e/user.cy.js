import { login, logout } from "./loginPage.cy";

const baseUrl = 'http://localhost:8081';

describe('User interaction', () => {
    before(() => {
        cy.visit(`${baseUrl}/login`);
        login();
    });

    it('should have user interaction buttons on each series card', () => {
        cy.get('.series-card--style--oUPrI').each(($card) => {
            cy.wrap($card).find('.card-buttons--style--Zheky').should('exist');
            cy.wrap($card).find('.buttons--style--sstVi').should('exist');
            cy.wrap($card).find('.mini-button--style--LGdqg').should('have.length', 3);
        });
    });

    it('should mark a series as favorite and verify it appears in favorites', () => {
        cy.get('.series-card--style--oUPrI').first().within(() => {
            cy.get('.h3--style--ptztr').invoke('text').as('seriesTitle');
            cy.get('.buttons--style--sstVi .mini-button--style--LGdqg').each(($button) => {
                cy.wrap($button).click();
            });
        });
        cy.get('button.menu-component--style--AJk98').click();
        cy.get('.menu--style--W66WY .link--style--QWkLB a[href="/user/favorites"]').click();
        cy.url().should('include', '/user/favorites');
        cy.get('.series-card--style--oUPrI').should('exist');
        cy.get('@seriesTitle').then((seriesTitle) => {
            cy.get('.series-card--style--oUPrI .h3--style--ptztr')
                .should('contain', seriesTitle);
        });
    });

    after(() => {
        logout();
    });
});