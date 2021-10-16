class RelacaoTrabalho{

    constructor({ID : null, PessoaFisica : null, PessoaJuridica : null}){
      this.ID = ID;
      this.PessoaFisica = PessoaFisica;
      this.PessoaJuridica = PessoaJuridica;

      return this;
    }

    save(){
        console.log('Save inside Database');
        return {
            query: "INSERT INTO RelacaoTrabalho (ID, PessoaFisica, PessoaJuridica) VALUES(?, ?)",
            dados: [this.PessoaFisica, this.PessoaJuridica]
         };
      }

    delete(){
            console.log('Save inside Database');
            return {
                query: "DELETE FROM RelacaoTrabalho WHERE ID = ?",
                dados: [this.ID]
            };
      }

    toObject(){
        const ID = this.ID;
        const PessoaFisica = this.PessoaFisica;
        const PessoaJuridica = this.PessoaJuridica;

        return {
            ID,
            PessoaFisica,
            PessoaJuridica,
        };
    }
}
