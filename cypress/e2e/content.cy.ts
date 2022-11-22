describe('Main content', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Initial check of content', () => {
    it('should show current type game in title', () => {
      cy.get('.game-wrapper > .title').should('have.text', 'Game type: people');
    });

    it('shuld contain play and reset button', () => {
      cy.get('.buttons button').should((btns) => {
        expect(btns).to.have.length(2);
        expect(btns[0]).to.have.text(' Play ');
        expect(btns[1]).to.have.text(' Reset ');
      });
    });

    it('should show "press play btn info" initially', () => {
      cy.get('h3:last').should('have.text', 'Press "Play" Btn to start');
    });
  });

  describe('check functionality', () => {
    it('should show player cards after press "Play" btn', () => {
      cy.intercept('https://swapi.dev/api/people/**').as('resource');
      cy.get('button[color="primary"]').click();
      cy.wait('@resource');

      cy.get('.players:last').then(($text) => {
        if ($text.hasClass('players-game')) {
          expect($text.children()[0]).have.attr('class', 'player1');
        } else {
          cy.get('h3:last').should('have.text', 'Press "Play" Btn to start');
        }
      });
    });
  });
});
