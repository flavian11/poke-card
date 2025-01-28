/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import { PokeCard } from "../src/component/pokeCard";

import { fixture, assert } from "@open-wc/testing";
import { html } from "lit/static-html.js";

suite("axa-custom", () => {
  test("is defined", () => {
    const el = document.createElement("axa-custom");
    assert.instanceOf(el, PokeCard);
  });

  test("renders with Icon and default colors", async () => {
    const el = await fixture(html`<axa-custom></axa-custom>`);
    assert.shadowDom.equal(
      el,
      `<div class="container">
	  Hello, You're all set up to start Working on Webcomponents ! 
      </div>
    `
    );
  });
});
