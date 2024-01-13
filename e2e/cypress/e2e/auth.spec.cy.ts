describe("Auth", () => {
  it("should redirect unauthorized user from root to signin", () => {
    cy.visit("/")
    cy.url().should("include", "/signin")
  })
})
