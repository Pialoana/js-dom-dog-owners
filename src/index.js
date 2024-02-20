//console.log(data);

function createDogListItem(dog) {
  const li = document.createElement("li");
  const dogContainer = document.querySelector(".main");

  li.className = "dogs-list__button";
  li.innerText = dog.name;

  li.addEventListener("click", () => {
    const newDogCard = createDogCard(dog);
    const existingDogCard = document.querySelector(".main__dog-section");
    if (existingDogCard) {
      existingDogCard.remove();
    }

    // Append the new dog card to the dogContainer
    dogContainer.innerHTML = ""; // Clear existing content
    dogContainer.appendChild(newDogCard);
  });

  return li;
}

function createSection() {
  const section = document.createElement("section");
  section.className = "main__dog-section";
  return section;
}

const createDogCardDesc = (dog) => {
  // Add 'dog' as a parameter
  const div = document.createElement("div");
  div.className = "main__dog-section__desc";

  const header = document.createElement("h3");
  header.innerText = "Bio";
  const text = document.createElement("p");
  text.textContent = dog.bio;
  div.append(header, text);

  return div;
};

function createDogCardBottomSection(dog) {
  const button = document.createElement("button");
  const text = document.createElement("p");
  const div = document.createElement("div");

  div.className = "main__dog-section__btn";

  button.textContent = dog.isGoodDog ? "Bad Dog" : "Good Dog";

  button.addEventListener("click", () => {
    // Toggle the isGoodDog property
    dog.isGoodDog = !dog.isGoodDog;
    // Update button text based on the new value
    button.textContent = dog.isGoodDog ? "Bad Dog" : "Good Dog";
  });

  div.append(text, button);
  return div;
}

const createDogCard = (dog) => {
  const section = createSection();
  const header = document.createElement("h2");
  header.innerText = dog.name;

  const image = document.createElement("img");
  image.classList.add("card--img");
  image.width = 256;
  image.src = dog.image;

  const desc = createDogCardDesc(dog); // Pass 'dog' here
  const bottomSection = createDogCardBottomSection(dog);

  section.append(header, image, desc, bottomSection); // Include 'image' here

  return section;
};

function createAddDogForm() {
  const form = document.createElement("form");
  form.className = "form";

  // Create input fields and labels for the form
  const nameInput = createInput("name");
  const imgInput = createInput("image", "url");
  const bioInput = createInput("bio", "textarea");
  const submitInput = createInput("submit", "submit", "Add Dog");

  const nameLabel = createLabel("name", "Dog's name");
  const imgLabel = createLabel("image", "Dog's picture");
  const bioLabel = createLabel("bio", "Dog's bio");

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Capture the data from the form inputs
    const dogData = {
      name: nameInput.value,
      image: imgInput.value,
      bio: bioInput.value,
    };

    // Add the new dog to the list of dogs at the top of the page
    const newDogCard = createDogCard(dogData);
    const plusButton = document.querySelector(".dogs-list__button--add");
    plusButton.parentNode.insertBefore(newDogCard, plusButton.nextSibling);

    // Clear the form inputs after submission
    nameInput.value = "";
    imgInput.value = "";
    bioInput.value = "";
  });

  // Append input fields and labels to the form
  form.append(
    nameLabel,
    nameInput,
    imgLabel,
    imgInput,
    bioLabel,
    bioInput,
    submitInput
  );

  return form;
}

function createInput(idName, type = "text", value) {
  let input = null;

  if (type === "textarea") {
    input = document.createElement("textarea");
    input.setAttribute("rows", "5");
  } else {
    input = document.createElement("input");
    input.setAttribute("type", type);
  }

  input.setAttribute("id", idName);
  input.setAttribute("name", idName);

  if (value) input.setAttribute("value", value);

  return input;
}

function createLabel(forAttr, text) {
  const label = document.createElement("label");
  label.attributes.for = forAttr;
  label.innerText = text;

  return label;
}

function renderMainForm() {
  const section = createSection();
  const form = createForm();
  const h2 = document.createElement("h2");

  h2.innerText = "Add a new Dog";

  section.append(h2, form);

  return section;
}

function renderDogList(dogsArr) {
  //console.log(dogsArr);
  const listContainer = document.querySelector(".dogs-list");
  for (const dog of dogsArr) {
    const item = createDogListItem(dog);
    listContainer.append(item);
  }
}

//renderDogList(data);

//const formButton = document.querySelector(".dogs-list__button--add");
const dogContainer = document.querySelector(".main");

// Add event listener to form button
const formButton = document.querySelector(".dogs-list__button--add");
formButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent default button behavior

  // Remove any existing children from the main container
  const mainContainer = document.querySelector(".main");
  mainContainer.innerHTML = "";

  // Create and render the add dog form
  const addDogForm = createAddDogForm();
  mainContainer.appendChild(addDogForm);
});
// Initially render the dog list
renderDogList(data);
