document.addEventListener('DOMContentLoaded', () => {
  const productData = {
    s: {
      name: 'Kodekama árbol ginseng - Pequeño',
      price: 'Precio: 10,24€',
      desc: 'Planta ideal para dar un ambiente zen a despachos, escritorios y estanterías. Necesita luz natural para que sus hojas estén siempre perfectas.',
      formatHTML: 'Pequeño',
      details: `
        <ul>
          <li>Tamaño: pequeño</li>
          <li>Altura: aproximadamente 20 centímetros</li>
          <li>Base: aproximadamente 16 centímetros de diámetro</li>
          <li>Maceta: base de pizarra negra</li>
        </ul>
      `,
    },
    m: {
      name: 'Kodekama árbol ginseng - Mediano',
      price: 'Precio: 15,50€',
      desc: 'Muy resistente, ideal para recibidores o habitaciones pequeñas. Necesita luz natural indirecta para crecer fuerte y verde.',
      formatHTML: 'Mediano',
      details: `
        <ul>
          <li>Tamaño: mediano</li>
          <li>Altura: aproximadamente 35 centímetros</li>
          <li>Base: aproximadamente 22 centímetros de diámetro</li>
          <li>Maceta: base de cerámica blanca</li>
        </ul>
      `,
    },
    l: {
      name: 'Kodekama árbol ginseng - Grande',
      price: 'Precio: 22,80€',
      desc: 'Una pieza protagonista con gran capacidad para purificar el aire. Perfecta para oficinas y salones. Necesita luz indirecta.',
      formatHTML: 'Grande',
      details: `
        <ul>
          <li>Tamaño: grande</li>
          <li>Altura: aproximadamente 50 centímetros</li>
          <li>Base: aproximadamente 30 centímetros de diámetro</li>
          <li>Maceta: base de piedra volcánica</li>
        </ul>
      `,
    },
  }

  const productName = document.querySelector('main h1')
  const productPrice = document.querySelector('.product__info span')
  const productDesc = document.querySelector('.product__desc')
  const detailsContainer = document.querySelector('.product__info details')
  const addButton = document.querySelector('.product__add-btn')
  const srAlert = document.getElementById('sr-alert')
  const othersList = document.querySelector('.product__variants ul')

  function createOption(format) {
    const data = productData[format]
    const li = document.createElement('li')
    const button = document.createElement('button')
    button.className = 'product__variant-option'
    button.setAttribute('type', 'button')

    const onlyNumber = data.price.replace('Precio: ', '').replace('€', ' euros')
    button.setAttribute('aria-label', `${data.formatHTML}, ${onlyNumber}`)

    button.innerHTML = `
    <div class="product__variant-format">
      <span>${data.formatHTML}</span>
    </div>
    <div class="product__variant-price">
      ${data.price.replace('Precio: ', '')}
    </div>
  `
    button.addEventListener('click', () => updateProduct(format))
    li.appendChild(button)
    return li
  }

  function updateProduct(format, shouldFocus = true) {
    const data = productData[format]
    if (!data) return

    productName.textContent = data.name
    productPrice.textContent = data.price
    productDesc.textContent = data.desc
    detailsContainer.innerHTML = `
      <summary>Características del producto</summary>
      ${data.details}
    `

    addButton.textContent = `Añadir ${data.name} (${data.price})`
    addButton.setAttribute('aria-label', `Añadir al carrito: ${data.name} por ${data.price.replace('€', ' euros')}`)

    othersList.innerHTML = ''
    Object.keys(productData).forEach(key => {
      if (key !== format) {
        othersList.appendChild(createOption(key))
      }
    })

    srAlert.textContent = `Nuevo producto seleccionado: ${data.name}`

    if (shouldFocus) {
      productName.focus()
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  updateProduct('s', false)
})
