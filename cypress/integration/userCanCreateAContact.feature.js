describe("user can create a contact", () => {
    it("test", () => {
        cy.visit("http://192.168.0.3:3001")
        cy.get("#add-contact").click()
    })
})