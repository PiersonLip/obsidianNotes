---
category: paper
citekey: {{citekey}}
aliases:
  - {{citekey}}
tags:
  - astro-notes/paper
---
# {{title}} [@{{citekey}}]

---

> [!info] Metadata
> **Citekey:** {{citekey}}
> **Year:** {{date | format("YYYY")}}
{% for type, creators in creators | groupby("creatorType") -%}
{%- for creator in creators -%}
> **{{ "First" if loop.first }}{{ type | capitalize }}:** {% if creator.name %}{{ creator.name }}{% else %}{{ creator.lastName }}, {{ creator.firstName }}{% endif %}
{%- endfor -%}
{%- endfor %}
{% if publicationTitle %}
> **Journal:** {{ publicationTitle }}
{% endif %}
{% if DOI %}
> **DOI:** {{ DOI }}
{% endif %}
{% for attachment in attachments | filterby("path", "endswith", ".pdf") %}
> **PDF:** [{{ attachment.title }}](file://{{ attachment.path | replace(" ", "%20") }})
{% endfor %}

## Abstract

{% if abstractNote %}
{{ abstractNote }}
{% else %}
*(No abstract in Zotero.)*
{% endif %}

## Zotero notes

{% if markdownNotes %}
{{ markdownNotes }}
{% else %}
*(No item notes in Zotero.)*
{% endif %}

## Annotations

{% persist "annotations" %}
{% set newAnnotations = annotations | filterby("date", "dateafter", lastImportDate) %}
{% if newAnnotations.length > 0 %}
### Imported {{ importDate | format("YYYY-MM-DD HH:mm") }}

{% for annot in newAnnotations %}
{% if annot.annotatedText %}
> [!quote] {% if annot.pageLabel %}p. {{ annot.pageLabel }}{% endif %}
> {{ annot.annotatedText }}
{% endif %}
{% if annot.comment %}
> {{ annot.comment }}
{% endif %}
{% if annot.imageRelativePath %}
> ![[{{ annot.imageRelativePath }}]]
{% endif %}

{% endfor %}
{% endif %}
{% endpersist %}
