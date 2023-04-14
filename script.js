// Initialize empty contacts array
let contacts = [];

// Add contact form
const addContactForm = document.querySelector('#addContactForm');
addContactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form values
  const name = addContactForm.querySelector('#name').value;
  const mobileNumber = addContactForm.querySelector('#mobileNumber').value;

  // Check if mobile number already exists
  const existingContact = contacts.find(contact => contact.mobileNumber === mobileNumber);
  if (existingContact) {
    alert('Mobile number already exists!');
    return;
  }

  // Create new contact object and add to contacts array
  const contact = {
    name: name,
    mobileNumber: mobileNumber
  };
  contacts.push(contact);

  // Reset form fields
  addContactForm.reset();

  // Refresh contact list
  displayContactList();
});

// Search by name input
const searchByNameInput = document.querySelector('#searchByName');
searchByNameInput.addEventListener('input', () => {
  displayContactList();
});

// Search by mobile number input
const searchByMobileNumberInput = document.querySelector('#searchByMobileNumber');
searchByMobileNumberInput.addEventListener('input', () => {
  displayContactList();
});

// Delete contact button
function deleteContact(mobileNumber) {
  const index = contacts.findIndex(contact => contact.mobileNumber === mobileNumber);
  if (index !== -1) {
    contacts.splice(index, 1);
    displayContactList();
  }
}

// Edit contact button
function editContact(mobileNumber) {
  const index = contacts.findIndex(contact => contact.mobileNumber === mobileNumber);
  if (index !== -1) {
    const name = prompt('Enter new name');
    if (name !== null) {
      contacts[index].name = name;
      displayContactList();
    }
  }
}

// Display contact list
function displayContactList() {
  const contactList = document.querySelector('#contactList');
  contactList.innerHTML = '';

  // Filter contacts by name or mobile number
  const searchByName = searchByNameInput.value.trim().toLowerCase();
  const searchByMobileNumber = searchByMobileNumberInput.value.trim().toLowerCase();
  const filteredContacts = contacts.filter(contact => {
    return (
      contact.name.toLowerCase().includes(searchByName) &&
      contact.mobileNumber.includes(searchByMobileNumber)
    );
  });

  // Sort contacts by name
  const sortedContacts = filteredContacts.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });

  // Add contacts to list
  sortedContacts.forEach(contact => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>${contact.name}</div>
      <div>${contact.mobileNumber}</div>
      <button onclick="editContact('${contact.mobileNumber}')">Edit</button>
      <button onclick="deleteContact('${contact.mobileNumber}')">Delete</button>
    `;
    contactList.appendChild(li);
  });
}

// Initialize contact list
displayContactList();
