import { User } from '../../src/domain/User.js';

class UserMother {
  static umUsuarioPadrao() {
    return new User(
      1,
      'João Silva',
      'joao.silva@email.com',
      'PADRAO'
    );
  }

  static umUsuarioPremium() {
    return new User(
      2,
      'Maria Santos',
      'maria.santos@email.com',
      'PREMIUM'
    );
  }

  static umUsuarioComTipo(tipo) {
    return new User(
      100,
      'Usuário Genérico',
      'usuario.generico@email.com',
      tipo
    );
  }

  static umUsuarioComParametros(id, nome, email, tipo = 'PADRAO') {
    return new User(id, nome, email, tipo);
  }
}

export default UserMother;