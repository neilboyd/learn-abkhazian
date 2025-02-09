context('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Correct Title', () => {
    cy.title().should('eq', 'Home page | Learn Abkhazian');
  });

  it('Link to About EN', () => {
    cy.get('li.nav-item a.nav-link span').contains('ENGLISH').click();
    cy.get('h1.dynamic-title').should('include.text', 'Introduction');
  });

  it('Link to About TR', () => {
    cy.get('li.nav-item a.nav-link span').contains('TÜRKÇE').click();
    cy.get('h1.dynamic-title').should('include.text', 'Giriş');
  });

  it('Link to About RU', () => {
    cy.get('li.nav-item a.nav-link span').contains('РУССКИЙ').click();
    cy.get('h1.dynamic-title').should('include.text', 'Введение');
  });

  it('Search "site"', () => {
    cy.get('#search-input').type('site');
    cy.get('#search-results article').should('have.length', 2);
    cy.get(':nth-child(1) > p > b').should('have.text', 'site');
    cy.get(':nth-child(2) > p > b').should('have.text', 'site');
  });
});
