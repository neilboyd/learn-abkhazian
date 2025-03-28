context('Lesson EN Page', () => {
  beforeEach(() => {
    cy.visit('/en/les1');
  });

  it('Correct Title', () => {
    cy.title().should('eq', 'Lesson 1 | Learn Abkhazian');
  });

  it('Link to Lesson 2', () => {
    cy.get('nav a.btn p').contains('Lesson 2').click();
    cy.get('h3').should('have.text', 'Lesson 2');
  });

  it('Link to TOC', () => {
    cy.get('nav a.btn p').contains('Table Of Contents').click();
    cy.get('h3').should('have.text', 'Table Of Contents');
  });

  it('Search "bookshop"', () => {
    cy.get('#search-input').type('bookshop');
    cy.get('#search-results article').should('have.length', 1);
    cy.get(':nth-child(1) > p > b').should('have.text', 'bookshop');
  });

  it('Has comments section', () => {
    cy.get('footer').scrollIntoView();
    cy.get('div#disqus_thread iframe').should('have.attr', 'title', 'Disqus');
  });
});
