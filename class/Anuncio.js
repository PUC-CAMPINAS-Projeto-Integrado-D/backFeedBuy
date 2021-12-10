class Anuncio {
  constructor({
    ID = null, Descricao = null, Preco = null, Marca = null, Anunciante = null, Limit = 50, Page = 1,
  }) {
    this.ID = ID;
    this.Descricao = Descricao;
    this.Preco = Preco;
    this.Marca = Marca;
    this.Anunciante = Anunciante;
    this.Limit = Limit;
    this.Page = Page;

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

  getListWithBrand() {
    return {
      query: `SELECT
                Anuncio.ID,
                Anuncio.Descricao as Obs,
                Anuncio.Preco,
                Produto.Marca as Descricao
            FROM Anuncio
            LEFT JOIN Produto ON Produto.ID = Anuncio.Marca
            ORDER BY Anuncio.Cadastrado DESC
            LIMIT ?, ?
       `,
      dados: [
        this.Limit * (this.Page - 1),
        this.Limit,
      ],
    };
  }

  getCountTotal() {
    return {
      query: 'SELECT COUNT(*) as Total FROM Anuncio',
      dados: [],
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
