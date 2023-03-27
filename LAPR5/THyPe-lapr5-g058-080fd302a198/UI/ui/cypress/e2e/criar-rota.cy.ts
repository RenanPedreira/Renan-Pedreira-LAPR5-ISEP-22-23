describe('Criar rota', () => {
    it('Visita a página inicial', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
    })
  
    it('Visita a página do gestor de logística', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
      cy.get('input[name="email"]').type('costa@gmail.com');
      cy.get('input[name="password"]').type('Costa1234');
      cy.get('[type="checkbox"]').check();
      cy.get('input[name="login"]').click();

      cy.url().should('include', '/gestor-logistica');
    })
  
    it('Visita a página da criação de uma rota', () => {
      cy.visit('/');
      cy.url().should('include', 'login');
      cy.get('input[name="email"]').type('costa@gmail.com');
      cy.get('input[name="password"]').type('Costa1234');
      cy.get('[type="checkbox"]').check();
      cy.get('input[name="login"]').click();

      cy.url().should('include', '/gestor-logistica');

      cy.get('a[href*="/criar-rota').click()
      cy.url().should('include', '/criar-rota')
    })

    // it('Visita a página da criação de uma rota e cria uma rota com distância inválida', () => {
    //   cy.visit('/')
    //   cy.url().should('include', 'dashboard')

    //   cy.get('.dropdown-content').invoke('show')
    //   cy.get('a[href*="/gestor-logistica"]').click()
    //   cy.url().should('include', '/gestor-logistica')
    
    //   cy.get('a[href*="/criar-rota').click()
    //   cy.url().should('include', '/criar-rota')
     
    //   cy.get('input[name="distancia"]').type('-1')
    //   cy.get('input[name="armazemOrigem"]').type('1')
    //   cy.get('input[name="armazemDestino"]').type('2')
    //   cy.get('input[name="tempoPercorrer"]').type('50')
    //   cy.get('input[name="tempoCarregamento"]').type('30')
    //   cy.get('input[name="tempoCarregamentoExtra"]').type('0')

    //   cy.get('button').click();
    //   cy.url().should('include', '/criar-rota')
    // })

    // it('Visita a página da criação de uma rota e cria uma rota com armazém inválido', () => {
    //   cy.visit('/')
    //   cy.url().should('include', 'dashboard')

    //   cy.get('.dropdown-content').invoke('show')
    //   cy.get('a[href*="/gestor-logistica"]').click()
    //   cy.url().should('include', '/gestor-logistica')

    //   cy.get('a[href*="/criar-rota').click()
    //   cy.url().should('include', '/criar-rota')

    //   cy.get('input[name="distancia"]').type('30')
    //   cy.get('input[name="armazemOrigem"]').type('10000')
    //   cy.get('input[name="armazemDestino"]').type('2')
    //   cy.get('input[name="tempoPercorrer"]').type('50')
    //   cy.get('input[name="tempoCarregamento"]').type('30')
    //   cy.get('input[name="tempoCarregamentoExtra"]').type('0')

    //   cy.get('button').click();
    //   cy.url().should('include', '/criar-rota')
    // })


    // it('Visita a página da criação de uma rota e cria uma rota com tempo de carregamento inválido', () => {
    //   cy.visit('/')
    //   cy.url().should('include', 'dashboard')

    //   cy.get('.dropdown-content').invoke('show')
    //   cy.get('a[href*="/gestor-logistica"]').click()
    //   cy.url().should('include', '/gestor-logistica')

    //   cy.get('a[href*="/criar-rota').click()
    //   cy.url().should('include', '/criar-rota')
 
    //   cy.get('input[name="distancia"]').type('30')
    //   cy.get('input[name="armazemOrigem"]').type('1')
    //   cy.get('input[name="armazemDestino"]').type('2')
    //   cy.get('input[name="tempoPercorrer"]').type('60')
    //   cy.get('input[name="tempoCarregamento"]').type('-1')
    //   cy.get('input[name="tempoCarregamentoExtra"]').type('0')

    //   cy.get('button').click();
    //   cy.url().should('include', '/criar-rota')
    // })

    // it('Visita a página da criação de uma rota e cria uma rota com tempo de carregamento extra inválido', () => {
    //   cy.visit('/')
    //   cy.url().should('include', 'dashboard')

    //   cy.get('.dropdown-content').invoke('show')
    //   cy.get('a[href*="/gestor-logistica"]').click()
    //   cy.url().should('include', '/gestor-logistica')

    //   cy.get('a[href*="/criar-rota').click()
    //   cy.url().should('include', '/criar-rota')

    //   cy.get('input[name="distancia"]').type('30')
    //   cy.get('input[name="armazemOrigem"]').type('1')
    //   cy.get('input[name="armazemDestino"]').type('2')
    //   cy.get('input[name="tempoPercorrer"]').type('60')
    //   cy.get('input[name="tempoCarregamento"]').type('15')
    //   cy.get('input[name="tempoCarregamentoExtra"]').type('-1')

    //   cy.get('button').click();
    //   cy.url().should('include', '/criar-rota')
    // })
})