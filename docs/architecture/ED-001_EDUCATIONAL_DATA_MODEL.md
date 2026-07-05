# ED-001 — Educational Data Model (EDM)

**Estado:** APPROVED — Baseline v1.1 (ver AR-000_ARCHITECTURE_BASELINE.md)
**Versión:** v1.1
**Fecha:** 2026-07-05
**Fuente de verdad de:** arquitectura educativa de Evolut Educational Framework (ver EV-001_EVOLUT_MANIFESTO.md)

## 1. Propósito

Este documento define el modelo conceptual de datos sobre el que se construye todo el
contenido educativo del repositorio. Cumple, para las entidades educativas, la misma
función que un modelo de datos cumple para una aplicación software: ninguna entidad
educativa (Track, Module, Project, Competency, etc.) puede utilizarse en ningún otro
documento del repositorio sin estar definida aquí primero.

Importante: este documento **no modela un itinerario educativo concreto**. Modela un
**motor curricular reutilizable**: Evolut Educational Framework (ver EV-001_EVOLUT_MANIFESTO.md
para su propósito y principios). "Software Engineering Core" es su primer `Program` — una
instancia concreta, no el motor en sí. El mismo conjunto de entidades (Track, Stage, Module,
Concept, Learning Unit, Competency, Learning Outcome, Project, Assessment) debe poder usarse
en el futuro para generar otros programas formativos distintos, sin cambiar el modelo.

## 2. Entidades principales

Program, Track, Stage, Module, Concept, Learning Unit, Competency, Learning Outcome,
Project, Assessment.

Dos ejes independientes que **no deben fusionarse**:

- **Eje curricular** (qué se enseña, en qué orden): Program → Track → Stage → Module → Concept → Learning Unit.
- **Eje práctico** (qué se construye): Project.
- **Puente entre ambos ejes:** Competency.
- **Eje de evaluación** (cómo se verifica, desacoplado tanto del currículo como de la práctica): Assessment, sobre Competency y Learning Outcome.

## 3. Definición de cada entidad

### Program
Instancia concreta del motor curricular (p. ej. "Software Engineering Core", el primer
Program de Evolut Educational Framework). Organiza Tracks. Es la entidad que permite, en
el futuro, tener más de un programa formativo reutilizando el mismo modelo.
**Campos mínimos:** `id`, `name`, `description`, `version`, `status` (draft/active/archived), `tracks[]`.

### Track
Hilo de disciplina que avanza en paralelo con otros (C, Java, Linux, Git, HTML/CSS, SQL...).
Pertenece a un Program. Evoluciona mediante Stages propios.
**Campos mínimos:** `id`, `program_id`, `name`, `nature` (procedural, OOP, sistemas, markup, datos...), `status`.

### Stage
Paso de evolución **dentro de un único Track** (no agrupa varios tracks). Contiene los
Modules correspondientes a ese punto de progresión del track.
**Campos mínimos:** `id`, `track_id`, `order`, `name`, `entry_criteria`, `exit_criteria`.

### Module
Bloque curricular contenido en un Stage. Contiene Concepts. Desarrolla Competencies.
El `track_id` no se duplica aquí: se deriva transitivamente vía `stage_id → track_id`,
para evitar referencias redundantes que puedan desincronizarse.
**Campos mínimos:** `id`, `stage_id`, `name`, `description`, `concepts[]`, `competencies_developed[]`, `prerequisite_modules[]`.

### Concept
Idea o tema único dentro de un Module (p. ej. "Punteros"). Se desarrolla mediante una o
varias Learning Units. Puede declarar prerrequisitos hacia Concepts de **otro Track**,
lo cual es el mecanismo formal para comparar paradigmas (p. ej. Concept "Herencia" en
Java referenciando Concept "Composición de structs" en C).
**Campos mínimos:** `id`, `module_id`, `name`, `summary`, `learning_units[]`, `prerequisite_concepts[]` (pueden ser cross-track).

### Learning Unit
Unidad pedagógica atómica: enseña **un único concepto** mediante teoría, analogías,
ejemplos, contraejemplos y ejercicios de razonamiento. Pertenece exclusivamente a un
Concept. No puede duplicarse: si el contenido se reutiliza en otro lugar, se hace
mediante referencia (`references[]`), nunca copiando el contenido.
**Campos mínimos:** `id`, `concept_id`, `title`, `theory`, `analogies`, `examples`, `counterexamples`, `reasoning_exercises`, `references[]`.

### Competency
Capacidad demostrable ("es capaz de..."), independiente de cualquier tecnología concreta.
Es el **puente entre currículo y práctica**: la desarrollan Modules y la demuestran
Projects. Puede tener una o varias Learning Outcomes. Puede incluir referencias
opcionales de trazabilidad hacia el Common Core original o hacia DAM, pero esas
referencias son metadatos informativos y **no forman parte de la definición** de la
competencia.
**Campos mínimos:** `id`, `statement`, `category`, `learning_outcomes[]`, `traceability` (opcional: `{common_core_ref, dam_ref}`, informativo, no estructural).

### Learning Outcome
Enunciado medible/observable de una Competency, con sus criterios de evaluación
concretos (equivalente conceptual al "resultado de aprendizaje" + "criterios de
evaluación" de un módulo profesional DAM, pero desacoplado de esa fuente).
**Campos mínimos:** `id`, `competency_id`, `statement`, `evaluation_criteria[]`.

### Project
Artefacto de aprendizaje práctico, inspirado en el modelo de proyectos de 42. Depende
**únicamente de Competencies** (nunca de Modules ni de Stages directamente): tanto las
que requiere como prerrequisito como las que demuestra al completarse. Puede atravesar
varios Stages sin restricción — no está obligado a finalizar dentro de uno solo, y de
hecho no referencia Stage en absoluto.
**Campos mínimos:** `id`, `name`, `type` (individual/equipo, mono/integrador), `prerequisite_competencies[]`, `demonstrated_competencies[]`, `deliverable_description`.

### Assessment
Mecanismo que verifica Competencies y Learning Outcomes. Nunca evalúa Learning Units
directamente. Deliberadamente **no está acoplado a Project**: la evaluación es un eje
independiente de la práctica, para poder reutilizar el mismo criterio de evaluación en
distintos proyectos que demuestren la misma competencia.
**Campos mínimos:** `id`, `evaluates_competencies[]`, `evaluates_learning_outcomes[]`, `type` (peer-review, rúbrica, tests automáticos, defensa oral), `pass_criteria`.

## 4. Relación entre entidades

| Origen | Relación | Destino |
|---|---|---|
| Program | organiza | Track |
| Track | evoluciona mediante | Stage |
| Stage | contiene | Module |
| Module | contiene | Concept |
| Concept | desarrolla | Learning Unit (1..N) |
| Module | desarrolla | Competency |
| Project | demuestra | Competency |
| Project | requiere (prerrequisito) | Competency |
| Competency | puede tener | Learning Outcome (1..N) |
| Assessment | verifica | Learning Outcome |
| Assessment | verifica | Competency |

Qué entidad organiza qué: el **eje curricular** (Program→Track→Stage→Module→Concept→
Learning Unit) organiza el currículo. El **Project** organiza el aprendizaje práctico.
**Competency** es el único puente entre ambos ejes. **Assessment** es un tercer eje,
de verificación, que cuelga de Competency/Learning Outcome, no de Project ni de Module.

## 5. Diagrama del modelo

```
EJE CURRICULAR                                   EJE PRÁCTICO
(qué se enseña, en qué orden)                    (qué se construye)

┌───────────┐
│  Program  │  instancia del motor curricular
└─────┬─────┘
      │ organiza
      ▼
┌───────────┐
│   Track   │  C · Java · Linux · Git · HTML/CSS · SQL ...
└─────┬─────┘
      │ evoluciona mediante (propio del track)
      ▼
┌───────────┐
│   Stage   │
└─────┬─────┘
      │ contiene
      ▼
┌───────────┐
│  Module   │
└─────┬─────┘
      │ contiene            │ desarrolla
      ▼                     ▼
┌───────────┐        ┌─────────────┐        ┌───────────┐
│  Concept  │        │ Competency  │◀──────│  Project  │
└─────┬─────┘        │ (puente     │demuestra│(atraviesa │
      │ desarrolla   │ currículo↔  │        │ N stages, │
      ▼              │ práctica,   │───────▶│ depende   │
┌────────────────┐   │ agnóstica de│requiere │ solo de   │
│ Learning Unit  │   │ tecnología) │(prereq.)│Competency)│
│ (teoría +      │   └──────┬──────┘        └───────────┘
│  analogías +   │          │ puede tener
│  ejemplos +    │          ▼
│  contraejemplos│  ┌────────────────┐
│  + ejercicios) │  │ Learning Outcome│
└────────────────┘  └────────┬────────┘
                              │
                    EJE DE EVALUACIÓN (desacoplado)
                              │ verifica
                              ▼
                     ┌───────────────┐
                     │  Assessment   │
                     │ (nunca evalúa │
                     │ Learning Unit,│
                     │ nunca acoplado│
                     │ a Project)    │
                     └───────────────┘
```

## 6. Reglas del Educational Data Model

- Ninguna entidad educativa podrá utilizarse en el repositorio sin estar previamente definida en el EDM.
- Ningún documento podrá redefinir una entidad ya existente; toda ampliación se hace referenciando este documento.
- Toda modificación estructural del modelo requerirá una nueva versión de ED-001 (registrada en el control de versiones, sección 8), respaldada por una ADR en `docs/decisions/`, según lo establecido en AR-000_ARCHITECTURE_BASELINE.md.
- El EDM constituye la fuente de verdad de la arquitectura educativa del proyecto.
- Ninguna Learning Unit podrá duplicarse; toda reutilización de contenido se hace mediante referencia explícita, nunca copiando texto.
- Ningún Project podrá depender directamente de un Module, Stage o Track; solo de Competencies.
- Ningún Assessment podrá acoplarse directamente a un Project; solo a Competencies y Learning Outcomes.
- Ninguna Competency podrá incluir una tecnología concreta en su `statement`; las referencias a Common Core/DAM son metadatos de trazabilidad, no parte de la definición.

## 7. Riesgos que evita este modelo

Evita que sustituir un módulo del Common Core original (C++) por su equivalente en Java obligue a tocar Competencies o Projects, porque estos no dependen de Modules. Evita perder trazabilidad si cambian los criterios de evaluación con los años, porque Assessment está desacoplado de Project. Evita contenido duplicado y divergente entre tracks, porque Learning Unit prohíbe la duplicación y obliga a referenciar. Evita acoplar el modelo a un único itinerario, porque Program es una instancia reemplazable del mismo motor.

## 8. Control de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| v0.1 | 2026-07-05 | Propuesta inicial, pendiente de validación arquitectónica global |
| v1.0 | 2026-07-05 | Aprobado como primera baseline arquitectónica del proyecto (ver AR-000). Sin cambios estructurales respecto a v0.1: promoción de estado, no revisión de contenido. |
| v1.1 | 2026-07-05 | Adaptación terminológica derivada de ADR-001_REFOUNDATION_OF_EVOLUT_EDUCATIONAL_FRAMEWORK.md: "42 DAM Hybrid Core" pasa a ser "Software Engineering Core", primer Program de Evolut Educational Framework. Referencia añadida a EV-001. Ninguna entidad, campo ni relación del EDM se modifica. |

## 9. Decisiones pendientes

- **Sincronización entre Tracks paralelos:** si Stage pertenece en exclusiva a un Track, ¿qué mecanismo (si alguno) garantiza que, por ejemplo, el Stage 2 de C y el Stage 2 de Java se cursen en una ventana comparable, tal como exige el aprendizaje paralelo? ¿Se resuelve solo con documentación de calibración (fuera del EDM), o hace falta una entidad futura de sincronización (p. ej. un "Milestone" cross-track)? No la incorporo ahora — la dejo como candidata a evaluar, no como entidad aprobada. **Nota:** este punto se tratará más adelante en un documento independiente o mediante una futura entidad de coordinación; no bloquea la creación inicial del EDM ni su aprobación en v0.1.
- **Formato de `traceability`** en Competency: ¿referencia libre en texto, o catálogo controlado con un documento de equivalencias Common Core ↔ DAM ↔ Competency?
- **Granularidad de `evaluation_criteria`** en Learning Outcome: ¿deben alinearse 1:1 con los criterios de evaluación oficiales de DAM cuando exista equivalencia directa, o redactarse siempre de forma independiente?
- **Esquema de versionado de ED-001:** ¿semver (v1.0, v1.1...) o versionado por fecha? Afecta a cómo se registra cada cambio estructural futuro.
