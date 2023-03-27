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

  it('Visita a página da criação de um camião', () => {
    cy.visit('/');
    cy.url().should('include', 'login');
    cy.get('input[name="email"]').type('huang@gmail.com');
    cy.get('input[name="password"]').type('God1234567');
    cy.get('[type="checkbox"]').check();
    cy.get('input[name="login"]').click();
    cy.url().should('include', '/gestor-frota');
    cy.get('a[href*="/criar-camiao').click()
    cy.url().should('include', '/criar-camiao')
  })

  it('Visita a página da criação de um camião e cria uma camião sem dados', () => {
    cy.visit('/');
    cy.url().should('include', 'login');
    cy.get('input[name="email"]').type('huang@gmail.com');
    cy.get('input[name="password"]').type('God1234567');
    cy.get('[type="checkbox"]').check();
    cy.get('input[name="login"]').click();
    cy.url().should('include', '/gestor-frota');
    cy.get('a[href*="/criar-camiao').click();
    cy.url().should('include', '/criar-camiao');

    cy.get('button').click();
    cy.url().should('include', '/criar-camiao');
  })

  // it('Visita a página da criação de um camião e cria uma camião de matrícula inválida', () => {
  //   cy.visit('/');
  //   cy.url().should('include', 'login');
  //   cy.get('input[name="email"]').type('huang@gmail.com');
  //   cy.get('input[name="password"]').type('God1234567');
  //   cy.get('[type="checkbox"]').check();
  //   cy.get('input[name="login"]').click();
  //   cy.url().should('include', '/gestor-frota');
  //   cy.get('a[href*="/criar-camiao').click();
  //   cy.url().should('include', '/criar-camiao');

  //   cy.get('#matricula').type('AAA-11-AA');
  //   cy.get('#tara').type('1000');
  //   cy.get('#cargaKg').type('200');
  //   cy.get('#cargaKWh').type('100');
  //   cy.get('#autonomia').type('10');
  //   cy.get('#carregamento').type('2');
  //   cy.get('button').click();
  //   cy.url().should('include', '/criar-camiao');
  // })

  // it('Visita a página da criação de um camião e cria uma camião de tara inválida', () => {
  //   cy.visit('/');
  //   cy.url().should('include', 'login');
  //   cy.get('input[name="email"]').type('huang@gmail.com');
  //   cy.get('input[name="password"]').type('God1234567');
  //   cy.get('[type="checkbox"]').check();
  //   cy.get('input[name="login"]').click();
  //   // cy.get('a[href*="/gestor-frota"]').click();
  //   cy.url().should('include', '/gestor-frota');
  //   cy.get('a[href*="/criar-camiao').click();
  //   cy.url().should('include', '/criar-camiao');

  //   cy.get('#matricula').type('AA-11-AA')
  //   cy.get('#tara').type('-1')
  //   cy.get('#cargaKg').type('200')
  //   cy.get('#cargaKWh').type('100')
  //   cy.get('#autonomia').type('10')
  //   cy.get('#carregamento').type('2')
  //   cy.get('button').click();
  //   cy.url().should('include', '/criar-camiao')
  // })

  // it('Visita a página da criação de um camião e cria uma camião de cargaKg inválida', () => {
  //   cy.visit('/');
  //   cy.url().should('include', 'login');
  //   cy.get('input[name="email"]').type('huang@gmail.com');
  //   cy.get('input[name="password"]').type('God1234567');
  //   cy.get('[type="checkbox"]').check();
  //   cy.get('input[name="login"]').click();
  //   // cy.get('a[href*="/gestor-frota"]').click();
  //   cy.url().should('include', '/gestor-frota');
  //   cy.get('a[href*="/criar-camiao').click();
  //   cy.url().should('include', '/criar-camiao');

  //   cy.get('#matricula').type('AA-11-AA')
  //   cy.get('#tara').type('1000')
  //   cy.get('#cargaKg').type('-1')
  //   cy.get('#cargaKWh').type('100')
  //   cy.get('#autonomia').type('10')
  //   cy.get('#carregamento').type('2')
  //   cy.get('button').click();
  //   cy.url().should('include', '/criar-camiao')
  // })

  // it('Visita a página da criação de um camião e cria uma camião de cargaKWh inválida', () => {
  //   cy.visit('/');
  //   cy.url().should('include', 'login');
  //   cy.get('input[name="email"]').type('huang@gmail.com');
  //   cy.get('input[name="password"]').type('God1234567');
  //   cy.get('[type="checkbox"]').check();
  //   cy.get('input[name="login"]').click();
  //   // cy.get('a[href*="/gestor-frota"]').click();
  //   cy.url().should('include', '/gestor-frota');
  //   cy.get('a[href*="/criar-camiao').click();
  //   cy.url().should('include', '/criar-camiao');

  //   cy.get('#matricula').type('AA-11-AA')
  //   cy.get('#tara').type('1000')
  //   cy.get('#cargaKg').type('200')
  //   cy.get('#cargaKWh').type('-1')
  //   cy.get('#autonomia').type('10')
  //   cy.get('#carregamento').type('2')
  //   cy.get('button').click();
  //   cy.url().should('include', '/criar-camiao')
  // })

  // it('Visita a página da criação de um camião e cria uma camião de autonomia inválida', () => {
  //   cy.visit('/');
  //   cy.url().should('include', 'login');
  //   cy.get('input[name="email"]').type('huang@gmail.com');
  //   cy.get('input[name="password"]').type('God1234567');
  //   cy.get('[type="checkbox"]').check();
  //   cy.get('input[name="login"]').click();
  //   // cy.get('a[href*="/gestor-frota"]').click();
  //   cy.url().should('include', '/gestor-frota');
  //   cy.get('a[href*="/criar-camiao').click();
  //   cy.url().should('include', '/criar-camiao');

  //   cy.get('#matricula').type('AA-11-AA')
  //   cy.get('#tara').type('1000')
  //   cy.get('#cargaKg').type('200')
  //   cy.get('#cargaKWh').type('100')
  //   cy.get('#autonomia').type('-1')
  //   cy.get('#carregamento').type('2')
  //   cy.get('button').click();
  //   cy.url().should('include', '/criar-camiao')
  // })

  // it('Visita a página da criação de um camião e cria uma camião de carregamento inválido', () => {
  //   cy.visit('/');
  //   cy.url().should('include', 'login');
  //   cy.get('input[name="email"]').type('huang@gmail.com');
  //   cy.get('input[name="password"]').type('God1234567');
  //   cy.get('[type="checkbox"]').check();
  //   cy.get('input[name="login"]').click();
  //   // cy.get('a[href*="/gestor-frota"]').click();
  //   cy.url().should('include', '/gestor-frota');
  //   cy.get('a[href*="/criar-camiao').click();
  //   cy.url().should('include', '/criar-camiao');

  //   cy.get('#matricula').type('AA-11-AA')
  //   cy.get('#tara').type('1000')
  //   cy.get('#cargaKg').type('200')
  //   cy.get('#cargaKWh').type('100')
  //   cy.get('#autonomia').type('5')
  //   cy.get('#carregamento').type('-1')
  //   cy.get('button').click();
  //   cy.url().should('include', '/criar-camiao')
  // })

  // it('Visita a página da criação de um camião e cria uma camião válido', () => {
  //   cy.visit('/');
  //   cy.url().should('include', 'login');
  //   cy.get('input[name="email"]').type('huang@gmail.com');
  //   cy.get('input[name="password"]').type('God1234567');
  //   cy.get('[type="checkbox"]').check();
  //   cy.get('input[name="login"]').click();
  //   // cy.get('a[href*="/gestor-frota"]').click();
  //   cy.url().should('include', '/gestor-frota');
  //   cy.get('a[href*="/criar-camiao').click();
  //   cy.url().should('include', '/criar-camiao');

  //   cy.get('#matricula').type('AA-11-AA')
  //   cy.get('#tara').type('1000')
  //   cy.get('#cargaKg').type('200')
  //   cy.get('#cargaKWh').type('100')
  //   cy.get('#autonomia').type('5')
  //   cy.get('#carregamento').type('2')
  //   cy.get('button').click();
  //   cy.url().should('include', '/criar-camiao')
  // })
})