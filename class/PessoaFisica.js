class PessoaFisica{
    constructor({ID = null, CPF = null, Nome = null, Telefone = null, Endereco = null}){
        this.ID = ID;
        this.CPF = CPF;
        this.Nome = Nome;
        this.Telefone = Telefone;
        this.Endereco = Endereco;
        return this;
    }

    save(){
        console.log('Save inside Database');
    }

    toObject(){
        const ID = this.ID;
        const CPF = this.CPF;
        const Nome = this.Nome;
        const Telefone = this.Telefone;
        const Endereco = this.Endereco;

        return {
            ID,
            CPF,
            Nome,
            Telefone,
            Endereco,
        };
    }
}
