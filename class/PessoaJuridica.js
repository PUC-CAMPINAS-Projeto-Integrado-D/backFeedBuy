class PessoaJuridica{

    constructor({ID = null, RazaoSocial = null, NomeFantasia = null, CNPJ = null, Telefone = null, Endereco = null}){
      this.ID = ID;
      this.RazaoSocial = RazaoSocial;
      this.NomeFantasia = NomeFantasia;
      this.CNPJ = CNPJ;
      this.Telefone = Telefone;
      this.Endereco = Endereco;

      return this;
    }

    save(){
        console.log('Save inside Database');
        return {
            query: "INSERT INTO PessoaJuridica (ID, RazaoSocial, NomeFantasia, CNPJ, Telefone, Endereco) VALUES(?, ?, ?, ?, ?, ?)",
            dados: [this.RazaoSocial, this.NomeFantasia, this.CNPJ, this.Telefone, this.Endereco]
         };
      }

    update(){
          console.log('Save inside Database');
          return {
              query: "UPDATE PessoaJuridica SET RazaoSocial = ?, NomeFantasia = ?, CNPJ = ?, Telefone = ?, Endereco = ? WHERE ID = ?",
              dados: [this.RazaoSocial, this.NomeFantasia, this.CNPJ, this.Telefone, this.Endereco]
            };
      }

    delete(){
            console.log('Save inside Database');
            return {
                query: "DELETE FROM PessoaJuridica WHERE ID = ?",
                dados: [this.ID]
            };
      }

    toObject(){
        const ID = this.ID;
        const RazaoSocial = this.RazaoSocial;
        const NomeFantasia = this.NomeFantasia;
        const CNPJ = this.CNPJ;
        const Telefone = this.Telefone;
        const Endereco = this.Endereco;

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
