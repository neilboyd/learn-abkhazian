context('Lesson TR Page', () => {
  beforeEach(() => {
    cy.visit('/tr/les1');
  });

  it('Correct Title', () => {
    cy.title().should('eq', 'Ders 1 | Learn Abkhazian');
  });

  it('Link to Lesson 2', () => {
    cy.get('nav a.btn p').contains('Ders 2').click();
    cy.get('h3').should('have.text', 'Ders 2');
  });

  it('Link to TOC', () => {
    cy.get('nav a.btn p').contains('İçindekiler').click();
    cy.get('h3').should('have.text', 'İçindekiler');
  });

  it('Search "kitapçılara"', () => {
    cy.get('#search-input').type('kitapçılara');
    cy.get('#search-results article').should('have.length', 1);
    cy.get(':nth-child(1) > p > b').should('have.text', 'kitapçılara');
  });

  it('Has comments section', () => {
    cy.get('footer').scrollIntoView();
    cy.get('div#disqus_thread iframe').should('have.attr', 'title', 'Disqus');
  });
});
