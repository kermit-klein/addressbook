const storage = window.localStorage
const renderContacts = () => {
    const contacts = JSON.parse(storage.getItem("contacts"))
    let div = document.querySelector("#tbodylist")
    if (contacts && contacts[0] != undefined) {
        div.innerHTML = ''
        contacts.forEach(contact => {
            let tr = document.createElement("tr")

            tr.innerHTML = `
		  <td>${contact.name}</td> 
		  <td>${contact.email}</td> 
		  <td>${contact.phone}</td> 
		  <td>${contact.company}</td> 
		  <td>${contact.twitter}</td> 
		  <td>${contact.notes}</td>
		  <button id="${contact.uID}" class="mini ui red button delbut">Delete</button>
		  <button id="${contact.uID}" class="mini ui yellow button editbut">Edit</button> 
		`
            div.appendChild(tr)
            document.querySelector("#thead").style.display = "";

            deletefunc() // Defined below
            editfunc() // Defined below

        })
    } else {
        document.querySelector("#thead").style.display = "none";
        div.innerHTML = '<p class="norecord">You have no contacts in your address book</p>'
    }

}

document.addEventListener('DOMContentLoaded', () => {
    renderContacts()
    const contactForm = document.getElementById('new-contact-form')
    const toggleFormVisibilityButton = document.getElementById('add-contact')
    contactForm.style.display = 'none'

    toggleFormVisibilityButton.addEventListener('click', () => {
        if (contactForm.style.display === '') {
            contactForm.style.display = 'none'
        } else {
            contactForm.style.display = ''
        }
    })

    contactForm.addEventListener('submit', event => {
        event.preventDefault()


        // 1. Read all the input fields and get their values
        const {
            name,
            email,
            phone,
            company,
            notes,
            twitter
        } = contactForm.elements
        const contact = {
            name:strip(name.value),
            email:strip(email.value),
            phone:strip(phone.value),
            company:strip(company.value),
            notes:strip(notes.value),
            twitter:strip(twitter.value),
            uID: Date.now()
        }

        let contacts = JSON.parse(storage.getItem('contacts')) || []
        contacts.push(contact)
        // 2. Save them to our storage
        storage.setItem('contacts', JSON.stringify(contacts))
        renderContacts()
        contactForm.reset()
    })
})


var editfunc = () => {
    document.querySelectorAll(".editbut").forEach(button => {
        button.addEventListener("click", function() {
            var contacts = JSON.parse(window.localStorage.getItem("contacts"))
            let editdiv = document.querySelector("#editform")

            for (let i = 0; i <= contacts.length - 1; i++) {
                if (this.id == contacts[i].uID) {
                    var contactedit = contacts[i]
					editdiv.innerHTML = `<form id="edit-contact-form"><div class="ui form"><div class="fields"><div class="field"><label for="name">Name</label><input id="editname" type="text" name="name" value="${contactedit.name}"></div><div class="field"><label for="email">E-mail</label><input id="editemail" type="email" name="email" value="${contactedit.email}"></div><div class="field"><label for="phone">Phone</label><input id="editphone" type="text" name="phone" value="${contactedit.phone}"></div><div class="field"><label for="company">Company</label><input id="editcompany" type="text" name="company" value="${contactedit.company}"></div><div class="field"><label for="twitter">Twitter</label><input id="edittwitter" type="text" name="twitter" value="${contactedit.twitter}"></div><div class="field"><label>Notes</label><input type="text" id="editnotes" name="notes" value="${contactedit.notes}"></div><button id="${contactedit.uID}" type="submit" value="Save contact" class="ui yellow button saveedit"><i class="icon user"></i>Save Edit</button></div></div></form>`
					document.querySelectorAll(".delbut").forEach(button=>{
						button.style.display="none"
					})
					document.querySelectorAll(".editbut").forEach(button=>{
						button.style.display="none"
					})
                      
                    var editcontactForm = document.getElementById('edit-contact-form')
                    editcontactForm.addEventListener("submit", event => {
                        event.preventDefault()

                        var {
                            name,
                            email,
                            phone,
                            company,
                            notes,
                            twitter
                        } = editcontactForm.elements

                        contacts[i].name = strip(name.value)
                        contacts[i].email = strip(email.value)
                        contacts[i].phone = strip(phone.value)
                        contacts[i].company = strip(company.value)
                        contacts[i].notes = strip(notes.value)
                        contacts[i].twitter = strip(twitter.value)

                        storage.setItem('contacts', JSON.stringify(contacts))
                        renderContacts()
                        editcontactForm.reset()
                        editcontactForm.style.display = 'none'
                    })
                }
            }
        })



    })
}
var deletefunc = () => {
    document.querySelectorAll(".delbut").forEach(button => {
        button.addEventListener("click", function() {
            var contacts = JSON.parse(window.localStorage.getItem("contacts"))
            for (let i = 0; i <= contacts.length - 1; i++) {
                if (this.id == contacts[i].uID) {
                    contacts.splice(i, 1)
                    storage.setItem('contacts', JSON.stringify(contacts))
                    renderContacts()
                }
            }
        })
    })

}
function strip(html){
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
 }