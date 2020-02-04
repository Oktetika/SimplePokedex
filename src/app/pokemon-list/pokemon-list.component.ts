import { Component, OnInit } from '@angular/core';
import { GetpokeService } from '../getpoke.service';
import { Pokemon } from '../Pokemon';
import { Router } from '@angular/router';
import { PokemonDetails } from '../PokemonDetails';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent implements OnInit {

  constructor(private getPokeService: GetpokeService, private router: Router) { }

  arrPokemon: any;
  pokemonList: any;
  pokemonListGroup: any;
  lenght: number;
  detailsPokemon: any;
  pokemon: Pokemon[] = [];
  limit = 12;
  types = [];
  abilities = [];
  color = 'red';


  ngOnInit() {
    this.reloadData(this.limit);
  }

  reloadData(limit: number) {
    this.getPokeService.getPokemon(this.limit).subscribe(data => {

      this.arrPokemon = data;
      this.pokemonList = this.arrPokemon.results;

      for (const i of this.pokemonList) {
        this.getPokeService.getPokemonId(i.url).subscribe(data2 => {

        this.detailsPokemon = data2;
        this.types = this.detailsPokemon.types;
        this.abilities = this.detailsPokemon.abilities;
        // this.funPokemonById(this.detailsPokemon);
        this.pokemon.push(new Pokemon(this.detailsPokemon.id, this.detailsPokemon.name, this.detailsPokemon.sprites.front_default));

        for (const p of this.pokemon) {
          if (p.name === i.name) {
            i.id = p.id;
            i.sprite = p.sprite;
            i.height = p.height;
            i.weight = p.weight;
            i.types = this.types;
            // if (i.types.type.name == 'Fire'){
            //     elem.style.background = 'red';
            // }
            // if (i.types.type.name == 'Water'){
            //     elem.style.background = 'blue';
            // }
            // if (i.types.type.name == 'Grass'){
            //     elem.style.background = 'green';
            // }
            // if (i.types.type.name == 'Poison'){
            //     elem.style.background = 'purple';
            // }
            i.abilities = this.abilities;
          }
        }



        i.name = i.name[0].toUpperCase() + i.name.substr(1).toLowerCase();
        for (const k of i.types) {
          k.type.name = k.type.name[0].toUpperCase() + k.type.name.substr(1).toLowerCase();
        }
        for (const k of i.abilities) {
          k.ability.name = k.ability.name[0].toUpperCase() + k.ability.name.substr(1).toLowerCase();
        }


        }, error => console.log(error));
      }

    }, error => console.log(error));
  }
  test(a) {
    const x = (a.value || a.options[a.selectedIndex].value);
    this.reloadData(x);
  }

  // funPokemonById(detPok: any) {
  //   this.pokemon.push(new Pokemon(detPok.id, detPok.name, detPok.sprites.front_default,
  //     detPok.abilities.ability.name, detPok.types.type.name));
  // }

  // pokemonDetails(id: number) {
  //   this.router.navigate(['details', id]);
  // }

}
