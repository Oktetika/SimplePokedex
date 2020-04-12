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
  moves: any;
  stats = [];
  dummyArray = [];
  evolvesTo = [];
  evolvesFrom = [];

  nameCheck = false;
  flag = false;
  chainCheck: any;
  speciesName: any;
  dummyId: any;

  n = 0;


  ngOnInit() {
    this.generalDetails();
    this.speciesDetails();
  }

  generalDetails() {
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

      this.funLoops();

    }, error => console.log(error));
  }

  speciesDetails() {
    this.getPokeService.getSpeciesDetails(this.id).subscribe(data => {

      this.pokemonDetails.eggGroup = data.egg_groups;
      this.pokemonDetails.generation = data.generation.name.toUpperCase();

      for (const k of this.pokemonDetails.eggGroup) {
        k.name = k.name[0].toUpperCase() + k.name.substr(1).toLowerCase();
      }

      this.getPokeService.getEvolutionDetails(data.evolution_chain.url).subscribe(data2 => {
        this.pokemonDetails.evolutionChain = data2.chain;

        this.chainCheck = this.pokemonDetails.evolutionChain;

        do {

          this.speciesName = this.chainCheck.species.name;
          if (this.pokemonDetails.name === this.speciesName.toUpperCase()) {
            this.flag = true;
            this.nameCheck = true;
          }

          if (!this.nameCheck) {
            if (!this.flag) {
              this.evolvesFrom.push(this.speciesName.toUpperCase());
            } else {
              this.evolvesTo.push(this.speciesName.toUpperCase());
            }
          }

          this.chainCheck = this.chainCheck.evolves_to[0];
          this.nameCheck = false;

        } while (this.chainCheck != null);


      }, error => console.log(error));

    }, error => console.log(error));
  }

  funLoops() {
    for (const a of this.abilities) {
      this.getPokeService.getAbilityDefinition(a.ability.url).subscribe(data2 => {
        this.dummyArray = data2.effect_entries[0].short_effect;
        a.aEffect = this.dummyArray;
      });
    }

    for (const m of this.moves) {
      this.getPokeService.getMoveDefinition(m.move.url).subscribe(data3 => {
        this.dummyArray = data3.effect_entries[0].short_effect;
        m.mEffect = this.dummyArray;
        const re = '$effect_chance';
        if (data3.effect_chance) {
          m.mEffect = m.mEffect.replace(re, data3.effect_chance);
        }
        m.dmgClass = data3.damage_class.name.toUpperCase();
        if (data3.accuracy) {
          m.accuracy = data3.accuracy + '%';
        } else {
          m.accuracy = '---';
        }
        if (data3.power) {
          m.power = data3.power;
        } else {
          m.power = '---';
        }
        m.pp = data3.pp;
      });
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
  }

}
