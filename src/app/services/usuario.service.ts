import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  listUsuarios: Usuario[] = [
    {usuario: "lmeden", nombre: 'Leonardo', apellido: "Meden", sexo: 'Masculino'},
    {usuario: "agentile", nombre: 'Alejandra', apellido: "Gentile", sexo: 'Femenino'},
    {usuario: "fspinazze", nombre: 'Federico', apellido: "Spinazze", sexo: 'Masculino'},
    {usuario: "mnasini", nombre: 'Matias', apellido: "Nasini", sexo: 'Masculino'},
    {usuario: "dtoledo", nombre: 'Damian', apellido: "Toledo", sexo: 'Masculino'},
    {usuario: "idefays", nombre: 'Ivan', apellido: "Defays", sexo: 'Masculino'},
    {usuario: "atourn", nombre: 'Alejandro', apellido: "Tourn", sexo: 'Masculino'},
    {usuario: "dricci", nombre: 'David', apellido: "Ricci", sexo: 'Masculino'}
  ];

  constructor() { }

  getUsuario() {
    return this.listUsuarios.slice();
  }

  eliminarUsuario(index: number) {
    this.listUsuarios.splice(index, 1);
  }

  agregarUsuario(usuario: Usuario) {
    this.listUsuarios.unshift(usuario);
  }
}
