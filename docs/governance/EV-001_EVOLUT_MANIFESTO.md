# EV-001 — Evolut Manifesto

**Estado:** APPROVED
**Versión:** v1.0
**Fecha:** 2026-07-05
**Ratificado conceptualmente por:** ADR-001_REFOUNDATION_OF_EVOLUT_EDUCATIONAL_FRAMEWORK.md
**Responde a:** por qué existe Evolut Platform, qué problema resuelve, cómo piensa resolverlo,
qué principios la gobiernan, cómo aprende y cómo evoluciona. Cómo se gobierna el proyecto
día a día es responsabilidad de CON-001, no de este documento.

**Nota sobre nombres:** "Evolut Platform", "Evolut Educational Framework" y "Software
Engineering Core" son nombres de trabajo. Ninguno constituye branding definitivo.

---

Este es el primer documento que debería leer cualquiera que quiera entender qué es Evolut
Platform. No es un documento técnico: no define entidades ni carpetas — eso ya vive en
ED-001 y AD-001. Este documento explica por qué existe todo lo demás.

## 1. Propósito

Evolut Platform existe para investigar, diseñar, construir y validar mejores formas de
formar ingenieros de software. El Framework no es el objetivo — es el medio. Si algún día
Evolut Educational Framework dejara de ser la mejor forma conocida de conseguirlo, se
sustituiría sin dudarlo. Lo que no cambia es el propósito: mejores formas de formar
ingenieros de software, demostradas, no supuestas.

## 2. Qué problema resuelve

La mayoría de los itinerarios formativos se diseñan por completo antes de que nadie los
recorra, y se validan —si acaso— después de terminarlos, con encuestas de satisfacción o
tasas de empleabilidad, no con evidencia de si el aprendizaje ocurrió realmente, concepto a
concepto. La pregunta que Evolut se plantea es distinta: ¿cómo sabemos que un programa
formativo funciona si nadie lo ha recorrido mientras se diseña? La respuesta que propone es
no esperar a saberlo: construir cada pieza del currículo junto a la persona real que va a
aprenderla, y dejar que esa experiencia —no la intuición de quien diseña— decida si la pieza
sirve.

## 3. Identidad y niveles

```
Evolut Platform                    ← identidad organizativa: únicamente un nombre comercial
└── Evolut Educational Framework   ← motor curricular reutilizable (lo modelan ED-001 + AD-001)
    └── Programs                  ← instancias formativas concretas
        └── Software Engineering Core   ← primer Program, inspirado en 42 y DAM, dependiente de ninguno
```

"Evolut Platform" no implica todavía un modelo de negocio, una empresa de formación, un
producto comercial ni una estrategia de mercado. Su única función hoy es dar identidad
organizativa al proyecto. El valor de Evolut debe demostrarse primero mediante experiencia
real de aprendizaje; solo entonces tendrá sentido discutir su posible evolución empresarial.
Esta decisión no se toma en este documento — se aplaza deliberadamente.

## 4. Cómo piensa hacerlo: Learn by Building the Framework

El Framework no se diseña antes del aprendizaje. Se diseña mediante el aprendizaje. Su
desarrollo y el recorrido de quien lo aprende avanzan en paralelo: nunca se encadenan fases
largas de diseño o gobierno sin práctica real intercalada.

El mecanismo concreto que hace esto posible es el **Reference Learner**: la primera persona
que recorre completamente un Program mientras este se construye. Hoy, el Reference Learner
es Héctor. Su experiencia —qué le cuesta entender, qué le resulta claro, qué le lleva más
tiempo del esperado— es la principal fuente de validación del Framework, y también su primer
cliente: mientras Evolut no le aporte valor real a él, no se diseñará para usuarios
hipotéticos futuros. El Reference Learner no es una entidad del Educational Data Model — es
un concepto de gobierno y metodología, y vive aquí y en CON-001, nunca en ED-001.

## 5. Qué principios la gobiernan

**Reality Before Complexity:** toda decisión arquitectónica debe resolver primero un
problema real antes de introducir complejidad estructural. No prohíbe anticipar cuando el
coste de hacerlo es prácticamente nulo; sí prohíbe introducir abstracciones, capas o
mecanismos complejos por una necesidad hipotética que todavía no se ha experimentado.

Los principios que gobiernan específicamente la representación técnica y física del
Framework —Stable IDs, Physical Simplicity, Documentation First— viven en AD-001 y no se
repiten aquí para evitar mantener dos definiciones de lo mismo en dos documentos distintos.

## 6. Cómo aprende: el ciclo operativo

```
Build → Learn → Validate → Capture Knowledge → Improve → Repeat
```

No es un eslogan: es el mecanismo operativo por el que evoluciona el Framework.

- **Build** — se construye la pieza mínima necesaria para que el Reference Learner avance: un Concept, una Learning Unit, un Project.
- **Learn** — el Reference Learner la recorre en condiciones reales, sin simulacro.
- **Validate** — se comprueba si el aprendizaje ocurrió de verdad: qué se entendió, qué no, qué costó más de lo previsto.
- **Capture Knowledge** — esa experiencia validada se transforma en conocimiento reutilizable en vez de perderse como anécdota (ver sección 7).
- **Improve** — el Framework se ajusta con base en ese conocimiento: se corrige una Learning Unit, se reformula una Competency, se elimina una carpeta que sobraba.
- **Repeat** — el ciclo vuelve a Build, ya con el Framework mejorado.

## 7. Cómo evoluciona: Knowledge como activo estratégico

El activo más importante de Evolut Platform no será el código, ni la documentación, ni
siquiera el Framework en sí. Será el conocimiento validado obtenido durante el aprendizaje
real. La experiencia solo adquiere valor cuando puede reutilizarse para mejorar el
aprendizaje futuro — una dificultad que nadie vuelve a consultar no es conocimiento, es solo
algo que pasó.

Este Knowledge es distinto de una Competency: una Competency (EDM) describe qué debe saber
hacer un aprendiz; Knowledge describe qué ha aprendido el propio Framework sobre cómo
enseñar mejor. No es una entidad del Educational Data Model ni un documento técnico — es un
concepto estratégico.

El mecanismo para capturarlo se denomina, de forma provisional, **Lessons Learned**, y queda
directamente vinculado a la etapa *Capture Knowledge* del ciclo (sección 6). Su misión es
transformar experiencia en conocimiento reutilizable, no simplemente registrar
acontecimientos. Su representación física queda deliberadamente sin definir hasta que exista
experiencia práctica suficiente del Reference Learner para decidirla con criterio (ADR-001
§2): no se crea carpeta, no se modifica AD-001 y no se le asigna todavía formato ni ubicación.
Hasta entonces, Lessons Learned es únicamente un concepto estratégico de este documento.

## 8. Frontera con CON-001

Este documento no define cómo se toman decisiones, cómo se aprueban ADRs, ni cómo colaboran
Héctor, Claude y ChatGPT en la práctica — eso es responsabilidad exclusiva de CON-001. EV-001
se limita a responder por qué existe el proyecto, qué problema resuelve y qué principios lo
gobiernan.

## 9. Control de versiones

| Versión | Fecha | Cambio |
|---|---|---|
| v1.0 | 2026-07-05 | Primera versión aprobada y creada directamente como baseline de gobierno estratégico, ratificada conceptualmente por ADR-001. Define Lessons Learned como nombre definitivo (provisional en cuanto a forma física, no en cuanto a nombre) del mecanismo de captura de conocimiento. |
