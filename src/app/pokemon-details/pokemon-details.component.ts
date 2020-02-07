import { Component, OnInit } from '@angular/core';
import { GetpokeService } from '../getpoke.service';
import { ActivatedRoute } from '@angular/router';
import { PokemonDetails } from '../PokemonDetails';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  constructor(private getPokeService: GetpokeService, private route: ActivatedRoute) { }

  pokemonDetails: PokemonDetails;
  id: number;
  types = [];
  abilities = [];
  sprite: any;
  // aEffect = [];
  moves: any;
  // mEffect = [];
  statsIter = [];
  stats = [];
  dummyArray = [];


  ngOnInit() {

    this.pokemonDetails = new PokemonDetails();
    // tslint:disable-next-line: no-string-literal
    this.id = this.route.snapshot.params['id'];

    this.getPokeService.getPokemonById(this.id).subscribe(data => {
      this.pokemonDetails = data;
      this.types = data.types;
      this.abilities = data.abilities;
      this.sprite = data.sprites.front_default;
      this.moves = data.moves;
      this.pokemonDetails.height = data.height / 10;
      this.pokemonDetails.weight = data.weight / 10;
      this.stats = data.stats;

      this.stats = this.stats.reverse();

      for (const a of this.abilities) {
        this.getPokeService.getAbilityDefinition(a.ability.url).subscribe(data2 => {
          this.dummyArray = data2.effect_entries[0].effect;
          a.aEffect = this.dummyArray;
        })
      }

      for (const m of this.moves) {
        this.getPokeService.getMoveDefinition(m.move.url).subscribe(data3 => {
          this.dummyArray = data3.effect_entries[0].effect;
          m.mEffect = this.dummyArray;
        })
      }

      for (const k of this.types) {
        k.type.name = k.type.name[0].toUpperCase() + k.type.name.substr(1).toLowerCase();
      }
      for (const k of this.abilities) {
        k.ability.name = k.ability.name[0].toUpperCase() + k.ability.name.substr(1).toLowerCase();
      }
      for (const k of this.moves) {
        k.move.name = k.move.name[0].toUpperCase() + k.move.name.substr(1).toLowerCase();
      }
      for (const k of this.stats) {
        k.stat.name = k.stat.name[0].toUpperCase() + k.stat.name.substr(1).toLowerCase();
      }
      this.pokemonDetails.name = this.pokemonDetails.name.toUpperCase();


    }, error => console.log(error));
  }
}
