class Chat {
  constructor({
    ID = null, Anunciante = null, Comprador = null, Anuncio = null,
  }) {
    this.ID = ID;
    this.Anunciante = Anunciante;
    this.Comprador = Comprador;
    this.Anuncio = Anuncio;

    return this;
  }

  update() {
    console.log('Save inside Database');
    return {
      query: 'UPDATE Chat SET Anunciante = ?, Comprador = ?, Anuncio = ? WHERE ID = ?',
      dados: [
        this.Anunciante,
        this.Comprador,
        this.Anuncio,
        this.ID,
      ],
    };
  }

  delete() {
    console.log('Save inside Database');
    return {
      query: 'DELETE FROM Chat WHERE ID = ?',
      dados: [this.ID],
    };
  }

  save() {
    console.log('Save inside Database');
    return {
      query: 'INSERT INTO Chat (Anunciante, Comprador, Anuncio) VALUES (?, ?, ?)',
      dados: [
        this.Anunciante,
        this.Comprador,
        this.Anuncio,
      ],
    };
  }

  toObject() {
    Anunciante = this.Anunciante;
    Comprador = this.Comprador;
    Anuncio = this.Anuncio;

    return {
      ID,
      Anunciante,
      Comprador,
      Anuncio,
    };
  }
}
