import { LitElement, html, css } from "lit";
import { Task } from "@lit/task";
import { customElement, property } from "lit/decorators.js";
import styles from "./styles.scss";

type Stat = {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
};

type Type = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};

type Sprite = {
  other: {
    "official-artwork": {
      front_default: string
    }
  }
}

type Pokemon = {
  abilities: Array<Object>,
  base_experience: number,
  cries: Object,
  forms: Array<Object>,
  game_indices: Array<Object>,
  height: number,
  held_items: Array<Object>,
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: Array<Object>,
  name: string,
  order: number,
  past_abilities: Array<Object>,
  past_types: Array<Object>,
  species: Object,
  sprites: Sprite,
  stats: Array<Stat>,
  types: Array<Type>,
  weight: number

}

@customElement("poke-card")
export class PokeCard extends LitElement {
  static override styles = css`
    ${styles}
  `;

  statConversionTable = {
    "hp": "hp",
    "attack": "atk",
    "defense": "def",
    "special-attack": "spa",
    "special-defense": "spd",
    "speed": "spe"
  }

  @property()
  pokeId: Number = 1;

  private _pokeTask = new Task(this, {
    task: async ([pokeId], { signal }) => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokeId}`,
        { signal }
      );
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      return response.json();
    },
    args: () => [this.pokeId],
  });

  _displayPoke(pokemon: Pokemon) {
    return html`
      <div class="card">
        <div class=${"card-header " + pokemon.types[0].type.name}>
          <img
            src=${pokemon.sprites.other["official-artwork"].front_default}
            class="pokemon-image"
          />
        </div>
        <div class="card-body">
          <h1 class="pokemon-name">${pokemon.name}</h1>
          <div class="types">${this._displayTypes(pokemon.types)}</div>
          <div class="stats">
            <div class="stat">
              <span class="label">Height</span>
              <span class="value">${pokemon.height / 10}m</span>
            </div>
            <div class="stat">
              <span class="label">Weight</span>
              <span class="value">${pokemon.weight / 10}kg</span>
            </div>
            <div class="stat">
              <span class="label">Base EXP</span>
              <span class="value">${pokemon.base_experience}</span>
            </div>
          </div>
          <div class="base-stats">${this._displayStats(pokemon.stats)}</div>
        </div>
      </div>
    `;
  }

  _displayStats(stats: Stat[]) {
    return stats.map(
      (stat: Stat) => html`
        <div class="stat-item">
          <div class=${"stat-name " + this.statConversionTable[stat.stat.name as keyof typeof this.statConversionTable]}>${this.statConversionTable[stat.stat.name as keyof typeof this.statConversionTable]}</div>
          <div class="stat-value">${stat.base_stat}</div>
        </div>
      `
    );
  }

  _displayTypes(types: Type[]) {
    return types.map(
      (type: Type) => html` <span class=${"type " + type.type.name}>${type.type.name}</span> `
    );
  }

  override render() {
    return this._pokeTask.render({
      pending: () => html`<p>Loading pokemon...</p>`,
      complete: (pokemon) => this._displayPoke(pokemon),
      error: (e) => html`<p>Error: ${e}</p>`,
    });
  }
}
