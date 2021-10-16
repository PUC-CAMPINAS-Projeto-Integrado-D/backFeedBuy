class Cidade {
    constructor({ID = null, Nome = null, UF = null, IBGE = null}){

        this.ID = ID;
        this.Nome = Nome;
        this.UF = UF;
        this.IBGE = IBGE;

        return this;
    }

    toObject(){

        ID = this.ID;
        Nome = this.Nome;
        UF = this.UF;
        IBGE = this.IBGE;

        return {
            ID,
            Nome,
            UF,
            IBGE,
        };
    }
}
