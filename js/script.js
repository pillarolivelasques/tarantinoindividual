/*
   MENU
 */
function openMenu() {
  document.getElementById('menu').classList.add('open');
}

function closeMenu() {
  document.getElementById('menu').classList.remove('open');
}

document.addEventListener('click', function(e) {
  var menu = document.getElementById('menu');
  var hamburger = document.querySelector('.hamburguesa');
  if (!menu) return;
  if (menu.classList.contains('open') &&
      !menu.contains(e.target) &&
      e.target !== hamburger) {
    closeMenu();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeMenu();
  }
});


/*
   TICKET SYSTEM
 */
var selectedType  = null;
var selectedPrice = null;

function selectTicket(type, price, clickedCard) {
  selectedType  = type;
  selectedPrice = price;

  var cards = document.querySelectorAll('.card');
  cards.forEach(function(card) {
    card.classList.remove('selected');
  });

  clickedCard.classList.add('selected'); // ✅ marca o clicado
  // ...resto igual
}
  var selectedText = document.getElementById('selectedText');
  if (selectedText) {
    selectedText.innerText = 'Selected: ' + type + ' (€' + price + ' each)';
  }
  updateTotal();
}

function updateTotal() {
  var countInput = document.getElementById('ticketCount');
  var totalEl    = document.getElementById('totalPrice');
  if (!countInput || !totalEl) return;

  var count = parseInt(countInput.value) || 0;
  if (!selectedPrice) {
    totalEl.innerText = 'Total: €0';
    return;
  }
  totalEl.innerText = 'Total: €' + (count * selectedPrice);
}

var ticketInput = document.getElementById('ticketCount');
if (ticketInput) {
  ticketInput.addEventListener('input', updateTotal);
}

function buyTicket() {
  var valid = true;
  var first = document.getElementById('firstName');
  var last  = document.getElementById('lastName');
  var email = document.getElementById('email');
  var count = document.getElementById('ticketCount');

  document.querySelectorAll('.error').forEach(function(e) {
    e.innerText = '';
  });
  document.getElementById('message').innerText = '';

  if (!first.value.trim()) {
    document.getElementById('firstErr').innerText = 'First name required';
    valid = false;
  }
  if (!last.value.trim()) {
    document.getElementById('lastErr').innerText = 'Last name required';
    valid = false;
  }
  if (!email.value.includes('@')) {
    document.getElementById('emailErr').innerText = 'Invalid email';
    valid = false;
  }

  var qty = parseInt(count.value);
  if (!qty || qty < 1 || qty > 15) {
    document.getElementById('countErr').innerText = 'Enter 1–15 tickets';
    valid = false;
  }
  if (!selectedType) {
    document.getElementById('message').innerText = 'Please select a ticket type.';
    valid = false;
  }

  if (!valid) return;

  var total = qty * selectedPrice;
  document.getElementById('message').innerText =
    'Success! ' + qty + ' ' + selectedType + ' ticket(s) reserved. Total: €' + total;
}


/* 
   SHOP
 */
var cartCount = 0;
var cartTotal = 0;

function addToCart(btn, name, price) {
  cartCount = cartCount + 1;
  cartTotal = cartTotal + parseFloat(price);

  btn.textContent = 'Added ✓';
  btn.classList.add('added');
  setTimeout(function() {
    btn.textContent = 'Add to Cart';
    btn.classList.remove('added');
  }, 1500);

  var countEl = document.getElementById('cartCount');
  var totalEl = document.getElementById('cartTotal');
  var barEl   = document.getElementById('cartBar');
  var confEl  = document.getElementById('shopConfirm');

  if (countEl) countEl.textContent = cartCount;
  if (totalEl) totalEl.textContent = '€' + cartTotal.toFixed(2);
  if (barEl)   barEl.classList.add('visible');
  if (confEl) {
    confEl.textContent = '"' + name + '" added to your cart.';
    setTimeout(function() {
      confEl.textContent = '';
    }, 2500);
  }
}

function filterProducts(category, btn) {
  document.querySelectorAll('.filter-btn').forEach(function(b) {
    b.classList.remove('active');
  });
  btn.classList.add('active');

  document.querySelectorAll('.product-card').forEach(function(card) {
    if (category === 'all' || card.dataset.category === category) {
      card.classList.remove('hidden');
    } else {
      card.classList.add('hidden');
    }
  });
}

function checkout() {
  if (!cartCount) return;
  var bar = document.getElementById('cartBar');
  if (!bar) return;
  bar.innerHTML = '<p style="color:#c9a84c;text-align:center;width:100%;">Order placed. Expect the unexpected. — Q.T.</p>';
  cartCount = 0;
  cartTotal = 0;
  setTimeout(function() {
    bar.classList.remove('visible');
  }, 3000);
}


/* 
   LOADER
 */
window.addEventListener('load', function() {
  var loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(function() {
    loader.style.opacity = '0';
    setTimeout(function() {
      loader.remove();
    }, 1000);
  }, 1500);
});