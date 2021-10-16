class GaleriaAnuncio {
    constructor({
        ID = null,
        Midia = null,
        Anuncio = null,
    }){

        this.ID = ID;
        this.Midia = Midia;
        this.Anuncio = Anuncio;

        return this;
    }

    delete(){
        console.log('Save inside Database');
        return {
            query: "DELETE FROM GaleriaAnuncio WHERE ID = ?",
            dados: [this.ID]
        };
    }

    save(){
        console.log('Save inside Database');
        return {
            query: "INSERT INTO GaleriaAnuncio (Midia, Anuncio) VALUES (?, ?)",
            dados: [this.Midia, this.Anuncio]
        };
    }

    toObject(){

        ID = this.ID;
        Midia = this.Midia;
        Anuncio = this.Anuncio;

        return {
            ID,
            Midia,
            Anuncio,
        };
    }
}
