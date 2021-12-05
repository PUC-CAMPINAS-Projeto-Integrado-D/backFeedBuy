class AssuntosAnuncio {
  constructor({ ID = null, Anuncio = null, Hashtag = null }) {
    this.ID = ID;
    this.Anuncio = Anuncio;
    this.Hashtag = Hashtag;

    return this;
  }

  update() {
    console.log('Save inside Database');
    return {
      query: 'UPDATE AssuntosAnuncio SET Anuncio = ?, Hashtag = ? WHERE ID = ?',
      dados: [
        this.Anuncio,
        this.Hashtag,
        this.ID,
      ],
    };
  }

  delete() {
    console.log('Save inside Database');
    return {
      query: 'DELETE FROM AssuntosAnuncio WHERE ID = ?',
      dados: [this.ID],
    };
  }

  save() {
    console.log('Save inside Database');
    return {
      query: 'INSERT INTO AssuntosAnuncio (Anuncio, Hashtag) SELECT ? Anuncio, ID FROM Hashtag WHERE Hashtag IN (?)',
      dados: [this.Anuncio, this.Hashtag],
    };
  }

  toObject() {
    ID = this.ID;
    Anuncio = this.Anuncio;
    Hashtag = this.Hashtag;

    return {
      ID,
      Anuncio,
      Hashtag,
    };
  }
}

module.exports = AssuntosAnuncio;
