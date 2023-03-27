describe('Listar rotas', () => {
  it('Visita a página inicial', () => {
    cy.visit('/');
    cy.url().should('include', 'login');
  })

  it('Visita a página do gestor de logistica', () => {
    cy.visit('/');
    cy.url().should('include', 'login');
    cy.get('input[name="email"]').type('costa@gmail.com');
    cy.get('input[name="password"]').type('Costa1234');
    cy.get('[type="checkbox"]').check();
    cy.get('input[name="login"]').click();
    cy.url().should('include', '/gestor-logistica');
  })
  
    it('Visita a página da listagem de rotas', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
      cy.get('input[name="email"]').type('costa@gmail.com');
      cy.get('input[name="password"]').type('Costa1234');
      cy.get('[type="checkbox"]').check();
      cy.get('input[name="login"]').click();
      cy.url().should('include', '/gestor-logistica');

      cy.get('a[href*="/listar-caminho').click()
      cy.url().should('include', '/listar-caminho')

      cy.get('td').should('not.be.empty')

    })
})