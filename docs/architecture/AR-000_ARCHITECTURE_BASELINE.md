# AR-000 — Architecture Baseline

**Estado:** APPROVED
**Versión:** v1.1
**Fecha:** 2026-07-05
**Naturaleza:** documento de gobierno arquitectónico. No define ni modifica ninguna
entidad educativa ni ninguna regla de representación física; registra que las
definiciones ya aprobadas quedan congeladas como primera línea base del proyecto.

## 1. Propósito

Este documento certifica el cierre de la Fase 0 — la Fundación — del proyecto, hoy
conocido como Evolut Educational Framework (Software Engineering Core, su primer
Program): el diseño de la arquitectura fundacional. A partir de esta baseline, el
proyecto deja de estar en fase de diseño arquitectónico abierto y entra en un régimen
de gobierno formal, en el que cualquier cambio sobre lo aquí congelado sigue un
procedimiento explícito en lugar de una edición libre.

## 2. Documentos que componen esta baseline

| Documento | Versión | Estado |
|---|---|---|
| `docs/architecture/ED-001_EDUCATIONAL_DATA_MODEL.md` | v1.1 | APPROVED |
| `docs/architecture/AD-001_REPOSITORY_ARCHITECTURE.md` | v1.1 | APPROVED |
| `docs/governance/EV-001_EVOLUT_MANIFESTO.md` | v1.0 | APPROVED |
| `docs/decisions/ADR-001_REFOUNDATION_OF_EVOLUT_EDUCATIONAL_FRAMEWORK.md` | — | ACCEPTED |

ED-001 define el modelo conceptual de las entidades educativas del proyecto (Program,
Track, Stage, Module, Concept, Learning Unit, Competency, Learning Outcome, Project,
Assessment) y sus relaciones. AD-001 define cómo ese modelo se representa físicamente
en el repositorio (carpetas, archivos, reglas de nombrado, referencias cruzadas), bajo
los principios de Physical Simplicity, Stable IDs y Documentation First. EV-001 define
por qué existe el proyecto, qué problema resuelve y bajo qué principios opera (Learn by
Building the Framework, Reality Before Complexity, el ciclo Build-Learn-Validate-
Capture Knowledge-Improve-Repeat). ADR-001 es la decisión que registra formalmente esta
evolución y ratifica que ED-001 v1.1 y AD-001 v1.1 no sufren cambio estructural alguno.

Juntos constituyen la **primera línea base arquitectónica del proyecto**, ahora ampliada
con su fundamento estratégico y metodológico: el punto de referencia estable sobre el
que se construirá todo el contenido educativo futuro.

## 3. Qué implica esta baseline

Desde este momento:

- Ninguna entidad educativa podrá crearse sin estar ya definida en ED-001 v1.1 y sin
  tener representación física en AD-001 v1.1 y plantilla en `docs/templates/`
  (Documentation First Principle, AD-001 §5).
- **Cualquier modificación de ED-001 requerirá una ADR** en `docs/decisions/` que
  justifique el cambio antes de tocar el documento.
- **Cualquier modificación de AD-001 requerirá una ADR** en `docs/decisions/` que
  justifique el cambio antes de tocar el documento.
- **Cualquier modificación de EV-001 requerirá igualmente una ADR**, por la misma razón:
  el propósito, principios y filosofía del proyecto no se editan libremente una vez
  ratificados en esta baseline.
- Toda nueva versión de ED-001, AD-001 o EV-001 deberá mantener **trazabilidad completa
  respecto a la versión anterior**: qué cambió, por qué (referenciando la ADR
  correspondiente) y qué compatibilidad se conserva o se rompe. Esto se registra en la
  sección "Control de versiones" de cada documento.
- Esta baseline no resuelve las decisiones pendientes ya registradas en ED-001 §9 y
  AD-001 §13. Quedan abiertas deliberadamente; su resolución futura, si implica cambio
  estructural, seguirá también el procedimiento de ADR descrito aquí.
- La representación física de Lessons Learned (EV-001 §7) queda explícitamente fuera de
  esta baseline hasta que exista experiencia práctica suficiente del Reference Learner.

## 4. Qué NO certifica esta baseline

Esta baseline no valida contenido curricular, porque no existe todavía: no hay Tracks,
Modules, Concepts, Competencies, Projects ni Assessments creados. Tampoco inicializa
Git, ni crea `docs/governance/CON-001_PROJECT_CONSTITUTION.md`, ni ninguna plantilla en
`docs/templates/`. AR-000 congela el modelo y su representación física, no el trabajo
que se construirá sobre ellos.

## 5. Próximo paso

Con la arquitectura fundacional cerrada, el siguiente documento a redactar es:

`docs/governance/CON-001_PROJECT_CONSTITUTION.md`

Primer documento de gobierno del proyecto: definirá cómo se toman decisiones futuras,
cómo participan Héctor, Claude y ChatGPT en pie de igualdad técnica, y cómo se
gestionan las ADR que esta baseline empieza a exigir.

## 6. Control de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-07-05 | Creación del documento. Certifica ED-001 v1.0 y AD-001 v1.0 como primera baseline arquitectónica del proyecto. |
| v1.1 | 2026-07-05 | Evolución de la baseline, no reescritura: incorpora oficialmente ADR-001_REFOUNDATION_OF_EVOLUT_EDUCATIONAL_FRAMEWORK.md y EV-001_EVOLUT_MANIFESTO.md v1.0. Refleja la promoción de ED-001 y AD-001 a v1.1 (adaptación terminológica, sin cambio estructural). El registro v1.0 anterior se conserva íntegro como hecho histórico. |
