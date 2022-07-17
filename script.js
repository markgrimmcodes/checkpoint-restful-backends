const contactPreview = document.querySelector(".contact__preview");

let contacts = [];

function loadContacts() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((response) => response.json())
    .then((contactsData) => {
      contacts.push(...contactsData);
      console.log(contacts);
      renderContacts();
    });
}
loadContacts();

function renderContacts() {
  for (let contact of contacts) {
    const card = document.createElement("div");
    card.classList.add("contact__card");

    const bgPic = document.createElement("div");
    bgPic.classList.add("bg__pic");
    if (contact.backgroundImage === "") {
      bgPic.style.backgroundImage =
        "url(https://source.unsplash.com/random/300×300)";
    } else {
      bgPic.style.backgroundImage = "url(" + contact.backgroundImage + ")";
    }

    const profilePic = document.createElement("img");
    profilePic.classList.add("contact__pic");
    profilePic.setAttribute("src", contact.picture);

    const nameWrap = document.createElement("div");
    nameWrap.classList.add("namewrap");

    const name = document.createElement("h2");
    name.classList.add("contact__name");
    name.innerText =
      contact.name.title + " " + contact.name.first + " " + contact.name.last;

    const position = document.createElement("p");
    position.classList.add("contact__position");
    position.innerText = contact.title;

    const mutualContacts = document.createElement("p");
    mutualContacts.classList.add("mutual__contacts");

    mutualContacts.innerText =
      "⊶ " + contact.mutualConnections + " mutual connection/s";

    const connectBtn = document.createElement("button");
    connectBtn.classList.add("connect");
    connectBtn.innerText = "Connect";

    const closeButton = document.createElement("button");
    closeButton.classList.add("close");
    closeButton.innerText = "X";
    closeButton.addEventListener("click", (e) => closeContact(e));

    nameWrap.append(name, position, mutualContacts, connectBtn);

    card.append(bgPic, closeButton, profilePic, nameWrap);
    contactPreview.appendChild(card);
  }
}

function closeContact(e) {
  const removedContact = e.target.parentElement;
  removedContact.remove();
  loadSingleContact();
}

function loadSingleContact() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
    .then((response) => response.json())
    .then((contactsData) => {
      contacts = [];
      contacts.push(contactsData[0]);
      renderContacts();
    });
}
