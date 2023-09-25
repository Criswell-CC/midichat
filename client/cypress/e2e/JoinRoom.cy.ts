describe('Join room page', () => {
    it('loads successfully', () => {
      cy.visit('/join')
      cy.get('input').should('be.visible')
      cy.get('input').type('test')
      cy.get('button').contains("Submit").click()
    })
})  