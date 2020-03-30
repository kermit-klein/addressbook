const  storage = window.localStorage

const  renderContacts = () => {
  const  contacts = JSON.parse(storage.getItem("contacts"))
  
  let  div = document.querySelector("#tbodylist")
  if (contacts && contacts[0]!=undefined) {  // ASK FOR conditional
	div.innerHTML = ''
	const  ul = document.createElement("ul")

	contacts.forEach(contact  => {
		let tr = document.createElement("tr")

		tr.innerHTML = `
		  <td>${contact.name}</td> 
		  <td>${contact.email}</td> 
		  <td>${contact.phone}</td> 
		  <td>${contact.company}</td> 
		  <td>${contact.twitter}</td> 
		  <td>${contact.notes}</td>
		  <button id="${contact.uID}" class="mini ui red button" onClick="delete_record()">Delete</button> 
		`
		div.appendChild(tr)
		document.querySelector("#thead").style.display ="";
	  })
			
	  
	} else {
	  document.querySelector("#thead").style.display ="none";
	  div.innerHTML = '<p class="norecord">You have no contacts in your address book</p>'
	}
}

document.addEventListener('DOMContentLoaded', () => {
	renderContacts()
	const  contactForm = document.getElementById('new-contact-form')
	const  toggleFormVisibilityButton = document.getElementById('add-contact')
	contactForm.style.display = 'none'
	
	toggleFormVisibilityButton.addEventListener('click', () => {
		if (contactForm.style.display === '') {
			contactForm.style.display = 'none'
		} else {
			contactForm.style.display = ''
		}
	})


	contactForm.addEventListener('submit', event  => {
        event.preventDefault()
        
		// 1. Read all the input fields and get their values
		const { name, email, phone, company, notes, twitter } = contactForm.elements
		const  contact = {
			name:  name.value,
			email:  email.value,
			phone:  phone.value,
			company:  company.value,
			notes:  notes.value,
			twitter:  twitter.value,
			uID:Date.now()
		}

		console.log(contact)

		let  contacts = JSON.parse(storage.getItem('contacts')) || []

		contacts.push(contact)

		// 2. Save them to our storage
		storage.setItem('contacts', JSON.stringify(contacts))
		renderContacts()
		contactForm.reset()
   })
})

var delete_record = () => {       // ASK for DOM
	let contacts = JSON.parse(storage.getItem("contacts"))
	for (i=0;i<=contacts.length-1;i++) {
		if (event.srcElement.id==contacts[i].uID) {
			contacts.splice(i,1)
			storage.setItem('contacts', JSON.stringify(contacts))
		    renderContacts()
		}
	}

}