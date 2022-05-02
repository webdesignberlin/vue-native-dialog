/// <reference types="cypress" />

describe('Dialog', () => {
  it('Default Dialog should be work', () => {
    cy.visit('iframe.html?id=nativedialog--default');
    cy.get('[data-test="open-modal-btn"]').should('have.text', 'Open Modal false');
    cy.get('.dialog').should('not.be.visible');

    cy.get('[data-test="open-modal-btn"]').click();
    cy.get('[data-test="open-modal-btn"]').should('have.text', 'Open Modal true');
    cy.get('.dialog').should('be.visible');

    cy.get('.dialog').then((el) => {
      const foo = el[0].ownerDocument.defaultView.getComputedStyle(el[0],'::backdrop');
      cy.log(JSON.stringify(foo));
      cy.log(foo['background-color']);
      // cy.log(el[0].ownerDocument.defaultView.getComputedStyle(el[0], 'backdrop'));
    });

    cy.get('[aria-label="Close"]').click();
    cy.get('.dialog').should('not.be.visible');

    cy.get('.dialog').then((el) => {
      const foo = el[0].ownerDocument.defaultView.getComputedStyle(el[0],'::backdrop');
      cy.log(JSON.stringify(foo));
      cy.log(foo['background-color']);
      // cy.log(el[0].ownerDocument.defaultView.getComputedStyle(el[0], 'backdrop'));
    })
  });

  it('Modeless Dialog should be work', () => {
    cy.visit('iframe.html?id=nativedialog--modeless');
    cy.get('[data-test="open-modal-btn"]').should('have.text', 'Open Modal false');
    cy.get('.dialog').should('not.be.visible');

    cy.get('[data-test="open-modal-btn"]').click();
    cy.get('[data-test="open-modal-btn"]').should('have.text', 'Open Modal true');
    cy.get('.dialog').should('be.visible');

    cy.get('[data-test="close-modal-btn"]').click();
    cy.get('.dialog').should('not.be.visible');
  });

  it('Theming should be work', () => {
    cy.visit('iframe.html?id=nativedialog--theming');
    cy.get('[data-test="--dialog-spacing"]')
      .clear()
      .type('3rem');

    cy.get('[data-test="--dialog-height"]')
      .clear()
      .type('200px');

    cy.get('[data-test="--dialog-bg-color"]')
      .clear()
      .type('rgb(255, 0, 0)');

    cy.get('[data-test="--dialog-width-max"]')
      .clear()
      .type('400px');

    cy.get('[data-test="open-modal-btn"]').click();
    cy.get('.dialog').then((el) => {
      const styles = el[0].ownerDocument.defaultView.getComputedStyle(el[0]);
      cy.log(styles['height']);
      expect(styles.getPropertyValue('padding')).to.equal( '48px');
      expect(styles.getPropertyValue('height')).to.equal( '200px');
      expect(styles.getPropertyValue('background-color')).to.equal( 'rgb(255, 0, 0)');
      expect(styles.getPropertyValue('width')).to.equal( '400px');
    })
  });
});
