---
title: Character Sheets
style: |-
  li {
    --color: #ebe5fa;
    --transition-color: #f6b2f0;
  }

  :root:has(#menu-theme-light:checked) li {
    --color: #ebe5fa;
    --transition-color: #f6b2f0;
  }

  :root[data-theme="light"] li {
    --color: #ebe5fa;
    --transition-color: #f6b2f0;
  }

  @media (prefers-color-scheme: dark) {
    li {
      --color: #e5c8f2;
      --transition-color: #c772c0;
    }
  }

  :root:has(#menu-theme-dark:checked) li {
    --color: #e5c8f2;
    --transition-color: #c772c0;
  }

  :root[data-theme="dark"] li {
    --color: #e5c8f2;
    --transition-color: #c772c0;
  }

  ul {
    list-style-type: none;
    padding: 0;
    display: grid;
  }

  li {
    margin: 1em 0;
    display: flex;
    background: linear-gradient(135deg, var(--transition-color), var(--transition-color) 85%, transparent 85%, transparent);
  }

  li:nth-child(even) {
    background: linear-gradient(225deg, var(--transition-color), var(--transition-color) 85%, transparent 85%, transparent);
  }

  li:nth-child(even) a {
    text-align: right;
    background: linear-gradient(315deg, var(--accent), var(--accent) 50%, transparent 75%, transparent);
  }

  a.game {
    color: var(--color);
    background: linear-gradient(45deg, var(--accent), var(--accent) 50%, transparent 75%, transparent);
    padding: 15px 10%;
    text-decoration: none;
    text-shadow: 2px 2px 0 black;
    font-family: var(--sans);
    font-weight: bold;
    font-size: 60px;
    line-height: 1;
    width: 100%;
    display: inline-block;
    box-sizing: border-box;
    font-stretch: ultra-condensed;
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
