const searchInput = document.getElementById('productSearch');

const beanCheckbox = document.getElementById('bean');
const melonCheckbox = document.getElementById('melon');
const sunflowerCheckbox = document.getElementById('sunflower');

const items = document.querySelectorAll('.products-content-grid-item');

function filterProducts() {
  const isBeanChecked = beanCheckbox.checked;
  const isMelonChecked = melonCheckbox.checked;
  const isSunflowerChecked = sunflowerCheckbox.checked;

  const query = searchInput.value.toLowerCase().trim().replaceAll(' ', '');

  const anyCategoryChecked =
    isBeanChecked || isMelonChecked || isSunflowerChecked;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    const title = item
        .querySelector('.products-content-grid-item-text h2')
        .textContent
        .toLowerCase()
        .replaceAll(' ', '');

    const matchesText = title.includes(query);

    const isBeanItem =
      title.includes('grah') || title.includes('mahune');
    const isMelonItem =
      title.includes('lubenica') || title.includes('dinja');
    const isSunflowerItem = title.includes('suncokret');

    let matchesCategory = true;

    if (anyCategoryChecked) {
      matchesCategory =
        (isBeanChecked && isBeanItem) ||
        (isMelonChecked && isMelonItem) ||
        (isSunflowerChecked && isSunflowerItem);
    }

    if (matchesText && matchesCategory) {
      item.style.display = '';
    }
    else {
      item.style.display = 'none';
    }
  }
}

if (searchInput) {
    searchInput.addEventListener('input', filterProducts);
}

[beanCheckbox, melonCheckbox, sunflowerCheckbox].forEach(cb => {
    cb.addEventListener('change', filterProducts);
});