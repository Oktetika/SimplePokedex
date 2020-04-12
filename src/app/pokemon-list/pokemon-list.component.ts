import { Component, OnInit } from '@angular/core';
import { GetpokeService } from '../getpoke.service';
import { Pokemon } from '../Pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {

  constructor(private getPokeService: GetpokeService, private router: Router) { }

  arrPokemon: any;
  pokemonList: any;
  detailsPokemon: any;
  pokemon: Pokemon[] = [];
  limit: number;
  offset: number;
  types = [];
  searchBy: any;
  options = [
    { name: '12', value: 1},
    { name: '40', value: 1},
    { name: '80', value: 1},
    { name: '160', value: 1},
    { name: '500', value: 1},
  ];



  ngOnInit() {
    this.reloadData(this.offset, this.limit);
  }

  reloadData(offset: number, limit: number) {
    this.getPokeService.getPokemon(offset, limit).subscribe(data => {

      this.arrPokemon = data;
      this.pokemonList = this.arrPokemon.results;

      for (const i of this.pokemonList) {
        this.getPokeService.getPokemonId(i.url).subscribe(data2 => {

        this.detailsPokemon = data2;
        this.types = this.detailsPokemon.types;
        this.pokemon.push(new Pokemon(this.detailsPokemon.id, this.detailsPokemon.name, this.detailsPokemon.sprites.front_default,
          this.detailsPokemon.height, this.detailsPokemon.weight));

        for (const p of this.pokemon) {
          if (p.name === i.name) {
            i.id = p.id;
            i.sprite = p.sprite;
            i.types = this.types;
          }
        }

        i.name = i.name[0].toUpperCase() + i.name.substr(1).toLowerCase();
        for (const k of i.types) {
          k.type.name = k.type.name[0].toUpperCase() + k.type.name.substr(1).toLowerCase();
        }

        }, error => console.log(error));
      }
    }, error => console.log(error));
  }

  test(a) {
    const x = (a.value || a.options[a.selectedIndex].value);
    this.reloadData(x, x);
  }

  pokemonDetails(id: number) {
    this.router.navigate(['details', id]);
  }

}
