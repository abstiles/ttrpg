---
title: TTRPG Stuff
style: |-
  li {
    --color: #ebe5fa;
    --transition-color: #ebb8d5;
  }

  :root:has(#menu-theme-light:checked) li {
    --color: #ebe5fa;
    --transition-color: #ebb8d5;
  }

  :root[data-theme="light"] li {
    --color: #ebe5fa;
    --transition-color: #ebb8d5;
  }

  @media (prefers-color-scheme: dark) {
    li {
      --color: #e5c8f2;
      --transition-color: #b57b9b;
    }
  }

  :root:has(#menu-theme-dark:checked) li {
    --color: #e5c8f2;
    --transition-color: #b57b9b;
  }

  :root[data-theme="dark"] li {
    --color: #e5c8f2;
    --transition-color: #b57b9b;
  }

  ul {
    list-style-type: none;
    padding: 0;
    display: grid;
  }

  li {
    margin: 1em 0;
    display: flex;
    background: linear-gradient(137deg, var(--transition-color), var(--transition-color) 85%, transparent 75%, transparent);
  }

  a.game {
    color: var(--color);
    background: linear-gradient(45deg, var(--accent), var(--accent) 50%, transparent 75%, transparent);
    padding: 1em;
    text-decoration: none;
    text-shadow: 2px 2px 0 black;
    font-family: var(--sans);
    font-weight: bold;
    font-size: larger;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    font-stretch: expanded;
  }
---
{% assign idx = 0 %}
{% for page in site.pages -%}
{%- if page.category == "character sheet" -%}
{%- assign hue = idx | times: 0.618 | times: 360 | modulo: 360 -%}
* {:style='filter:hue-rotate({{ hue }}deg)'}[{{ page.title }}]({{ page.url | relative_url }}){:.game}
{% assign idx = idx | plus: 1 -%}
{%- endif -%}
{%- endfor %}
