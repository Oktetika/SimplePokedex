import { Component } from '@angular/core';
import { Pokemon } from './Pokemon';
import { GetpokeService } from './getpoke.service';
import { PokemonList } from './PokemonList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'POKEMON API TEST';

  constructor(private getPokeService: GetpokeService) { }

  arrPokemon: any;
  detailsPokemon: any;
  pokemonList: any;
  url: any;
  pokemon: Pokemon[] = [];
  cntr = 0;
  lenght: number;

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

    this.getPokeService.getPokemon().subscribe(data => {

      this.arrPokemon = data;
      this.pokemonList = this.arrPokemon.results;
      console.log('****************************');
      // console.log(this.pokemonList);
      console.log('****************************');
      // console.log(this.pokemonList[0].url);

      this.lenght = Object.keys(this.pokemonList).length;

      console.log('--------------------------------');
      console.log('--------------------------------');

      for (const i of this.pokemonList) {
        // console.log(i.url);
        this.getPokeService.getPokemonId(i.url).subscribe(data2 => {

        // console.log(this.pokemonList.url);
        // console.log('+++++++++++++++++++++++++++++');
        this.detailsPokemon = data2;
        this.pokemon.push(new Pokemon(this.detailsPokemon.id, this.detailsPokemon.name, this.detailsPokemon.sprites.front_default));

        for (const p of this.pokemon) {
          if (p.name === i.name) {
            i.id = p.id;
            i.sprite = p.sprite;
          }
        }

        // this.pokemonList.sprites = this.detailsPokemon.sprites.front_default;

        console.log(this.pokemonList.sprites);
        // console.log(this.pokemon.name);
         }, error => console.log(error));
      }
      console.log('--------------------------------');
      console.log(this.pokemonList[4].id);
      console.log('--------------------------------');

      console.log('+++++++++++++++++++++++++++++');
      // console.log(this.pokemon);
      console.log('+++++++++++++++++++++++++++++');
      // console.log('****************************');
      // console.log(this.ability);
      // console.log('****************************');
      // console.log(this.pokemon.abilities[0].ability.name);
      }, error => console.log(error));

  }
}

