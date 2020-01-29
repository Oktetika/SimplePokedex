import { Component, OnInit } from '@angular/core';
import { GetpokeService } from '../getpoke.service';
import { Pokemon } from '../Pokemon';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {

  constructor(private getPokeService: GetpokeService, private router: Router) { }

  arrPokemon: any;
  pokemonList: any;
  lenght: number;
  detailsPokemon: any;
  pokemon: Pokemon[] = [];
  limit = 50;


  ngOnInit() {

    this.getPokeService.getPokemon(this.limit).subscribe(data => {

      this.arrPokemon = data;
      this.pokemonList = this.arrPokemon.results;

      for (const i of this.pokemonList) {
        this.getPokeService.getPokemonId(i.url).subscribe(data2 => {

        this.detailsPokemon = data2;
        this.pokemon.push(new Pokemon(this.detailsPokemon.id, this.detailsPokemon.name, this.detailsPokemon.sprites.front_default));

        for (const p of this.pokemon) {
          if (p.name === i.name) {
            i.id = p.id;
            i.sprite = p.sprite;
          }
        }

        i.name = i.name[0].toUpperCase() + i.name.substr(1).toLowerCase();

        }, error => console.log(error));
      }

    }, error => console.log(error));
  }

  pokemonDetails(id: number) {
    this.router.navigate(['details', id]);
  }

}
