{% macro boxColorName(color, name) %}

  <li class="w-full aspect-square rounded-bee-xs flex items-center justify-center {{ color }}">
    {{ name | capitalize }}
  </li>
{% endmacro %}

{% macro boxColor(color) %}

  <li class="w-full aspect-square rounded-bee-xs {{ color }}">
    <span class="sr-only"> {{ color }} </span>
  </li>
{% endmacro %}

### Layout

<ul class="grid grid-cols-3 font-semibold gap-1 max-w-[19rem] !-mb-12 !list-none !ml-0">
  {{ boxColorName('bg-backdrop text-main border border-divider', 'backdrop') }}
  {{ boxColorName('bg-foreground text-main', 'foreground') }}
  {{ boxColorName('bg-neutral-200 text-main', 'divider') }}
</ul>

### Text content

<ul class="grid grid-cols-2 max-w-56 font-semibold gap-1 !-mb-12 !list-none !ml-0">
  {{ boxColorName('bg-neutral-900 text-neutral-50', 'main') }}
  {{ boxColorName('bg-neutral-700 text-neutral-50', 'secondary') }}
</ul>

{% for colorName in NgDocPage.data.colors %}

### {{ colorName | capitalize }}

  <ul class="grid grid-cols-5 md:grid-cols-10 gap-1 !-mb-12 !list-none !ml-0">
    {% for color in NgDocPage.data[colorName] %}
      {{ boxColor(color) }}
    {% endfor %}
  </ul>
{% endfor %}
