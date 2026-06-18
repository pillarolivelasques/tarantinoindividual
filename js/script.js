/* =========================================================
   MENU
========================================================= */
function openMenu() {
  document.getElementById('menu').classList.add('open');
}

function closeMenu() {
  document.getElementById('menu').classList.remove('open');
}

document.addEventListener('click', function(e) {
  const menu = document.getElementById('menu');
  const hamburger = document.querySelector('.hamburguesa');
  if (!menu) return;
  if (menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      e.target !== hamburger) {
    closeMenu();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeMenu();
});


/* =========================================================
   CONTACT FORM
========================================================= */
const input = document.getElementById("messageInput");
const button = document.getElementById("sendBtn");

if (input && button) {
  input.addEventListener("input", () => {
    button.textContent = input.value.trim() !== "" ? "Send it 🚀" : "Send Message";
  });
}


/* =========================================================
   BIOGRAPHY
========================================================= */
const leftPanel = document.getElementById("aboutLeft");

if (leftPanel) {
  const dots = document.querySelectorAll(".dot");
  const images = document.querySelectorAll(".about-right img");

  function activate(i) {
    dots.forEach(d => d.classList.remove("active"));
    images.forEach(img => img.classList.remove("active"));
    if (dots[i]) dots[i].classList.add("active");
    if (images[i]) images[i].classList.add("active");
  }

  leftPanel.addEventListener("scroll", () => {
    const index = Math.round(leftPanel.scrollTop / leftPanel.clientHeight);
    activate(index);
  });

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const i = dot.dataset.index;
      leftPanel.scrollTo({ top: i * leftPanel.clientHeight, behavior: "smooth" });
    });
  });
}


/* =========================================================
   TICKET SYSTEM
========================================================= */
let selected = null;
let selectedCard = null;

function selectTicket(type, price, element) {
  selected = { type, price };
  if (selectedCard) selectedCard.classList.remove("selected");
  selectedCard = element;
  selectedCard.classList.add("selected");
  document.getElementById("selectedText").innerText = `Selected: ${type} (€${price} each)`;
  updateTotal();
}

function updateTotal() {
  const count = parseInt(document.getElementById("ticketCount").value) || 0;
  if (!selected) { document.getElementById("totalPrice").innerText = "Total: €0"; return; }
  document.getElementById("totalPrice").innerText = `Total: €${count * selected.price}`;
}

const ticketInput = document.getElementById("ticketCount");
if (ticketInput) ticketInput.addEventListener("input", updateTotal);

function buyTicket() {
  let valid = true;
  const first = document.getElementById("firstName");
  const last  = document.getElementById("lastName");
  const email = document.getElementById("email");
  const count = document.getElementById("ticketCount");

  document.querySelectorAll(".error").forEach(e => e.innerText = "");
  document.getElementById("message").innerText = "";

  if (!first.value.trim()) { document.getElementById("firstErr").innerText = "First name required"; valid = false; }
  if (!last.value.trim())  { document.getElementById("lastErr").innerText  = "Last name required";  valid = false; }
  if (!email.value.includes("@")) { document.getElementById("emailErr").innerText = "Invalid email"; valid = false; }

  const qty = parseInt(count.value);
  if (!qty || qty < 1 || qty > 15) { document.getElementById("countErr").innerText = "Enter 1–15 tickets"; valid = false; }
  if (!selected) { document.getElementById("message").innerText = "Please select a ticket type."; valid = false; }
  if (!selectedDate) { document.getElementById("dateErr").innerText = "Please select a date"; valid = false; }

  if (!valid) return;

  const total = qty * selected.price;
  document.getElementById("message").innerText =
    `Success! ${qty} ${selected.type} ticket(s) on ${selectedDate.getDate()} ${CAL_MONTHS[selectedDate.getMonth()]} ${selectedDate.getFullYear()}. Total: €${total}`;
}



/* =========================================================
   SHOP
========================================================= */
window.addEventListener('DOMContentLoaded', () => {
  window._cartCount = 0;
  window._cartTotal = 0;
});

function addToCart(btn, name, price) {
  window._cartCount = (window._cartCount || 0) + 1;
  window._cartTotal = (window._cartTotal || 0) + parseFloat(price);
  btn.textContent = 'Added ✓';
  btn.classList.add('added');
  setTimeout(() => { btn.textContent = 'Add to Cart'; btn.classList.remove('added'); }, 1500);

  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  const barEl   = document.getElementById('cartBar');
  const confEl  = document.getElementById('shopConfirm');

  if (countEl) countEl.textContent = window._cartCount;
  if (totalEl) totalEl.textContent = '€' + window._cartTotal.toFixed(2);
  if (barEl)   barEl.classList.add('visible');
  if (confEl)  { confEl.textContent = '"' + name + '" added to your cart.'; setTimeout(() => { confEl.textContent = ''; }, 2500); }
}

function filterProducts(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.product-card').forEach(card => {
    card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
  });
}

function checkout() {
  if (!window._cartCount) return;
  const bar = document.getElementById('cartBar');
  if (!bar) return;
  bar.innerHTML = '<p style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:1.1rem;color:#c9a84c;text-align:center;width:100%;">Order placed. Expect the unexpected. — Q.T.</p>';
  window._cartCount = 0;
  window._cartTotal = 0;
  setTimeout(() => { bar.classList.remove('visible'); }, 3000);
}







/* =========================================================
   LOADER — must be last
========================================================= */
window.addEventListener("load", function () {
  const loader = document.getElementById("loader");
  if (!loader) return;
  setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        loader.style.opacity = "0";
        setTimeout(() => loader.remove(), 1000);
      });
    });
  }, 1500);
});