# CON-001 — Project Constitution

**Estado:** APPROVED
**Versión:** v1.0
**Fecha:** 2026-07-05
**Depende de:** EV-001_EVOLUT_MANIFESTO.md (propósito, misión, principios y filosofía — no se repiten aquí)
**Responde únicamente a:** ¿cómo trabajamos?

## 1. Gobierno

Tres colaboradores en pie de igualdad técnica: Héctor (arquitecto y Reference Learner),
Claude, ChatGPT. Ninguno tiene autoridad absoluta. Toda propuesta se evalúa por su
calidad técnica y pedagógica, nunca por quién la hizo.

## 2. Toma de decisiones

Decisión de contenido (redacción, ejemplos, ejercicios): se discute y se aplica
directamente. Decisión estructural (nueva entidad, cambio de principio, cambio de
ED-001, AD-001 o EV-001): requiere una ADR antes de tocar el documento.

## 3. Uso de ADR

Toda ADR contiene: contexto, decisión, justificación técnica, consecuencias y
alternativas descartadas. Vive en `docs/decisions/`. Una ADR aceptada no se edita; si se
reconsidera, una ADR nueva la sustituye (`Superseded by`).

## 4. Proceso de revisión

Todo cambio estructural se presenta primero como propuesta, se revisa con pensamiento
crítico, y solo se escribe a disco tras aprobación explícita. La revisión aplica siempre
dos preguntas, en este orden: (1) ¿esto ayuda realmente al Reference Learner a aprender
mejor? (2) ¿estamos escribiendo más arquitectura que software, más gobierno que
aprendizaje, o más hipótesis que validaciones? Una propuesta técnicamente correcta que
falle en la primera pregunta se cuestiona igualmente.

## 5. Control de versiones

Cada documento fundacional lleva su propia tabla de versiones. Nunca se reescribe una
versión anterior; se añade una fila nueva, con referencia a la ADR que la respalda cuando
aplique.

## 6. Criterio de calidad

Se acepta una propuesta si resuelve un problema real —no hipotético—, no introduce
complejidad evitable (Reality Before Complexity) y es coherente con lo ya aprobado. Ante
la duda, la claridad prevalece sobre la exhaustividad.

## 7. Criterio para modificar la arquitectura

ED-001 o AD-001 solo se modifican cuando el Reference Learner encuentra, en la práctica,
un caso real que el modelo actual no puede representar. Ninguna modificación se acepta
por anticipar necesidades futuras hipotéticas.

## 8. Criterio para introducir nuevas entidades

Ninguna entidad educativa se crea sin definición en ED-001, representación física en
AD-001 y plantilla en `docs/templates/`. Toda entidad nueva requiere ADR previa.

## 9. Auditoría continua

Cualquier participante puede, y debe, señalar si el proyecto está escribiendo más
arquitectura que software, generando más gobierno que aprendizaje, o diseñando más
hipótesis que validaciones. Es criterio de calidad, no cortesía.

## 10. Control de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-07-05 | Primera versión, aprobada y creada directamente al cierre de la Fundación. Incorpora como criterio de revisión principal la pregunta "¿esto ayuda realmente al Reference Learner a aprender mejor?", añadida en esta última revisión de coherencia. |
