/// <reference types="cypress" />
let Chance = require('chance');
let chance = new Chance()


When(/^informar meus dados$/, () => {
    cy.get("Input[placeholder='First Name']").type(chance.first())
    cy.get("Input[placeholder='Last Name']").type(chance.last())
    cy.get('input[type=email]').type(chance.email())
    cy.get('input[id=imagesrc]').attachFile('image.jpg');
    cy.get("[ng-model='Adress']").type('Rua Bom Pastor, 731, apto 205, bairro centro, divinópolis, Minas Gerais')
    cy.get('input[type=tel]').type(chance.phone({ formatted: false }))
    cy.get('input[value=Male]').click()
    cy.get('#checkbox1').check()
    cy.get('#checkbox2').check()
    cy.get('#checkbox3').check()
    cy.get('#msdd').click()
    cy.contains("multi-select li:nth-child(29)", 'Portuguese').click()
    cy.get('div #Skills').select('APIs', { force: true });
    cy.get('#countries').select('Brazil', { force: true })
    cy.get('.select2-selection--single').click()
    cy.contains('#select2-country-results > li:nth-child(5)', 'Hong Kong').click()
    cy.get('#yearbox  ').select('1988', { force: true });
    cy.get('[placeholder=Month]').select('February', { force: true });
    cy.get('#daybox').select('18', { force: true });
    cy.get('#firstpassword').type('101827Rm@')
    cy.get('#secondpassword').type('101827Rm@')
});

When(/^salvar$/, () => {
    cy.get('#submitbtn').click()
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.equal(200)
    })

    cy.wait('@postUsertable').then((resUsertable) => {
        expect(resUsertable.status).to.equal(200)
        expect(resUsertable.responseBody.name).to.equal('João')
    })

    cy.wait('@getNewtable').then((resNewtable) => {
        expect(resNewtable.status).to.equal(200)
    })

    cy.url().should('contain', 'WebTable')
});

