describe('Main page', () => {
  it('loads successfully', () => {
    cy.visit('/')
    cy.get('#broadcast-room-card').should('be.visible')
    cy.get('#p2p-room-card').should('be.visible')
    cy.get('#join-room-card').should('be.visible')
  })

  it('can navigate to join a room', () => {
    cy.visit('/')
    cy.get('a').contains("Join a room").click()
  })

  it('can navigate to a broadcast room', () => {
    cy.visit('/')
    cy.get('a').contains("Broadcast to large audience").click()
  })

  it('can navigate to a p2p room', () => {
    cy.visit('/')
    cy.get('a').contains("Perform for a small crowd").click()
  })
})