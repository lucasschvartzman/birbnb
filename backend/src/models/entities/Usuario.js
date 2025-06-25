export class Usuario{
    nombre;
    email;
    password;
    tipo;
    constructor(nombre,email,password,tipo){
        this.nombre=nombre;
        this.email=email;
        this.password=password;
        this.tipo=tipo;
    }
}