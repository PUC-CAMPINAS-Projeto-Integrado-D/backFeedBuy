class Endereco {
  constructor({
    ID = null, Endereco = null, Bairro = null, Numero = null, CEP = null, Cidade = null,
  }) {
    this.ID = ID;
    this.Endereco = Endereco;
    this.Bairro = Bairro;
    this.Numero = Numero;
    this.CEP = CEP;
    this.Cidade = Cidade;

    return this;
  }

  update() {
    console.log('Save inside Database');
    return {
      query: 'UPDATE Endereco SET Endereco = ?, Bairro = ?, Numero = ?, CEP = ?, Cidade = ? WHERE ID = ?',
      dados: [
        this.Endereco,
        this.Bairro,
        this.Numero,
        this.CEP,
        this.Cidade,
        this.ID,
      ],
    };
  }

  delete() {
    console.log('Save inside Database');
    return {
      query: 'DELETE FROM Endereco WHERE ID = ?',
      dados: [this.ID],
    };
  }

  save() {
    console.log('Save inside Database');
    return {
      query: 'INSERT INTO Endereco (Endereco, Bairro, Numero, CEP, Cidade) VALUES (?, ?, ?, ?, ?)',
      dados: [
        this.Endereco,
        this.Bairro,
        this.Numero,
        this.CEP,
        this.Cidade,
      ],
    };
  }

  toObject() {
    ID = this.ID;
    Endereco = this.Endereco;
    Bairro = this.Bairro;
    Numero = this.Numero;
    CEP = this.CEP;
    Cidade = this.Cidade;

    return {
      ID,
      Endereco,
      Bairro,
      Numero,
      CEP,
      Cidade,
    };
  }
}
