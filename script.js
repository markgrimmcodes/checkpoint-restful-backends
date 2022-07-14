const contactPreview = document.querySelector(".contact__preview");

function loadContacts() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=8")
    .then((response) => response.json())
    .then((contacts) => {
      for (let contact of contacts) {
        const card = document.createElement("div");
        card.classList.add("contact__card");

        const bgPic = document.createElement("div");
        bgPic.classList.add("bg__pic");
        bgPic.style.backgroundImage = "url(" + contact.backgroundImage + ")";

        const profilePic = document.createElement("img");
        profilePic.classList.add("contact__pic");
        profilePic.setAttribute("src", contact.picture);

        const nameWrap = document.createElement("div");
        nameWrap.classList.add("namewrap");

        const name = document.createElement("h2");
        name.classList.add("contact__name");
        name.innerText =
          contact.name.title +
          " " +
          contact.name.first +
          " " +
          contact.name.last;

        const position = document.createElement("p");
        position.classList.add("contact__position");
        position.innerText = contact.title;

        const mutualContacts = document.createElement("p");
        mutualContacts.classList.add("mutual__contacts");
        mutualContacts.innerText =
          contact.mutualConnections + " mutual connections";

        const connectBtn = document.createElement("button");
        connectBtn.classList.add("connect");
        connectBtn.innerText = "Connect";

        const closeButton = document.createElement("button");
        closeButton.classList.add("close");
        closeButton.innerText = "X";

        nameWrap.append(name, position, mutualContacts, connectBtn);

        card.append(bgPic, closeButton, profilePic, nameWrap);
        contactPreview.appendChild(card);
      }
    });
}

loadContacts();
