# AD-001 — Repository Architecture

**Estado:** APPROVED — Baseline v1.1 (ver AR-000_ARCHITECTURE_BASELINE.md)
**Versión:** v1.1
**Fecha:** 2026-07-05
**Depende de:** ED-001_EDUCATIONAL_DATA_MODEL.md (no lo modifica, lo materializa) y
EV-001_EVOLUT_MANIFESTO.md (contexto estratégico: por qué existe el Framework que esta
arquitectura representa físicamente)

## 1. Propósito

ED-001 define el modelo conceptual de las entidades educativas. AD-001 define cómo esas
entidades, y el gobierno documental del propio proyecto, se representan físicamente en
carpetas y archivos del repositorio. Toda regla aquí definida existe para preservar, en
el sistema de archivos, las restricciones que ED-001 ya impuso a nivel conceptual
(Project solo depende de Competency, Learning Unit no se duplica, Assessment desacoplado
de Project, etc.), sin sobre-construir la estructura física más allá de lo necesario.

## 2. Principios de arquitectura

1. **El id, no el path, es la referencia canónica.** Toda relación entre entidades se
   expresa mediante un `id` declarado en el frontmatter del archivo, nunca mediante ruta
   relativa. Permite reorganizar carpetas sin romper relaciones.
2. **Una carpeta por instancia, solo en la cadena jerárquica con hijos reales.** Track,
   Stage, Module, Concept siguen 1:1 la jerarquía curricular de ED-001, porque cada uno
   contiene entidades hijas y crece con los años.
3. **Las entidades puente e independientes viven en registros planos de nivel superior,
   nunca anidadas dentro de un Track.** Competency, Project y Assessment no pertenecen a
   ningún Track — físicamente no hay ruta que los una a un Module, solo un id.
4. **Ninguna carpeta representa una entidad no definida en ED-001.**
5. **Duplicación cero.** El contenido de una Learning Unit vive en un único archivo;
   toda reutilización es una referencia por id.
6. **La gobernanza documental del proyecto (decisiones, estándares, investigación,
   plantillas) es independiente de la arquitectura educativa**, porque no todas las
   decisiones futuras serán arquitectónicas — también las habrá pedagógicas,
   metodológicas, curriculares y organizativas. Por eso viven como hermanas de
   `architecture/` dentro de `docs/`, no dentro de ella.
7. **Git registra el cuándo; las ADR registran el porqué.** No se mantiene un tercer
   sistema de logs manuales paralelo a ambos. La trazabilidad temporal del repositorio
   queda cubierta por el historial de commits una vez se inicialice Git; la
   trazabilidad de intención queda cubierta por `docs/decisions/`.

## 3. Physical Simplicity Principle

**Enunciado:** la estructura física del repositorio debe ser siempre más simple que el
modelo conceptual que representa. Una entidad del EDM no necesita automáticamente su
propia carpeta; necesita la representación física mínima que baste para no perder
información ni trazabilidad.

**Consecuencia aplicada en este documento:**

- Track, Stage, Module, Concept → **carpeta propia**, porque tienen hijos estructurales reales y se espera que crezcan durante años.
- Learning Unit → **archivo propio** (hoja terminal, sin hijos), dentro de la carpeta de su Concept.
- Competency → **archivo plano**, sin carpeta: es un documento pequeño, sin hijos que justifiquen anidación.
- Learning Outcome → **entrada con id propio dentro del archivo de su Competency** (ver Stable IDs Principle), ni carpeta ni archivo independiente: no existe sin su Competency. Si en el futuro crece demasiado, se promueve a archivo propio — decisión reversible, no estructural.
- Assessment → **archivo plano**, sin carpeta, por la misma razón que Competency.
- Project → mantiene **carpeta propia**: a diferencia de Competency/Assessment, un Project tiende a acumular artefactos reales (enunciado, recursos, checklist de evaluación) además del documento de definición, por lo que anticipar una carpeta es aplicación coherente del principio, no una excepción.
- Program → **carpeta propia**, como excepción deliberada: no por complejidad hoy, sino para no tener que rediseñar la arquitectura si aparece un segundo Program en el futuro.

## 4. Stable IDs Principle

**Enunciado:** un identificador nunca depende del nombre del archivo, del título del
documento ni de su ubicación física dentro del repositorio.

**Consecuencia:** los archivos y carpetas pueden renombrarse o reorganizarse sin romper
ninguna relación entre entidades, porque ninguna referencia se basa en path, título ni
anclas de Markdown. Esto se aplica de forma estricta también a Learning Outcome: en
lugar de referenciarse mediante un ancla (`COMP-001#LO-01`), cada Learning Outcome
declara su propio `id` estable dentro del frontmatter de la Competency que lo contiene:

```yaml
id: COMP-001
statement: "..."
learning_outcomes:
  - id: LO-001
    statement: "..."
    evaluation_criteria: ["..."]
  - id: LO-002
    statement: "..."
    evaluation_criteria: ["..."]
```

Un Assessment referencia `LO-001` directamente (`evaluates_learning_outcomes: [LO-001]`),
nunca `COMP-001#LO-01`. La resolución de en qué archivo vive `LO-001` es responsabilidad
de una futura herramienta de indexado (ver Decisiones pendientes), no de la referencia
en sí — la referencia debe seguir siendo válida aunque `LO-001` se mueva de archivo.

## 5. Documentation First Principle

**Enunciado:** antes de crear una nueva entidad educativa deben existir previamente:

1. su definición en ED-001,
2. su representación física en AD-001,
3. su plantilla correspondiente en `docs/templates/`.

**Consecuencia:** no se crean entidades "especiales" fuera del modelo. Si en el futuro
hace falta una entidad que hoy no existe (por ejemplo, la entidad de sincronización
entre Tracks paralelos que ED-001 §9 deja pendiente), el orden de trabajo es siempre
ED-001 → AD-001 → plantilla → primera instancia. Nunca al revés.

## 6. Árbol propuesto

```
42 DAM Hybrid Core/                                  # nombre físico actual de la carpeta en disco;
                                                       # no coincide con "Software Engineering Core"
                                                       # (el Program) ni con "Evolut Educational
                                                       # Framework" (el motor) — decisión deliberada,
                                                       # ver ADR-001 y AD-001 §14. No se renombra todavía.
├── docs/
│   ├── architecture/
│   │   ├── ED-001_EDUCATIONAL_DATA_MODEL.md
│   │   ├── AD-001_REPOSITORY_ARCHITECTURE.md
│   │   └── AR-000_ARCHITECTURE_BASELINE.md
│   ├── decisions/
│   │   └── ADR-XXX_<slug>.md
│   ├── governance/
│   │   └── CON-001_PROJECT_CONSTITUTION.md      # próximo documento fundacional, no creado aún
│   ├── standards/                                 # conceptual, sin contenido todavía
│   ├── templates/                                 # conceptual, sin contenido todavía
│   │   ├── track.template.md
│   │   ├── stage.template.md
│   │   ├── module.template.md
│   │   ├── concept.template.md
│   │   ├── learning_unit.template.md
│   │   ├── competency.template.md
│   │   ├── project.template.md
│   │   ├── assessment.template.md
│   │   └── adr.template.md
│   └── research/                                  # conceptual, sin contenido todavía
├── programs/
│   └── software_engineering_core/
│       └── program.md
├── tracks/
│   └── <track_id>/
│       ├── track.md
│       └── stages/
│           └── <stage_id>/
│               ├── stage.md
│               └── modules/
│                   └── <module_id>/
│                       ├── module.md
│                       └── concepts/
│                           └── <concept_id>/
│                               ├── concept.md
│                               └── learning_units/
│                                   └── <lu_id>.md
├── competencies/
│   └── COMP-001_<slug>.md                         # incluye Learning Outcomes con id propio
├── projects/
│   └── <project_id>/
│       └── project.md
└── assessments/
    └── ASM-001_<slug>.md
```

`.claude/` no forma parte de este diseño y no se toca. No existe `docs/architecture/logs/`
ni ninguna otra carpeta de logs manuales: ver principio 7.

## 7. Justificación de cada carpeta

- `docs/architecture/` — documentos fundacionales del modelo, de su representación física y del gobierno de ambos (ED-001, AD-001, AR-000).
- `docs/decisions/` — ADRs de cualquier naturaleza (no solo arquitectónicas), separado de `architecture/` porque las decisiones futuras serán también pedagógicas y organizativas.
- `docs/governance/` — documentos de gobierno del proyecto en sí (empezando por CON-001): rigen *cómo* se decide, no cada decisión individual.
- `docs/standards/` — normas transversales (nomenclatura, Markdown, frontmatter, estilo, diagramas ASCII, referencias cruzadas, versionado) que aplican a todo el repositorio.
- `docs/templates/` — un esqueleto por tipo de entidad, exigido por el Documentation First Principle antes de crear cualquier instancia.
- `docs/research/` — investigaciones de apoyo (Common Core original, DAM, Java como sustituto de C++, metodologías, herramientas) que informan decisiones sin ser parte del currículo ni de la arquitectura.
- `programs/` — permite múltiples Programs futuros sin rediseño; hoy solo contiene `software_engineering_core/`, el primer Program de Evolut Educational Framework (ver EV-001).
- `tracks/` — eje curricular completo (Track→Stage→Module→Concept→Learning Unit) en una jerarquía navegable.
- `competencies/` — registro plano fuera de cualquier track, para que una Competency pueda ser compartida por C y Java sin pertenecer físicamente a ninguno.
- `projects/` — registro plano sin relación de carpeta con `tracks/`; solo referencia Competencies por id.
- `assessments/` — registro plano, referencia Competencies/Learning Outcomes por id; nunca vive dentro de `projects/`.

## 8. Mapeo entidad EDM → ubicación física

| Entidad EDM | Ubicación física |
|---|---|
| Program | `programs/<program_id>/program.md` |
| Track | `tracks/<track_id>/track.md` |
| Stage | `tracks/<track_id>/stages/<stage_id>/stage.md` |
| Module | `.../stages/<stage_id>/modules/<module_id>/module.md` |
| Concept | `.../modules/<module_id>/concepts/<concept_id>/concept.md` |
| Learning Unit | `.../concepts/<concept_id>/learning_units/<lu_id>.md` |
| Competency | `competencies/COMP-XXX_<slug>.md` |
| Learning Outcome | entrada con `id` propio dentro de `learning_outcomes[]` en el archivo de su Competency (no archivo ni ancla independiente) |
| Project | `projects/<project_id>/project.md` |
| Assessment | `assessments/ASM-XXX_<slug>.md` |
| Decisions *(no-EDM, gobierno)* | `docs/decisions/ADR-XXX_<slug>.md` |
| Templates *(no-EDM, soporte)* | `docs/templates/<entity>.template.md` |

## 9. Reglas de nombrado

- Carpetas y archivos en `snake_case` o `kebab-case`, en minúsculas, descriptivos para navegación humana.
- Los archivos principales de la cadena jerárquica usan nombre de tipo homogéneo en minúsculas: `program.md`, `track.md`, `stage.md`, `module.md`, `concept.md`, `project.md` (ver sección 12 para la justificación frente a la alternativa `index.md`).
- Prefijos de id por tipo: `PROG-`, `TRK-`, `STG-`, `MOD-`, `CPT-`, `LU-`, `COMP-`, `LO-`, `PRJ-`, `ASM-`, `ADR-`.
- Los ids son únicos en todo el repositorio, independientemente del tipo.
- Los ids son inmutables y no dependen de nombre de archivo, título ni ubicación (Stable IDs Principle): no se reutilizan ni cambian aunque el archivo se renombre o se mueva.
- El campo `id` es siempre el primero del frontmatter de cualquier archivo de entidad.

## 10. Reglas de referencias cruzadas

- Toda relación se expresa por `id` en frontmatter, nunca por ruta relativa ni ancla de Markdown.
- `Module.competencies_developed: [COMP-...]` — nunca al revés.
- `Project.prerequisite_competencies` / `demonstrated_competencies: [COMP-...]` — un Project nunca declara `module_id`, `stage_id` ni `track_id`.
- `Assessment.evaluates_competencies` / `evaluates_learning_outcomes: [COMP-..., LO-...]` — un Assessment nunca declara `project_id`, y nunca referencia un Learning Outcome mediante ancla.
- `Learning Unit.references: [LU-...]` — reutilización sin duplicar contenido.
- `Concept.prerequisite_concepts` puede apuntar a un `CPT-` de otro track, por id.

## 11. Riesgos evitados

Reorganizar o renombrar carpetas y archivos no rompe relaciones, porque usan id, no path ni ancla (Stable IDs Principle). Sustituir un módulo C++ del Common Core original por su equivalente Java no obliga a tocar ningún Project. Ninguna Competency queda "propiedad" de una tecnología concreta. La prohibición de duplicar Learning Units evita contenido divergente. Assessments desacoplados de Projects evitan recrear evaluaciones para cada proyecto que reutiliza un criterio. Aplanar Competency, Learning Outcome y Assessment evita el sobrecoste de mantenimiento de carpetas anidadas para documentos pequeños. Mantener un único sistema de trazabilidad temporal (Git) y uno de trazabilidad de intención (ADR) evita la inconsistencia de tener tres fuentes de verdad distintas sobre "qué cambió y por qué". El Documentation First Principle evita la aparición de entidades "especiales" no gobernadas por el modelo.

## 12. Recomendación: `track.md` frente a `index.md`

Se recomienda **mantener nombres de tipo homogéneos en minúsculas** (`track.md`,
`stage.md`, `module.md`, `concept.md`, `project.md`, `program.md`) en lugar de
`index.md`, por dos razones concretas:

1. **Filtrado por tipo mediante glob.** Con nombre de tipo, una herramienta futura de
   validación o generación puede seleccionar solo los Modules del repositorio con
   `**/module.md`, o solo los Concepts con `**/concept.md`, sin necesidad de abrir cada
   archivo para leer un campo `type` en el frontmatter. Con `index.md`, todo archivo se
   llama igual independientemente de su tipo, y esa selección por glob deja de ser
   posible.
2. **Reconocibilidad inmediata sin contexto de ruta.** Al abrir un archivo desde una
   búsqueda o desde resultados de grep, `module.md` identifica el tipo de entidad de
   forma autónoma; `index.md` obliga a mirar la ruta completa (o el breadcrumb del
   editor) para saber qué representa, y con muchas pestañas abiertas del mismo nombre
   `index.md` en un editor, la navegación se vuelve más confusa, no menos.

La convención `index.md` es más habitual en generadores de sitios estáticos (Hugo,
Docusaurus, MkDocs), donde el objetivo es que una carpeta se renderice como página de
índice al navegar por URL. Este repositorio no es un sitio web: es un modelo de datos
educativo con entidades de distinto esquema, pensado para ser procesado por scripts de
validación con el tiempo. Esa diferencia de propósito es la que inclina la balanza hacia
el nombre de tipo.

## 13. Decisiones pendientes

- Contenido inicial de `docs/standards/` y `docs/research/`: se crean vacías conceptualmente en esta fase; su primer contenido real es una decisión posterior, no de AD-001.
- Mecanismo de resolución de `id` a archivo (por ejemplo, en qué archivo vive `LO-001` o `COMP-047`): hoy se resuelve por búsqueda manual; a medida que crezca el repositorio hará falta un índice o script de resolución. No se diseña en esta fase.
- Sincronización entre Tracks paralelos (pendiente desde ED-001 §9): sigue sin resolverse dónde vivirá formalmente — candidato principal ahora es tratarlo dentro de CON-001 o de un futuro ADR, no de una carpeta `docs/` nueva.
- Formato exacto del contenido de los templates en `docs/templates/`: si incluyen ya el frontmatter completo de ED-001 o un esqueleto mínimo ampliable.

## 14. Recomendación sobre Git

Git se inicializa después de aprobar los cuatro documentos fundacionales, en este orden:
ED-001 (aprobado, v1.1), AD-001 (aprobado, v1.1), EV-001 (aprobado, v1.0) y CON-001 —
Project Constitution (pendiente). El primer commit debe representar una base
arquitectónica y de gobierno completa, y ocurrir inmediatamente antes de que el
Reference Learner comience el primer ciclo real de Software Engineering Core — no meses
después (ver EV-001 §4, Learn by Building the Framework).

## 15. Próximo documento fundacional

El siguiente documento a proponer es:

`docs/governance/CON-001_PROJECT_CONSTITUTION.md`

Definirá exclusivamente cómo se gobierna el proyecto (toma de decisiones, uso de ADR,
proceso de revisión, colaboración entre Héctor/Claude/ChatGPT) — no repetirá propósito,
misión, visión, principios ni filosofía, que ya viven en EV-001.

## 16. Control de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-07-05 | Primera versión creada y aprobada directamente como baseline (ver AR-000). Las iteraciones previas de esta propuesta se discutieron en conversación pero nunca se persistieron como archivo en el repositorio. |
| v1.1 | 2026-07-05 | Adaptación terminológica derivada de ADR-001_REFOUNDATION_OF_EVOLUT_EDUCATIONAL_FRAMEWORK.md: slug de ejemplo `42_dam_hybrid_core` → `software_engineering_core`; referencia añadida a EV-001; recomendación de Git actualizada. Ninguna carpeta, principio ni regla física se modifica. |
