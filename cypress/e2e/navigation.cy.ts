describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Elements', () => {
    it('should have correct title', () => {
      cy.get('h2').should('have.text', 'Code&Pepper - Star Wars Game');
    });

    it('should have dropdown with game type', () => {
      cy.get('mat-toolbar').invoke('attr', 'color').should('eq', 'primary');
    });

    it('should contain people in mat-options', () => {
      cy.get('mat-select')
        .click()
        .get('mat-option')
        .should('contain', 'people');

      cy.get('body').click();
    });

    it('should contain starships in mat-option', () => {
      cy.get('mat-select')
        .click()
        .get('mat-option')
        .should('contain', 'starships');

      cy.get('body').click();
    });
  });
});
