// https://docs.cypress.io/api/introduction/api.html

describe("site access", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/ ");
  });

  describe("site has content", () => {
    it("Visits the app root url", () => {
      cy.contains("h1", "Shop-It");
    });
  });
});
