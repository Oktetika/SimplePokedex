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

  ngOnInit() {

    this.pokemonDetails = new PokemonDetails();
    // tslint:disable-next-line: no-string-literal
    this.id = this.route.snapshot.params['id'];

    this.getPokeService.getPokemonById(this.id).subscribe(data3 => {
      this.pokemonDetails = data3;
      this.types = data3.types;
      this.abilities = data3.abilities;

      console.log(data3.types);
      console.log(data3.types[0].type.name);
      console.log('---------------------------------');
      console.log(data3.abilities);
      console.log(data3.abilities[0].name);

    }, error => console.log(error));
  }
}
