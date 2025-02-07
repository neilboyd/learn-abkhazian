context('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Check Home Page Content', () => {
    it('Correct Title', () => {
      cy.title().should('eq', 'Home page | Learn Abkhazian');
    });
  });
});
