describe('Atualizar empacotamento', () => {
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
  
    it('Visita a página da atualização de um empacotamento', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
      cy.get('input[name="email"]').type('costa@gmail.com');
      cy.get('input[name="password"]').type('Costa1234');
      cy.get('[type="checkbox"]').check();
      cy.get('input[name="login"]').click();
      cy.url().should('include', '/gestor-logistica');
  
      cy.get('a[href*="/update-empacotamento').click()
      cy.url().should('include', '/update-empacotamento')
    })
  
    it('Visita a página da atualização de um empacotamento e atualiza uma empacotamento sem dados', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
      cy.get('input[name="email"]').type('costa@gmail.com');
      cy.get('input[name="password"]').type('Costa1234');
      cy.get('[type="checkbox"]').check();
      cy.get('input[name="login"]').click();
      cy.url().should('include', '/gestor-logistica');
  
      cy.get('a[href*="/update-empacotamento').click()
      cy.url().should('include', '/update-empacotamento')
  
      cy.get('button').click();
      cy.url().should('include', '/update-empacotamento')
    })
  
    // it('Visita a página da atualização de um empacotamento e atualiza uma empacotamento com posição X errada', () => {
    //   cy.visit('/');
    //   cy.url().should('include', 'login');
    //   cy.get('input[name="email"]').type('costa@gmail.com');
    //   cy.get('input[name="password"]').type('Costa1234');
    //   cy.get('[type="checkbox"]').check();
    //   cy.get('input[name="login"]').click();
    //   cy.url().should('include', '/gestor-logistica');

    //   cy.get('a[href*="/update-empacotamento').click()
    //   cy.url().should('include', '/update-empacotamento')
  
    //   cy.get('input[name="entrega"]').type('1')
    //   cy.get('input[name="camiao"]').type('AA-11-AA')
    //   cy.get('input[name="posicaoX"]').type('-1')
    //   cy.get('input[name="posicaoY"]').type('0')
    //   cy.get('input[name="posicaoZ"]').type('0')
    //   cy.get('button').click();
    //   cy.url().should('include', '/update-empacotamento')
    // })

    // it('Visita a página da atualização de um empacotamento e atualiza uma empacotamento com posição Y errada', () => {
    //  cy.visit('/');
    //   cy.url().should('include', 'login');
    //   cy.get('input[name="email"]').type('costa@gmail.com');
    //   cy.get('input[name="password"]').type('Costa1234');
    //   cy.get('[type="checkbox"]').check();
    //   cy.get('input[name="login"]').click();
    //   cy.url().should('include', '/gestor-logistica');
  
    //   cy.get('a[href*="/update-empacotamento').click()
    //   cy.url().should('include', '/update-empacotamento')
  
    //   cy.get('input[name="entrega"]').type('1')
    //   cy.get('input[name="camiao"]').type('AA-11-AA')
    //   cy.get('input[name="posicaoX"]').type('0')
    //   cy.get('input[name="posicaoY"]').type('-1')
    //   cy.get('input[name="posicaoZ"]').type('0')
    //   cy.get('button').click();
    //   cy.url().should('include', '/update-empacotamento')
    // })
  
    // it('Visita a página da atualização de um empacotamento e atualiza uma empacotamento com posição Z errada', () => {
    //   cy.visit('/');
    //   cy.url().should('include', 'login');
    //   cy.get('input[name="email"]').type('costa@gmail.com');
    //   cy.get('input[name="password"]').type('Costa1234');
    //   cy.get('[type="checkbox"]').check();
    //   cy.get('input[name="login"]').click();
    //   cy.url().should('include', '/gestor-logistica');
  
    //   cy.get('a[href*="/update-empacotamento').click()
    //   cy.url().should('include', '/update-empacotamento')
  
    //   cy.get('input[name="entrega"]').type('1')
    //   cy.get('input[name="camiao"]').type('AA-11-AA')
    //   cy.get('input[name="posicaoX"]').type('0')
    //   cy.get('input[name="posicaoY"]').type('0')
    //   cy.get('input[name="posicaoZ"]').type('-1')
    //   cy.get('button').click();
    //   cy.url().should('include', '/update-empacotamento')
    // })
    
  })