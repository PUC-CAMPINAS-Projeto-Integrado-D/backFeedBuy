class Estado {
  constructor({
    ID = null, Nome = null, UF = null, IBGE = null, Pais = null, DDD = null,
  }) {
    this.ID = ID;
    this.Nome = Nome;
    this.UF = UF;
    this.IBGE = IBGE;
    this.Pais = Pais;
    this.DDD = DDD;

    return this;
  }

  toObject() {
    ID = this.ID;
    Nome = this.Nome;
    UF = this.UF;
    IBGE = this.IBGE;
    Pais = this.Pais;
    DDD = this.DDD;

    return {
      ID,
      Nome,
      UF,
      IBGE,
      Pais,
      DDD,
    };
  }
}
