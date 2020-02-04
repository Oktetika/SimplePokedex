export class Pokemon {
    id: number;
    name: string;
    sprite: string;
    height: number;
    weight: number;
    types: {
        name: string[];
    };
    abilities: {
        ability: {
            name: string[];
        }
    };
    active: boolean;
    constructor(id: number, name: string, sprite: string/*, tName: any, aName: any*/) {
        this.id = id;
        this.name = name;
        this.sprite = sprite;
        // this.types.name = tName;
        // this.abilities.ability.name = aName;
    }
}
