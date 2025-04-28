class TipoUsuario {
    constructor(nombre) {
      this.nombre = nombre;
    }
  }
  
  TipoUsuario.HUESPED = new TipoUsuario("HUESPED");
  TipoUsuario.ANFITRION = new TipoUsuario("ANFITRION");
  
  export default TipoUsuario;