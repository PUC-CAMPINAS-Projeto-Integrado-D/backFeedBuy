class Anuncio {
  constructor({
    ID = null, Descricao = null, Preco = null, Marca = null, Anunciante = null,
  }) {
    this.ID = ID;
    this.Descricao = Descricao;
    this.Preco = Preco;
    this.Marca = Marca;
    this.Anunciante = Anunciante;

    return this;
  }

  update() {
    return {
      query: 'UPDATE Anuncio SET Descricao = ?, Preco = ?, Marca = ?, Anunciante = ? WHERE ID = ?',
      dados: [
        this.ID,
        this.Descricao,
        this.Preco,
        this.Marca,
        this.Anunciante,
      ],
    };
  }

  delete() {
    return {
      query: 'DELETE FROM Anuncio WHERE ID = ?',
      dados: [this.ID],
    };
  }

  save() {
    return {
      query: 'INSERT INTO Anuncio (Descricao, Preco, Marca, Anunciante) VALUES (?, ?, ?, ?)',
      dados: [
        this.Descricao,
        this.Preco,
        this.Marca,
        this.Anunciante,
      ],
    };
  }

  getAll() {
    return {
      query: 'INSERT INTO Anuncio (Descricao, Preco, Marca, Anunciante) VALUES (?, ?, ?, ?)',
      dados: [
        this.Descricao,
        this.Preco,
        this.Marca,
        this.Anunciante,
      ],
    };
  }

  toObject() {
    ID = this.ID;
    Descricao = this.Descricao;
    Preco = this.Preco;
    Marca = this.Marca;
    Anunciante = this.Anunciante;

    return {
      ID,
      Descricao,
      Preco,
      Marca,
      Anunciante,
    };
  }
}

module.exports = Anuncio;
