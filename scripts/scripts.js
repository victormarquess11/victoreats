let pratoSelecionado = false;
let bebidaSelecionada = false;
let sobremesaSelecionada = false;

function selectItem(item, section) {
  toggleAlreadySelected(item, section);

  if (item !== null) {
    item.classList.toggle('selecionado');
  }

  toggleCheckmark(item);

  registerSelectedSection(section);
  checkAllSelected();

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
  if (!!pratoSelecionado && !!bebidaSelecionada && !!sobremesaSelecionada) {
    const botaoFecharPedido = document.querySelector(".btn-fechar-pedido");
    botaoFecharPedido.disabled = false;
    botaoFecharPedido.innerText = "Fechar pedido";

    botaoFecharPedido.classList.add("tudo-selecionado");
  }
}

function registerSelectedSection(section) {
  if (section === 'prato') {
    pratoSelecionado = true;
  }
  if (section === 'bebida') {
    bebidaSelecionada = true;
  }
  if (section === 'sobremesa') {
    sobremesaSelecionada = true;
  }
}
