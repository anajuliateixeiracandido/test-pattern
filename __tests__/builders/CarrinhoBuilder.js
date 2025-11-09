import { Carrinho } from '../../src/domain/Carrinho.js';
import { Item } from '../../src/domain/Item.js';
import UserMother from './UserMother.js';

class CarrinhoBuilder {
  constructor() {
    this._user = UserMother.umUsuarioPadrao();
    this._itens = [new Item('Produto Padrão', 20.0)];
  }

  comUser(user) {
    this._user = user;
    return this;
  }

  comItens(itens) {
    this._itens = itens;
    return this;
  }

  adicionarItem(item) {
    this._itens.push(item);
    return this;
  }

  vazio() {
    this._itens = [];
    return this;
  }

  comQuantidade(nomeProduto, preco, quantidade) {
    this._itens = [];
    for (let i = 0; i < quantidade; i++) {
      this._itens.push(new Item(nomeProduto, preco));
    }
    return this;
  }

  build() {
    return new Carrinho(this._user, this._itens);
  }
}

export default CarrinhoBuilder;