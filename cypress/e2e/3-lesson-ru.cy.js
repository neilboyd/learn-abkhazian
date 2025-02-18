context('Lesson RU Page', () => {
  beforeEach(() => {
    cy.visit('/ru/les1');
  });

  it('Correct Title', () => {
    cy.title().should('eq', 'Урок 1 | Learn Abkhazian');
  });

  it('Link to Lesson 2', () => {
    cy.get('nav a.btn p').contains('Урок 2').click();
    cy.get('h3').should('have.text', 'Урок 2');
  });

  it('Link to TOC', () => {
    cy.get('nav a.btn p').contains('Содержание').click();
    cy.get('h3').should('have.text', 'Содержание');
  });

  it('Search "выпущена"', () => {
    cy.get('#search-input').type('выпущена');
    cy.get('#search-results article').should('have.length', 1);
    cy.get(':nth-child(1) > p > b').should('have.text', 'выпущена');
  });

  it('Has comments section', () => {
    cy.get('footer').scrollIntoView();
    cy.get('div#disqus_thread iframe').should('have.attr', 'title', 'Disqus');
  });
});
