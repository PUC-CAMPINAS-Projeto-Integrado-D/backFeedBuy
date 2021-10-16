class Pais{

    constructor({ID : null, Nome : null, NomePT : null, Sigla : null, Bacen : null}){
      this.ID = ID;
      this.Nome = Nome;
      this.NomePT = NomePT;
      this.Sigla = Sigla;
      this.Bacen = Bacen;

      return this;
    }

    toObject(){
        const ID = this.ID;
        const Nome = this.Nome;
        const NomePT = this.NomePT;
        const Sigla = this.Sigla;
        const Bacen = this.Bacen;

        return {
            ID,
            Nome,
            NomePT,
            Sigla,
            Bacen,
        };
    }
}
