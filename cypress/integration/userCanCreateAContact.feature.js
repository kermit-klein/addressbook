describe("user can create a contact", () => {
    it("test", () => {
        cy.visit("http://192.168.0.3:3001")
        cy.get("#add-contact").click()
        cy.get("#name").type("Ali")
		cy.get("#email").type("test@test.com")
		cy.get("#phone").type("0707666999")
		cy.get("#company").type("Craft Academy")
		cy.get("#notes").type("Beginner coder")
        cy.get("#twitter").type("@notwitter")
        cy.get('#submit').click()
    })
    it("displays a name of the new contact", () => {
		cy.get('#contact-list').should("contain", "Ali")
    })
    it("displays the phone number of the new contact", () => {
		cy.get("#contact-list").should("contain", "707666999")
	})





})