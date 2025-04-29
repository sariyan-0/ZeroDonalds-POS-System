const buttons = document.querySelectorAll('.item');
const cart = document.getElementById('cart');
const totalDisplay = document.getElementById('total');
const checkoutButton = document.getElementById('checkout');

let total = 0;

// Add item with pop animation
function animateAddItem(li) {
  li.style.transform = 'scale(0)';
  li.style.opacity = '0';
  setTimeout(() => {
    li.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    li.style.transform = 'scale(1)';
    li.style.opacity = '1';
  }, 10);
}

// Explode item like iMessage
function explodeItem(li) {
  const rect = li.getBoundingClientRect();
  const fragments = 18;
  const body = document.body;

  for (let i = 0; i < fragments; i++) {
    const piece = document.createElement('div');
    piece.className = 'piece';

    // Position at center of the item
    piece.style.left = `${rect.left + rect.width / 2}px`;
    piece.style.top = `${rect.top + rect.height / 2}px`;

    // Random direction
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80 + 40;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    // Animate it
    piece.animate(
      [
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${x}px, ${y}px) scale(0)`, opacity: 0 }
      ],
      {
        duration: 600,
        easing: 'ease-out',
        fill: 'forwards'
      }
    );

    body.appendChild(piece);

    // Remove piece after animation
    setTimeout(() => piece.remove(), 700);
  }

  // Remove the original item
  li.remove();
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    const li = document.createElement('li');
    li.textContent = `${name} - $${price.toFixed(2)}`;
    cart.insertBefore(li, cart.firstChild); // <-- CORRECTED

    animateAddItem(li);

    total += price;
    totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
  });
});

checkoutButton.addEventListener('click', () => {
  if (total > 0) {
    const items = Array.from(cart.querySelectorAll('li')).reverse(); // poof bottom to top

    let delay = 0;

    items.forEach((li) => {
      setTimeout(() => {
        explodeItem(li);
      }, delay);
      delay += 120;
    });

    setTimeout(() => {
      total = 0;
      totalDisplay.textContent = `Total: $0`;
      alert(`Thanks for your purchase!`);
    }, delay + 700);
  } else {
    alert('Your cart is empty!');
  }
});
