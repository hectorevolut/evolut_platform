# ADR-001 — Refoundation of Evolut Educational Framework

**Estado:** ACCEPTED
**Fecha:** 2026-07-05
**Supersedes:** (ninguna — primera ADR del proyecto)
**Superseded by:** (ninguna todavía)
**Afecta a:** ED-001_EDUCATIONAL_DATA_MODEL.md (v1.0 → v1.1, pendiente de ejecución), AD-001_REPOSITORY_ARCHITECTURE.md (v1.0 → v1.1, pendiente de ejecución), AR-000_ARCHITECTURE_BASELINE.md (v1.0 → v1.1, pendiente de ejecución)

## 1. Contexto

La arquitectura fundacional del proyecto (ED-001, AD-001, AR-000) se diseñó y aprobó en v1.0
bajo un único nombre de proyecto: "42 DAM Hybrid Core". Durante la revisión estratégica
posterior a esa baseline, el proyecto se reformuló en tres niveles de abstracción:

```
Evolut Platform
└── Evolut Educational Framework
    └── Programs
        └── Software Engineering Core
```

"Evolut Platform" pasa a nombrar la identidad organizativa bajo la que se desarrolla el
proyecto — únicamente un nombre, sin implicar todavía ninguna decisión de modelo de
negocio, comercialización o escalabilidad. "Evolut Educational Framework" es el motor
curricular reutilizable que ED-001 ya modelaba conceptualmente antes de tener nombre propio.
"Software Engineering Core" sustituye a "42 DAM Hybrid Core" como nombre de la primera
instancia de `Program`: inspirada en el Common Core de 42 y en el Grado Superior DAM, sin
depender institucionalmente de ninguno de los dos ni pretender replicarlos.

A esta reformulación de identidad se añade una dimensión metodológica nueva: el Framework
no se diseña primero para aprenderse después. Se diseña *mediante* el aprendizaje real de un
primer estudiante — el **Reference Learner**, hoy Héctor — cuya experiencia constituye la
principal fuente de validación del diseño educativo.

## 2. Decisión

Se adoptan formalmente los siguientes elementos como parte del contexto estratégico y
metodológico del proyecto:

- **Evolut Platform → Evolut Educational Framework → Programs → Software Engineering Core**
  como estructura de tres niveles. Los tres nombres son de trabajo, no branding definitivo.
- **Reference Learner**: concepto de gobierno y metodología, no una entidad del EDM. Es el
  primer estudiante que recorre completamente un Program mientras este se desarrolla, y cuya
  experiencia valida (o invalida) cada decisión de diseño educativo.
- **Learn by Building the Framework**: el Framework evoluciona mientras el Reference Learner
  recorre el Program. El desarrollo del Framework y el aprendizaje avanzan en paralelo; no se
  encadenan fases de gobierno o diseño sin práctica real intercalada.
- **Reality Before Complexity**: toda decisión arquitectónica debe resolver primero un
  problema real antes de introducir complejidad estructural. No prohíbe anticipar cuando el
  coste de esa anticipación es prácticamente nulo (p. ej. `programs/<id>/` como carpeta
  propia); sí prohíbe introducir abstracciones, capas o mecanismos complejos únicamente por
  una necesidad hipotética futura.
- **Ciclo Build → Learn → Validate → Improve → Repeat**: modelo operativo mediante el cual
  evoluciona el Framework. No es un eslogan — es el mecanismo continuo por el que cada
  dificultad real de aprendizaje retroalimenta el diseño.
- **Cliente inicial del Framework**: el propio Reference Learner. Mientras el Framework no
  demuestre aportar valor real a esa única persona, no se diseñará para usuarios
  hipotéticos ni se generalizará el modelo.
- **Validation Journal**: concepto metodológico aceptado (documentar dificultades reales de
  aprendizaje, mejoras detectadas, hipótesis, validaciones y observaciones como evidencia
  para mejorar el Framework). Se acepta el concepto; se difiere deliberadamente su
  representación física hasta que exista experiencia práctica suficiente del Reference
  Learner para decidirla con criterio, en aplicación estricta del Documentation First
  Principle. No se incorpora a AD-001 en esta ADR.
- **Frontera entre EV-001 y CON-001**: EV-001 (Evolut Manifesto) responde a "¿por qué existe
  Evolut Platform?" (propósito, misión, visión, principios, filosofía, identidad, Learn by
  Building, Reality Before Complexity, Reference Learner). CON-001 (Project Constitution)
  responde a "¿cómo se gobierna el proyecto?" (toma de decisiones, ADR, procesos,
  colaboración, versionado, revisión, calidad). Ninguno de los dos duplica contenido del otro.

## 3. Justificación técnica: por qué esta evolución NO modifica el EDM ni la Repository Architecture

Ninguna entidad de ED-001 (Program, Track, Stage, Module, Concept, Learning Unit, Competency,
Learning Outcome, Project, Assessment) cambia de definición, campos o relaciones. `Program`
ya se definía como "instancia concreta del motor curricular" — sustituir el nombre de su
primera instancia (de "42 DAM Hybrid Core" a "Software Engineering Core") es un cambio de
**dato** (el valor de una instancia), no de **esquema** (la definición de la entidad). Es el
equivalente a renombrar una fila de una tabla, no a alterar la tabla.

Ninguna regla de AD-001 cambia tampoco. El patrón `programs/<program_id>/program.md` ya
anticipaba múltiples instancias de Program antes de que existiera un segundo nombre real; solo
cambia el slug de ejemplo usado en el árbol propuesto, no la regla que lo genera.

Lo que cambia es una capa por encima de ambos documentos: identidad organizativa (Evolut
Platform), principios metodológicos (Learn by Building, Reality Before Complexity, ciclo
Build-Learn-Validate-Improve-Repeat) y un concepto de gobierno (Reference Learner, Validation
Journal). Esa capa responde a preguntas de propósito y proceso, no de estructura de datos ni
de representación física — motivo por el cual ED-001 y AD-001 solo requieren una actualización
terminológica de v1.0 a v1.1, no una revisión estructural a v2.0.

Esta ADR es, en sí misma, evidencia de que el **Stable IDs Principle** y el **Physical
Simplicity Principle** funcionan como se diseñaron: al no haber codificado nunca "42 DAM
Hybrid Core" dentro del esquema de ninguna entidad ni de ninguna regla física, un pivote
estratégico completo del proyecto se absorbe como un parche de terminología, no como una
reescritura.

## 4. Consecuencias

**Positivas:** la estructura de tres niveles aclara qué es organización, qué es motor
reutilizable y qué es una instancia formativa concreta. El ciclo Build-Learn-Validate-
Improve-Repeat convierte el diseño educativo en algo continuamente verificado por la práctica
real, en vez de una teoría que se recorre después de terminarla. Reality Before Complexity da
un criterio explícito y accionable para frenar sobre-ingeniería en decisiones futuras. Que
ED-001 y AD-001 solo necesiten v1.1 confirma, en la práctica, que el modelo era
suficientemente genérico desde el diseño original.

**Riesgos y costes aceptados:** se añade una capa de gobierno (EV-001 + CON-001) antes de que
exista contenido curricular real, lo cual retrasa ligeramente el inicio de la práctica; se
mitiga insertando Git init y el primer commit inmediatamente antes de que el Reference Learner
empiece, y no después de un ciclo largo adicional de documentación. Validation Journal queda
sin representación física por ahora, lo que exige disciplina informal para no perder
observaciones tempranas mientras se decide su forma definitiva. Los tres nombres (Evolut
Platform, Evolut Educational Framework, Software Engineering Core) siguen siendo
provisionales — existe el riesgo de un tercer ciclo de renombrado si no se estabilizan pronto.

## 5. Alternativas consideradas y descartadas

- **No formalizar este pivote como ADR**, dejándolo como contexto informal de conversación.
  Descartada: la propia AR-000 exige una ADR para cualquier modificación de ED-001/AD-001, y
  esta refundación es precisamente el tipo de cambio que esa regla anticipaba.
- **Tratar el cambio como revisión estructural (v2.0) de ED-001 y AD-001.** Descartada: no
  cambia ninguna entidad, relación, regla física ni principio ya aprobado; forzar un salto de
  versión mayor exageraría el alcance real del cambio.
- **Mantener "42 DAM Hybrid Core" como nombre del Program y usar "Evolut" solo como marca
  externa de la organización.** Descartada: el Reference Learner trabajará desde el inicio
  bajo el marco conceptual nuevo; mantener dos nombres en paralelo (uno interno, uno externo)
  introduciría la misma ambigüedad que esta ADR busca eliminar.

## 6. Referencias

- ED-001_EDUCATIONAL_DATA_MODEL.md (v1.0 → v1.1 pendiente de esta ADR)
- AD-001_REPOSITORY_ARCHITECTURE.md (v1.0 → v1.1 pendiente de esta ADR)
- AR-000_ARCHITECTURE_BASELINE.md (v1.0 → v1.1 pendiente de esta ADR)
- EV-001_EVOLUT_MANIFESTO.md (propuesta, pendiente de creación)
- CON-001_PROJECT_CONSTITUTION.md (pendiente de creación)
