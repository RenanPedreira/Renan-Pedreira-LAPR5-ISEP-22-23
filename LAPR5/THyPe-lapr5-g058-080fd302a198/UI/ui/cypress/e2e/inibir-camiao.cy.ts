describe('Criar camião', () => {
    it('Visita a página inicial', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
    })
  
    it('Visita a página do gestor de frota', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
      cy.get('input[name="email"]').type('huang@gmail.com');
      cy.get('input[name="password"]').type('God1234567');
      cy.get('[type="checkbox"]').check();
      cy.get('input[name="login"]').click();
      cy.url().should('include', '/gestor-frota');
    })
  
    it('Visita a página de inibir um camião', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
      cy.get('input[name="email"]').type('huang@gmail.com');
      cy.get('input[name="password"]').type('God1234567');
      cy.get('[type="checkbox"]').check();
      cy.get('input[name="login"]').click();
      cy.url().should('include', '/gestor-frota');
      cy.get('a[href*="/inibir-camiao').click();
      cy.url().should('include', '/inibir-camiao');
    })

    it('Visita a página de inibir um camião e inibir um camião', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
      cy.get('input[name="email"]').type('huang@gmail.com');
      cy.get('input[name="password"]').type('God1234567');
      cy.get('[type="checkbox"]').check();
      cy.get('input[name="login"]').click();
      cy.url().should('include', '/gestor-frota');
      cy.get('a[href*="/inibir-camiao').click();
      cy.url().should('include', '/inibir-camiao');

      cy.get('select').select
      cy.get('td').should('not.be.empty')
    })
})