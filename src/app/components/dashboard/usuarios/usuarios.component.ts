import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/interfaces/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

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

  displayedColumns: string[] = ['usuario', 'nombre', 'apellido', 'sexo', 'acciones'];
  dataSource = new MatTableDataSource(this.listUsuarios);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
