# Git Flow

En este proyecto utilizaremos **Git** para versionar nuestro código y **Github** para alojarlo.

A continuación se detalla cómo se organizarán las ramas y cómo será el flujo de trabajo a lo largo del desarrollo.

## Esquema de Branching

Vamos a manejar tres tipos de ramas:

1. **Rama principal (main)**:

- Esta rama va a estar siempre limpia, solo va a contener implementaciones aprobadas por el equipo docente.

- **Nunca** vamos a realizar un push de forma directa a `main`.

- Solo se van a integrar cambios a main mediante un **Pull Request (PR)**, una vez que la entrega correspondiente haya sido aprobada.

2. **Ramas de entrega (ENTREGA_N)** `

- Para cada entrega, vamos a crear una rama nueva a partir de `main`, con el nombre `ENTREGA_N` (donde `N` es el número de entrega).

- Estas ramas van a contener todos los cambios de esa entrega en particular.

- Una vez que la entrega esté finalizada y aprobada, se hará un **PR** desde `ENTREGA_N` hacia `main`.

3. **Ramas de funcionalidades**

- Para trabajar de forma ordenada, vamos a crear una rama por cada funcionalidad nueva que se necesite implementar dentro de la entrega.

    - Estas ramas se crean a partir de la rama `ENTREGA_N`.

- La nomenclatura que deben seguir estas ramas será una breve descripción de la funcionalidad.

- Cuando se termine una funcionalidad, se hará un PR hacia la rama `ENTREGA_N`, asignando reviewers del equipo.

## Trabajo concurrente

Al manejar ramas separadas tanto por entrega como por funcionalidad, vamos a poder trabajar en paralelo de manera ordenada, sin pisarnos entre nosotros.

Cada vez que alguien termine una funcionalidad, deberá:

* Hacer un **PR** hacia la rama `ENTREGA_N`.

* Asignar al menos un reviewer del equipo.

* Esperar la revisión y aprobación antes de integrar el cambio.

De esta forma, garantizamos que todo el código pase por una revisión de pares, manteniendo la calidad y evitando errores antes de integrar los cambios.
