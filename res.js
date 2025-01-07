// Array to store customer orders
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Constructor to create a Customer object
function Customer(
  fullName,
  password,
  dob,
  gender,
  phone,
  orderType,
  orderOption,
  image
) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.phone = phone;
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.image = image;
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
    event.preventDefault(); // Prevent form from refreshing the page

    // Collect form data
    const fullName = document.getElementById("fullName").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    const phone = document.getElementById("phone").value;
    const orderType = Array.from(
      document.querySelectorAll('input[name="orderType"]:checked')
    ).map((input) => input.value);
    const orderOption = document.querySelector(
      'input[name="orderOption"]:checked'
    ).value;
    const image = document.getElementById("image").value;

    // Create a new customer
    const newCustomer = new Customer(
      fullName,
      password,
      dob,
      gender,
      phone,
      orderType,
      orderOption,
      image
    );
    orders.push(newCustomer);

    // Save to localStorage and render orders
    localStorage.setItem("orders", JSON.stringify(orders));
    renderOrders();

    // Clear the form
    event.target.reset();
  });

// Initial rendering of orders on page load
renderOrders();
