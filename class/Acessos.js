class Acessos {
  constructor({ ID = null, Usuario = null, PessoaFisica = null }) {
    this.ID = ID;
    this.Usuario = Usuario;
    this.PessoaFisica = PessoaFisica;
    return this;
  }

  update() {
    console.log('Save inside Database');
    return {
      query: 'UPDATE Acessos SET Usuario = ?,PessoaFisica = ?',
      dados: [this.Usuario, this.PessoaFisica],
    };
  }

  delete() {
    console.log('Save inside Database');
    return {
      query: 'DELETE FROM Acessos WHERE ID = ?',
      dados: [this.ID],
    };
  }

  save() {
    console.log('Save inside Database');
    return {
      query: 'INSERT INTO Acessos (Usuario,PessoaFisica) VALUES (?,?)',
      dados: [this.Usuario, this.PessoaFisica],
    };
  }

  toObject() {
    ID = this.ID;
    Usuario = this.Usuario;
    PessoaFisica = this.PessoaFisica;

    return {
      ID,
      Usuario,
      PessoaFisica,
    };
  }
}
