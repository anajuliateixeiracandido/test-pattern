import { CheckoutService } from '../src/services/CheckoutService.js';
import CarrinhoBuilder from './builders/CarrinhoBuilder.js';
import UserMother from './builders/UserMother.js';
import { Item } from '../src/domain/Item.js';

describe('CheckoutService', () => {
  
  describe('quando o pagamento falha', () => {
    it('deve retornar null quando o gateway de pagamento falha', async () => {
      const carrinho = new CarrinhoBuilder().build();
      
      const gatewayStub = { 
        cobrar: jest.fn().mockResolvedValue({ success: false }) 
      };
      
      const repositoryDummy = {};
      const emailServiceDummy = {};
      
      const checkoutService = new CheckoutService(gatewayStub, repositoryDummy, emailServiceDummy);
      const cartao = { numero: '1234567890123456', cvv: '123' };

      const resultado = await checkoutService.processarPedido(carrinho, cartao);

      expect(resultado).toBeNull();
    });
  });

  describe('quando um cliente Premium finaliza a compra', () => {
    it('deve aplicar desconto e enviar email de confirmação', async () => {
      const usuario = UserMother.umUsuarioPremium();
      const item1 = new Item('Produto A', 100);
      const item2 = new Item('Produto B', 100);
      const carrinho = new CarrinhoBuilder()
        .comUser(usuario)
        .comItens([item1, item2])
        .build();

      const gateway = { 
        cobrar: jest.fn().mockResolvedValue({ success: true }) 
      };
      
      const pedido = { id: 123, total: 180 };
      const repository = {
        salvar: jest.fn().mockResolvedValue(pedido)
      };
      
      const email = {
        enviarEmail: jest.fn()
      };
      
      const service = new CheckoutService(gateway, repository, email);
      const cartao = { numero: '1234567890123456', cvv: '123' };

      await service.processarPedido(carrinho, cartao);

      expect(gateway.cobrar).toHaveBeenCalledWith(180, cartao);
      expect(email.enviarEmail).toHaveBeenCalledTimes(1);
      expect(email.enviarEmail).toHaveBeenCalledWith(
        'maria.santos@email.com',
        'Seu Pedido foi Aprovado!',
        'Pedido 123 no valor de R$180'
      );
    });
  });
});