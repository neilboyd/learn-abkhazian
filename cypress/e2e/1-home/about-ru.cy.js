context('About RU Page', () => {
  beforeEach(() => {
    cy.visit('/about-ru/');
  });

  it('Correct Title', () => {
    cy.title().should('eq', 'Введение | Learn Abkhazian');
  });

  it('Link to Lesson 1', () => {
    cy.get('nav a.btn p').contains('Урок 1').click();
    cy.get('h3').should('have.text', 'Урок 1');
  });
});
