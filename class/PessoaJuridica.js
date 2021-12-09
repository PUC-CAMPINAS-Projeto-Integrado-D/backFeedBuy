class PessoaJuridica {
  constructor({
    ID = null, RazaoSocial = null, NomeFantasia = null, CNPJ = null, Telefone = null, Endereco = null,
  }) {
    this.ID = ID;
    this.RazaoSocial = RazaoSocial;
    this.NomeFantasia = NomeFantasia;
    this.CNPJ = CNPJ;
    this.Telefone = Telefone;
    this.Endereco = Endereco;

    return this;
  }

  save() {
    console.log('Save inside Database');
    return {
      query: 'INSERT INTO PessoaJuridica (RazaoSocial, NomeFantasia, CNPJ, Telefone, Endereco) VALUES(?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE CNPJ = CNPJ',
      dados: [this.RazaoSocial, this.NomeFantasia, this.CNPJ, this.Telefone, this.Endereco],
    };
  }

  update() {
    console.log('Save inside Database');
    return {
      query: 'UPDATE PessoaJuridica SET RazaoSocial = ?, NomeFantasia = ?, CNPJ = ?, Telefone = ?, Endereco = ? WHERE ID = ?',
      dados: [this.RazaoSocial, this.NomeFantasia, this.CNPJ, this.Telefone, this.Endereco],
    };
  }

  delete() {
    console.log('Save inside Database');
    return {
      query: 'DELETE FROM PessoaJuridica WHERE ID = ?',
      dados: [this.ID],
    };
  }

  toObject() {
    const { ID } = this;
    const { RazaoSocial } = this;
    const { NomeFantasia } = this;
    const { CNPJ } = this;
    const { Telefone } = this;
    const { Endereco } = this;

    return {
      ID,
      RazaoSocial,
      NomeFantasia,
      CNPJ,
      Telefone,
      Endereco,
    };
  }
}

module.exports = PessoaJuridica;
