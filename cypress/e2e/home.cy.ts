describe('Homepage E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should load the homepage successfully', () => {
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should display the Next.js logo', () => {
    cy.get('img').should('exist')
  })

  it('should contain getting started text', () => {
    cy.contains(/Get started|Next\.js/i).should('be.visible')
  })

  it('should have working links', () => {
    cy.get('a').should('have.length.greaterThan', 0)
  })

  it('should have proper page title', () => {
    cy.title().should('include', 'Create Next App')
  })

  it('should display header content', () => {
    cy.get('main, article, header').should('have.length.greaterThan', 0)
  })
})
