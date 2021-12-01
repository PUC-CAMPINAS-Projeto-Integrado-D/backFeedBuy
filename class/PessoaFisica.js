class PessoaFisica {
  constructor({
    ID = null, CPF = null, Nome = null, Telefone = null, Endereco = null,
  }) {
    this.ID = ID;
    this.CPF = CPF;
    this.Nome = Nome;
    this.Telefone = Telefone;
    this.Endereco = Endereco;
    return this;
  }

  save() {
    return {
      query: 'INSERT INTO PessoaFisica (CPF,Nome,Telefone,Endereco) VALUES (?, ?, ?, ?)',
      dados: [this.CPF, this.Nome, this.Telefone, this.Endereco],
    };
  }

  toObject() {
    const { ID } = this;
    const { CPF } = this;
    const { Nome } = this;
    const { Telefone } = this;
    const { Endereco } = this;

    return {
      ID,
      CPF,
      Nome,
      Telefone,
      Endereco,
    };
  }
}

module.exports = PessoaFisica;
