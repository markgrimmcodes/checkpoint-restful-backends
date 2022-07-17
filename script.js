const contactPreview = document.querySelector(".contact__preview");
const pendingText = document.querySelector(".number__of__pending");
let numOfPending = 0;

if (numOfPending < 1) {
  pendingText.innerText = "No pending invitations";
} else if (numOfPending === 1) {
  pendingText.innerText = "1 pending invitation";
} else {
  pendingText.innerText = numOfPending + " pending invitations";
}

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
    bgPic.style.backgroundImage = "url(" + contact.backgroundImage + ")";

    if (contact.backgroundImage === "") {
      bgPic.style.backgroundImage =
        "url(https://source.unsplash.com/random/300×300)";
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
    connectBtn.addEventListener("click", () => {
      if (connectBtn.innerText === "Connect") {
        connectBtn.innerText = "Pending";
        connectBtn.style.color = "rgb(156, 155, 155)";
        numOfPending += 1;
      } else {
        connectBtn.innerText = "Connect";
        connectBtn.style.color = "rgb(12, 112, 170)";
        if (numOfPending === 0) {
          numOfPending = 0;
        } else {
          numOfPending -= 1;
        }
        if (numOfPending < 1) {
          pendingText.innerText = "No pending invitations";
        } else if (numOfPending === 1) {
          pendingText.innerText = "1 pending invitation";
        } else {
          pendingText.innerText = numOfPending + " pending invitations";
        }
      }

      if (numOfPending < 1) {
        pendingText.innerText = "No pending invitations";
      } else if (numOfPending === 1) {
        pendingText.innerText = "1 pending invitation";
      } else {
        pendingText.innerText = numOfPending + " pending invitations";
      }
      console.log(numOfPending);
    });

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
