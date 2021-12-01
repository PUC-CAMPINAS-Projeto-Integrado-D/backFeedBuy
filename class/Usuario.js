class Usuario {
  constructor({
    ID = null, Email = null, Senha = null, Nome = null, Cargo = 'COMPRADOR',
  }) {
    this.ID = ID;
    this.Email = Email;
    this.Senha = Senha;
    this.Nome = Nome;
    this.Cargo = Cargo;

    return this;
  }

  save() {
    return {
      query: 'INSERT INTO Usuario (Email, Senha, Nome, Cargo) VALUES(?, ?, ?, ?)',
      dados: [this.Email, this.Senha, this.Nome, this.Cargo],
    };
  }

  update() {
    console.log('Save inside Database');
    const itensToUpdate = [
      {
        name: 'Email = ?',
        value: this.Email,
      },
      {
        name: 'Senha = ?',
        value: this.Senha,
      },
      {
        name: 'Nome = ?',
        value: this.Nome,
      },
      {
        name: 'Cargo = ?',
        value: this.Cargo,
      },
    ];
    const itensNotNull = itensToUpdate.filter((singleItem) => singleItem.value != null && singleItem.value != undefined);
    if (itensNotNull.length <= 0) {
      throw 'There is not itens to update';
    }
    return {
      query: `UPDATE Usuario SET ${itensNotNull.map((singleItem) => singleItem.name).join(', ')} WHERE ID = ?`,
      dados: [...itensNotNull.map((singleItem) => singleItem.value), this.ID],
    };
  }

  delete() {
    console.log('Save inside Database');
    return {
      query: 'DELETE FROM Usuario WHERE ID = ?',
      dados: [this.ID],
    };
  }

  getUserData() {
    return {
      query: 'SELECT * FROM Usuario WHERE Nome = ? OR Email = ? LIMIT 1',
      dados: [this.Nome, this.Email],
    };
  }

  getUserByID() {
    return {
      query: 'SELECT * FROM Usuario WHERE ID = ? LIMIT 1',
      dados: [this.ID],
    };
  }

  toObject() {
    const { ID } = this;
    const { Usuario } = this;
    const { Email } = this;
    const { Senha } = this;
    const { Nome } = this;
    const { Cargo } = this;

    return {
      ID,
      Usuario,
      Email,
      Senha,
      Nome,
      Cargo,
    };
  }
}

module.exports = Usuario;
