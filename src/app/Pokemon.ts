export class Pokemon {
    id: number;
    name: string;
    sprite: string;
    active: boolean;
    constructor(id: number, name: string, sprite: string) {
        this.id = id;
        this.name = name;
        this.sprite = sprite;
    }
}
