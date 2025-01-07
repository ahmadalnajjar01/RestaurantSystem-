// Array to store customer orders
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Constructor to create a Customer object
function Customer(
  fullName,
  password,
  dob,
  gender,
  phone,
  email, // Added email field
  orderType,
  orderOption,
  image
) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.phone = phone;
  this.email = email; // Added email field
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.image = image;
}

// Validate form fields
function validateForm(fullName, password, dob, phone, email) {
  const errors = [];

  // Username: no spaces allowed
  if (/\s/.test(fullName)) {
    errors.push("Username must not contain spaces.");
  }

  // Password: >8 chars, 1 number, 1 uppercase, 1 special char
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    errors.push(
      "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character."
    );
  }

  // Birthday: Format YYYY-MM-DD
  const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dobRegex.test(dob)) {
    errors.push("Birthday must be in YYYY-MM-DD format.");
  }

  // Phone: 10 digits, starts with 07
  const phoneRegex = /^07\d{8}$/;
  if (!phoneRegex.test(phone)) {
    errors.push("Phone number must be 10 digits and start with 07.");
  }

  // Email: Valid email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errors.push("Please provide a valid email address.");
  }

  return errors;
}

// Check if user exists
function userExists(fullName, email) {
  return orders.some(
    (order) => order.fullName === fullName || order.email === email // Check email here
  );
}

// Function to render orders in the UI
function renderOrders() {
  const ordersContainer = document.getElementById("ordersContainer");
  ordersContainer.innerHTML = ""; // Clear previous content

  orders.forEach((order) => {
    const card = document.createElement("div");
    card.className = "card d-flex flex-row align-items-center gap-3";
    card.innerHTML = `
      <img src="${
        order.image
      }" alt="Customer Image" style="max-width: 100px; border-radius: 50%;">
      <div>
        <h5>${order.fullName}</h5>
        <p><strong>Gender:</strong> ${order.gender}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>
        <p><strong>Order Type:</strong> ${order.orderType.join(", ")}</p>
        <p><strong>Order Option:</strong> ${order.orderOption}</p>
      </div>
    `;
    ordersContainer.appendChild(card);
  });
}

// Handle form submission
document
  .getElementById("orderForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form refresh

    // Collect form data
    const fullName = document.getElementById("fullName").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value; // Collect email
    const orderType = Array.from(
      document.querySelectorAll('input[name="orderType"]:checked')
    ).map((input) => input.value);
    const orderOption =
      document.querySelector('input[name="orderOption"]:checked')?.value || "";
    const image = document.getElementById("image").value;

    // Validate form inputs
    const errors = validateForm(fullName, password, dob, phone, email);

    // Check if user already exists
    if (userExists(fullName, email)) {
      errors.push(
        "User already exists. Please use a different username or email."
      );
    }

    // If there are errors, show alerts
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // Create new customer object
    const newCustomer = new Customer(
      fullName,
      password,
      dob,
      gender,
      phone,
      email, // Add email to Customer
      orderType,
      orderOption,
      image
    );
    orders.push(newCustomer);

    // Save to localStorage
    localStorage.setItem("orders", JSON.stringify(orders));

    // Render orders and reset the form
    renderOrders();
    event.target.reset();
  });

// Initial rendering of orders on page load
renderOrders();
