context('About EN Page', () => {
  beforeEach(() => {
    cy.visit('/about-en/');
  });

  it('Correct Title', () => {
    cy.title().should('eq', 'Introduction | Learn Abkhazian');
  });

  it('Link to Lesson 1', () => {
    cy.get('nav a.btn p').contains('Lesson 1').click();
    cy.get('h3').should('have.text', 'Lesson 1');
  });

  it('Search "bookshop"', () => {
    cy.get('#search-input').type('bookshop');
    cy.get('#search-results article').should('have.length', 1);
    cy.get(':nth-child(1) > p > b').should('have.text', 'bookshop');
  });
});
