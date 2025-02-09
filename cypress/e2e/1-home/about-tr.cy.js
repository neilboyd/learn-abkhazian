context('About TR Page', () => {
  beforeEach(() => {
    cy.visit('/about-tr/');
  });

  it('Correct Title', () => {
    cy.title().should('eq', 'Giriş | Learn Abkhazian');
  });

  it('Link to Lesson 1', () => {
    cy.get('nav a.btn p').contains('Ders 1').click();
    cy.get('h3').should('have.text', 'Ders 1');
  });
});
