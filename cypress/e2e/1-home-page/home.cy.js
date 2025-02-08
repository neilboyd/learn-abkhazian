context('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Correct Title', () => {
    cy.title().should('eq', 'Home page | Learn Abkhazian');
  });

  it('About EN', () => {
    cy.get('li.nav-item a.nav-link span').contains('ENGLISH').click();
    cy.get('h1.dynamic-title').should('include.text', 'Introduction');
  });

  it('About TR', () => {
    cy.get('li.nav-item a.nav-link span').contains('TÜRKÇE').click();
    cy.get('h1.dynamic-title').should('include.text', 'Giriş');
  });

  it('About RU', () => {
    cy.get('li.nav-item a.nav-link span').contains('РУССКИЙ').click();
    cy.get('h1.dynamic-title').should('include.text', 'Введение');
  });
});
