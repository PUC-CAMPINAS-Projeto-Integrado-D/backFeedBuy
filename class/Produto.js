class Produto {
  constructor({ ID = null, Marca = null }) {
    this.ID = ID;
    this.Marca = Marca;

    return this;
  }

  save() {
    return {
      query: 'INSERT INTO Produto(Marca) VALUES(UPPER(?)) ON DUPLICATE KEY UPDATE Marca = Marca',
      dados: [this.Marca],
    };
  }

  delete() {
    return {
      query: 'DELETE FROM Produto WHERE ID = ?',
      dados: [this.ID],
    };
  }

  getByMarca() {
    return {
      query: 'SELECT * FROM Produto WHERE MARCA LIKE UPPER(?)',
      dados: [this.Marca],
    };
  }

  toObject() {
    const { ID } = this;
    const { Marca } = this;

    return {
      ID,
      Marca,
    };
  }
}

module.exports = Produto;
