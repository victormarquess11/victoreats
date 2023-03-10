let selectedPrato = null;
let selectedBebida = null;
let selectedSobremesa = null;
let pricePrato = 0;
let priceBebida = 0;
let priceSobremesa = 0;
let totalPrice = 0;

function selectItem(item, section) {
  toggleAlreadySelected(item, section);

  if (item !== null) {
    item.classList.toggle('selecionado');
  }
  toggleCheckmark(item);

  title = checkTitle(item);
  price = checkPrice(item);

  registerSelectedSection(title, section, price);
  computePrice();
  checkAllSelected();
  changeWppLink();

}

function toggleCheckmark(item) {
  const elemento = item.querySelector(".selected-checkmark");
  elemento.classList.toggle("esconder");
}

function toggleAlreadySelected(item, section) {
  const parentItem = item.parentElement;
  if (parentItem !== null) {
    if (parentItem.classList.contains('items-' + section)) {
      const itemSelecionado = parentItem.querySelector('.selecionado');
      if (itemSelecionado !== null) {
        itemSelecionado.classList.toggle('selecionado');
        toggleCheckmark(itemSelecionado);
      }
    }
  }
}

function checkAllSelected() {
  if (!!selectedPrato && !!selectedBebida && !!selectedSobremesa) {
    const botaoFecharPedido = document.querySelector(".btn-fechar-pedido");
    botaoFecharPedido.disabled = false;
    botaoFecharPedido.innerText = "Fechar pedido";

    botaoFecharPedido.classList.add("tudo-selecionado");
  }
}

function registerSelectedSection(title, section, price) {
  if (section === 'prato') {
    selectedPrato = title;
    pricePrato = parseFloat(price.replace(',', '.').replace("R$ ", ""));
  }
  if (section === 'bebida') {
    selectedBebida = title;
    priceBebida = parseFloat(price.replace(',', '.').replace("R$ ", ""));
  }
  if (section === 'sobremesa') {
    selectedSobremesa = title;
    priceSobremesa = parseFloat(price.replace(',', '.').replace("R$ ", ""));
  }
}

function createWppLink() {
  const phoneNumber = "5521999999999"
  const elementLink = document.querySelector('.wpp-link');
  let orderMessage = `Olá, gostaria de fazer o pedido:
  - Prato: ${selectedPrato} - R$ ${pricePrato.toFixed(2)}
  - Bebida: ${selectedBebida} - R$ ${priceBebida.toFixed(2)}
  - Sobremesa: ${selectedSobremesa} - R$ ${priceSobremesa.toFixed(2)}
  Total: R$ ${totalPrice}`

  orderMessage = encodeURIComponent(orderMessage);
  return `https://wa.me/${phoneNumber}?text=${orderMessage}`;
}

function computePrice() {
  totalPrice = (pricePrato + priceBebida + priceSobremesa).toFixed(2);
}

function checkTitle(item) {
  const elementTitle = item.querySelector('.titulo');
  if (elementTitle !== null) {
    return elementTitle.innerText;
  }
  return null;
}

function checkPrice(item) {
  const elementPrice = item.querySelector('.preco');
  if (elementPrice !== null) {
    return elementPrice.innerText;
  }
  return null;
}

function reviewOrder() {
  document.querySelector(".confirmacao").classList.remove("esconder");

  document.querySelector(".pratoEscolhido").innerHTML = selectedPrato;
  document.querySelector(".pratoEscolhidoPreco").innerHTML = `R$ ${pricePrato.toFixed(2)}`;
  document.querySelector(".bebidaEscolhida").innerHTML = selectedBebida;
  document.querySelector(".bebidaEscolhidaPreco").innerHTML = `R$ ${priceBebida.toFixed(2)}`;
  document.querySelector(".sobremesaEscolhida").innerHTML = selectedSobremesa;
  document.querySelector(".sobremesaEscolhidaPreco").innerHTML = `R$ ${priceSobremesa.toFixed(2)}`

  document.querySelector(".totalPreco").innerHTML = `R$ ${totalPrice}`
}

function redoOrder() {
  document.querySelector(".confirmacao").classList.add("esconder");
}

function finishOrder() {
  window.open(createWppLink(), '_blank').focus();
}