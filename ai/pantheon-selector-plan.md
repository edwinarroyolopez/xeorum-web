# Plan de rediseño: `/pantheon` como Pantheon Selector

## 1. Diagnóstico del estado actual de `/pantheon`

### Archivos revisados

- `src/app/(public)/pantheon/page.tsx`
- `src/app/(public)/pantheon/[god]/page.tsx`
- `src/app/(public)/identity/[archetype]/page.tsx`
- `src/modules/pantheon/PantheonGrid.tsx`
- `src/modules/pantheon/PortalCard.tsx`
- `src/modules/design-system/components/PortalCard.tsx`
- `src/modules/pantheon/PantheonDetail.tsx`
- `src/modules/pantheon/PantheonDetailServer.tsx`
- `src/modules/pantheon/PantheonDetailClient.tsx`
- `src/modules/pantheon/ArchetypeLanding.tsx`
- `src/modules/pantheon/pantheon.api.ts`
- `src/modules/pantheon/pantheon.queries.ts`
- `src/modules/pantheon/pantheon.types.ts`
- `src/modules/pantheon/pantheon.metadata.ts`
- `src/modules/home/HomeView.tsx`
- `src/modules/home/components/HomePantheonSection.tsx`
- `src/modules/home/components/HomePortalCard.tsx`
- `src/modules/home/styles/home.css`
- `src/modules/design-system/patterns/EditorialHero.tsx`
- `src/modules/design-system/patterns/SectionHeader.tsx`
- `src/modules/design-system/components/Card.tsx`
- `src/styles/reset.css`

### Implementación actual

- La página `src/app/(public)/pantheon/page.tsx` es una composición mínima de dos bloques:
  - `EditorialHero` centrado con copy y CTAs.
  - `PantheonGrid` con `SectionHeader` y cards.
- `PantheonGrid` es client component, consume `usePantheonArchetypes()` y resuelve `loading`, `error`, `empty` y `success`.
- `PortalCard` de `src/modules/pantheon/PortalCard.tsx` no agrega lógica; solo delega al `PortalCard` del design system.
- El `PortalCard` actual es una card editorial de listing con imagen o fallback simbólico, pero no un selector activo de personaje/portal.
- `/pantheon/[god]` y `/identity/[archetype]` renderizan ambos `PantheonDetail`.
- `generateMetadata` de `/pantheon/[god]` usa canonical hacia `/identity/[archetype]`.
- Hoy el CTA real de cada card entra a `/identity/${slug}`, no a `/pantheon/${slug}`.

### Problemas visuales

- La estructura general sigue siendo de listing: hero arriba, grid abajo.
- El foco visual está en el copy, no en la selección de arquetipos.
- Hay demasiado espacio negativo con poca tensión visual o profundidad ambiental.
- El grid auto-fit de `.portal-grid` y la card actual (`.portal-card`) comunican catálogo premium, no sala de portales.
- La estética actual de `PortalCard` funciona como pieza editorial aislada, pero no como sistema inmersivo coordinado.
- El fondo y la ambientación de `/pantheon` dependen casi por completo del layout general y no de una capa escénica específica.

### Problemas de UX

- No hay estado activo compartido entre cards y entorno.
- Hover no modifica el ambiente global ni crea sensación de portal vivo.
- No existe preview dinámico del dios seleccionado.
- Desktop y mobile reciben prácticamente la misma lógica de listing.
- La salida al mercado aparece demasiado pronto en relación al objetivo principal de elegir arquetipo.
- El usuario no recibe una ayuda clara si no sabe qué elegir, más allá del CTA al test.

### Qué se puede reutilizar

- `usePantheonArchetypes()` y `pantheonApi.getArchetypes()`.
- `orderPantheonArchetypes()`.
- Estados `LoadingState`, `ErrorState`, `EmptyState`.
- Partes de copy y CTA actuales de `/pantheon/page.tsx`.
- Vocabulario visual base del design system: `LinkButton`, `Badge`, `Kicker`, `SectionHeader`, `Card`.
- Convención de metadata y canonical ya resuelta entre `/pantheon/[god]` y `/identity/[archetype]`.
- Recursos conceptuales ya presentes en `PantheonDetail` y `ArchetypeLanding`, especialmente tratamiento de aura, glow y pointer-reactive hero.
- El contexto de tema `pantheon` ya existe en `src/modules/theme/utils/compose-theme.ts`.

## 2. Visión de la nueva experiencia

### Qué debe sentir el usuario

- Que entró a una cámara ritual, no a una página de categorías.
- Que cada arquetipo tiene presencia, jerarquía, energía y un umbral de entrada propio.
- Que la elección importa.
- Que XEORUM está presentando fuerzas de identidad antes que producto.
- Que el ambiente responde a su exploración sin caer en espectáculo barato.

### Qué debe hacer la página

- Presentar todos los arquetipos publicados en una experiencia de selección.
- Permitir descubrir la energía principal de cada uno en menos de un vistazo.
- Actualizar preview y ambiente cuando cambia el dios activo por hover, focus o selección.
- Llevar al usuario a la landing individual mediante CTA principal claro.
- Ofrecer un camino alternativo al test de identidad para usuarios indecisos.
- Mantener una salida secundaria al mercado sin robar protagonismo.

### Qué NO debe hacer la página

- No parecer un grid de categorías de e-commerce.
- No usar productos como narrativa inicial.
- No depender de animaciones costosas o WebGL en fase 1.
- No asumir campos que hoy no existen en el contrato público.
- No sustituir ni romper `/pantheon/[god]` o `/identity/[archetype]`.
- No sacrificar legibilidad, foco visible o reduced motion por estilo.

## 3. Arquitectura propuesta de componentes

### Estructura propuesta

- `PantheonExperience`
  - Nuevo orquestador principal de la página.
  - Responsable de traer datos, resolver estados y mantener `activeArchetypeSlug`.
- `PantheonStage`
  - Shell inmersivo de la experiencia.
  - Coordina layout de copy, selector, preview y capa ambiental.
- `PantheonAmbientLayer`
  - Capa de fondo con gradientes, halos, noise suave, símbolos abstractos y cambios sutiles por arquetipo activo.
  - Solo CSS y assets livianos si existen; sin WebGL.
- `PantheonHeroCopy`
  - Reemplaza el hero editorial genérico por copy integrado al escenario.
  - Contiene título, bajada y CTAs primario/secundario/terciario.
- `PantheonSelector`
  - Lista navegable de arquetipos.
  - Administra interacción hover/focus/select a nivel UI.
- `PantheonGodCard`
  - Evolución del `PortalCard` actual.
  - En desktop puede vivir como opción del selector; en mobile como tarjeta seleccionable.
- `PantheonGodPreview`
  - Panel dinámico del arquetipo activo.
  - Muestra retrato/visual principal, símbolo, frase, energía, tags y CTA.
- `PantheonMobileSelector`
  - Variante mobile-first con carrusel/stack o lista snap, sin intentar copiar el desktop 1:1.
- `PantheonReducedMotionFallback`
  - Wrapper o variante que neutraliza parallax, cascadas y cambios ambientales animados.

### Reparto de responsabilidades

- Orquestación de datos:
  - `PantheonExperience`.
- Estado de selección:
  - `PantheonExperience` o `PantheonSelector` controlado por props.
- Render puro de UI:
  - `PantheonHeroCopy`
  - `PantheonAmbientLayer`
  - `PantheonGodCard`
  - `PantheonGodPreview`
  - `PantheonMobileSelector`
- Estados async:
  - Permanecen cerca del orquestador, no dispersos en varias capas.

### Componentes actuales a modificar o preservar

- `src/app/(public)/pantheon/page.tsx`
  - Pasar de composición simple a montaje de `PantheonExperience`.
- `src/modules/pantheon/PantheonGrid.tsx`
  - Evolucionar a orquestador nuevo o quedar como compatibilidad temporal interna.
- `src/modules/pantheon/PortalCard.tsx`
  - Puede convertirse en adapter temporal al nuevo `PantheonGodCard` o eliminarse si deja de aportar valor.
- `src/modules/design-system/components/PortalCard.tsx`
  - Mejor no seguir cargándole la responsabilidad principal de `/pantheon`.
  - Conviene preservarlo como card reusable editorial si todavía sirve en otros contextos.

### Estilos a crear o reorganizar

- Mover estilos de experiencia Pantheon fuera del bloque global de `src/styles/reset.css`.
- Crear un stylesheet o módulo dedicado, por ejemplo:
  - `src/modules/pantheon/pantheon.css`
  - o un set de CSS Modules por componente si el repo ya lo favorece para piezas complejas.
- Mantener en `reset.css` solo utilidades y layout global, no la mayor parte del sistema visual del Pantheon.

## 4. Flujo de datos

### Campos actuales que sí existen hoy para la página `/pantheon`

Del contrato público `PantheonArchetype`:

- `slug`
- `name`
- `coreEnergy`
- `corePhrase`
- `shortManifesto`
- `visualMood`
- `palette[]`
- `symbols[]`
- `ctaLabel`
- `galleryPreview[]` con:
  - `title`
  - `imageUrl?`
  - `videoUrl?`
  - `altText`
  - `tags[]`
- `commerce.openMarketAngle`
- `commerce.productCategories[]`
- `commerce.marketTags[]`

### Qué permite construir solo con `xeorum-web`

- Selector inmersivo con estado activo local.
- Preview dinámico usando `galleryPreview`, `palette`, `symbols`, `visualMood`, `coreEnergy`, `corePhrase` y `shortManifesto`.
- Fondo reactivo derivado de `palette` y `visualMood`.
- Fallbacks visuales cuando no haya imagen o video.
- CTAs a `/identity`, `/pantheon` y `/products` sin cambiar backend.
- Motion ligero con CSS transforms, opacity y gradients.

### Qué falta para una versión madura y requeriría backend/admin futuro

- Un `heroImage` o `selectorPortrait` curado por arquetipo para la página `/pantheon`.
- Un `ambientTheme` o `auraProfile` público, separado del landing detail.
- Un `symbolAsset` explícito, no solo texto en `symbols[]`.
- Un `selectorExcerpt` corto optimizado para cards/preview.
- Orden editorial explícito de arquetipos, en vez de sorting frontend con excepción de `zeus`.
- Assets mobile/desktop diferenciados si se desea un stage mucho más cinematográfico.
- Posible `pantheonEntryHref` público si negocio decide que la entrada principal deje de ser `/identity/[archetype]`.

### Estrategia de fallbacks

- Si falta imagen y/o video:
  - usar composición abstracta con `palette`, símbolo y copy.
- Si falta símbolo usable:
  - usar primer símbolo textual si existe; si no, monograma o marca XEORUM.
- Si falta riqueza cromática:
  - derivar aura desde los primeros 2-3 colores de `palette`; si no existen, usar preset Pantheon oscuro/dorado.
- Si falta frase corta:
  - usar `corePhrase`; si faltara, `coreEnergy`; si faltara, `shortManifesto` truncado.

### Resolución de URL de entrada

- Ruta principal recomendada para CTA de entrada: `/identity/${slug}`.
  - Razón: hoy ya es el destino real de las cards y el canonical de `/pantheon/[god]` apunta ahí.
- Ruta espejo a preservar: `/pantheon/${slug}`.
  - Puede seguir existiendo como acceso alterno y contexto narrativo de “portal”.
- Recomendación de producto/SEO:
  - mantener `/identity/[archetype]` como destino principal hasta que exista una decisión explícita de unificar rutas.

## 5. Diseño visual y motion system

### Layout desktop

- Un stage principal en dos columnas o 12 columnas:
  - izquierda: `PantheonHeroCopy` + señales + CTAs.
  - derecha: `PantheonGodPreview` dominante.
- Debajo o lateralmente, `PantheonSelector` como banda de portales/cards.
- El selector no debe sentirse como simple grid uniforme.
  - Mejor una composición con card activa destacada y otras en escala menor o rail jerárquico.
- La capa ambiental debe ocupar todo el stage y cambiar con suavidad según arquetipo activo.

### Layout tablet

- Stage más vertical.
- Preview arriba, selector debajo, copy compactado pero todavía premium.
- Mantener cambio de aura y foco activo visible.

### Layout mobile

- Priorizar una secuencia clara:
  - intro breve
  - preview activo
  - selector táctil horizontal o stack snap
  - CTAs
- No reducir el desktop a un grid pequeño de cards.
- El preview debe seguir existiendo, aunque más compacto.
- Los targets táctiles deben ser amplios y el estado activo inequívoco.

### Estados hover, active y focus

- `hover`
  - glow sutil
  - elevación ligera
  - borde o aura cromática derivada de `palette`
  - actualización del preview y del ambiente global
- `active`
  - card más grande o más luminosa
  - símbolo/ornamento más presente
  - CTA principal asociado al arquetipo activo
- `focus-visible`
  - anillo claro y contrastado
  - misma actualización de preview que hover/active para navegación por teclado

### Capa ambiental

- Fondo compuesto por:
  - gradientes radiales oscuros
  - una o dos auras cromáticas derivadas de `palette`
  - noise o textura muy sutil si ya existe un recurso liviano
  - líneas/símbolos abstractos de baja opacidad
- Debe reforzar la atmósfera, no competir con las cards.

### Animaciones permitidas

- Fade, opacity, transform, scale, translate, blur suave premedido.
- Stagger de entrada ligero de cards.
- Glow o orb ambiental animado muy sutil.
- Parallax mínimo basado en pointer solo en desktop y solo sobre elementos concretos.
- Crossfade del preview y del fondo activo.

### Animaciones a evitar

- WebGL/Three.js en fase 1.
- Partículas físicas complejas.
- Scroll-jacking.
- Looping intensos o animaciones permanentes muy visibles.
- Video autoplay pesado como dependencia estructural.

### Estrategia reduced motion

- Desactivar:
  - parallax por pointer
  - stagger visible
  - transiciones largas del ambiente
  - glow animado continuo
- Mantener:
  - cambio instantáneo o casi instantáneo de estado activo
  - feedback de foco y selección no animado o de muy baja duración
- Apoyarse en `prefers-reduced-motion`, además de la política global ya presente en `reset.css`.

## 6. Plan de implementación por fases

### Fase 1: MVP visual funcional sin romper datos

- Crear `PantheonExperience` y reemplazar el hero+grid actual.
- Reusar `usePantheonArchetypes()`.
- Introducir un stage inmersivo con:
  - copy principal
  - selector de arquetipos
  - preview inicial del primer arquetipo ordenado
- Construir fallbacks sólidos con campos actuales.
- Mantener CTA principal hacia `/identity/${slug}`.
- Mantener loading/error/empty.

Resultado esperado:

- `/pantheon` deja de sentirse como listing editorial y ya opera como selector funcional.

### Fase 2: selector activo con preview dinámico

- Añadir estado activo controlado por hover, focus y click/tap.
- Hacer que `PantheonGodPreview` cambie según arquetipo activo.
- Mostrar energía, frase, short manifesto, tags y CTA desde el arquetipo activo.
- Resolver experiencia de teclado con roving focus o botones/enlaces claramente navegables.

Resultado esperado:

- El usuario siente exploración reactiva, no solo lectura estática.

### Fase 3: aura/theme por dios

- Derivar tema visual por arquetipo activo usando `palette` y `visualMood`.
- Aplicar cambios ambientales al stage completo.
- Introducir variantes de estilo por familia energética sin nuevos campos backend.
- Si conviene, reutilizar patrones suaves de `ArchetypeLanding` para glow y pointer-reactive feedback.

Resultado esperado:

- Cada dios se siente más distinto aunque el contrato público siga siendo el actual.

### Fase 4: refinamiento responsive, accesibilidad y performance

- Afinar mobile selector.
- Revisar overflow, densidad visual y legibilidad en breakpoints.
- Asegurar `focus-visible`, contraste, reduced motion y lazy loading.
- Medir costo de imágenes y transiciones.

Resultado esperado:

- Experiencia premium mantenida en mobile y sin degradación fuerte de CWV.

### Fase 5: preparación para integración futura con campos más maduros del backend/admin

- Documentar en código los lugares donde hoy se usa fallback derivado.
- Separar claramente mapper visual actual de futuros campos dedicados.
- Preparar una interfaz opcional para:
  - hero asset dedicado
  - aura profile
  - symbol asset
  - selector excerpt
  - order editorial

Resultado esperado:

- El frontend queda listo para evolucionar sin reescribir la arquitectura.

## 7. Lista concreta de archivos a tocar

### Archivos actuales

- `src/app/(public)/pantheon/page.tsx`
  - Acción propuesta: reemplazar hero+grid actual por `PantheonExperience`.
  - Riesgo: bajo.
  - Resultado esperado: nueva experiencia entra por la ruta actual sin romper navegación.

- `src/modules/pantheon/PantheonGrid.tsx`
  - Acción propuesta: refactor profundo o reemplazo por nuevo orquestador/list selector.
  - Riesgo: medio.
  - Resultado esperado: pasar de grid pasivo a selector activo con estados completos.

- `src/modules/pantheon/PortalCard.tsx`
  - Acción propuesta: convertir en wrapper del nuevo card o retirar si queda redundante.
  - Riesgo: bajo.
  - Resultado esperado: limpieza de capa intermedia sin valor real.

- `src/modules/design-system/components/PortalCard.tsx`
  - Acción propuesta: no usarlo como pieza central del nuevo Pantheon o ajustarlo si aún tiene consumidores reales.
  - Riesgo: medio si tiene reutilización indirecta.
  - Resultado esperado: evitar forzar al design system una experiencia demasiado específica.

- `src/styles/reset.css`
  - Acción propuesta: extraer estilos específicos de pantheon y reducir acoplamiento global.
  - Riesgo: medio.
  - Resultado esperado: menos deuda visual global y mejor mantenibilidad.

### Archivos nuevos sugeridos

- `src/modules/pantheon/PantheonExperience.tsx`
- `src/modules/pantheon/PantheonStage.tsx`
- `src/modules/pantheon/PantheonAmbientLayer.tsx`
- `src/modules/pantheon/PantheonHeroCopy.tsx`
- `src/modules/pantheon/PantheonSelector.tsx`
- `src/modules/pantheon/PantheonGodCard.tsx`
- `src/modules/pantheon/PantheonGodPreview.tsx`
- `src/modules/pantheon/PantheonMobileSelector.tsx`
- `src/modules/pantheon/PantheonReducedMotionFallback.tsx`
- `src/modules/pantheon/pantheon.css` o CSS Modules equivalentes

### Archivos a no tocar en esta fase salvo compatibilidad mínima

- `src/app/(public)/pantheon/[god]/page.tsx`
- `src/app/(public)/identity/[archetype]/page.tsx`
- `src/modules/pantheon/PantheonDetail*.tsx`
- `src/modules/pantheon/pantheon.metadata.ts`

Razón:

- La tarea es rediseñar `/pantheon`, no rehacer el detalle ni la canonical existente.

## 8. Criterios de aceptación

- `/pantheon` muestra todos los arquetipos publicados por `usePantheonArchetypes()`.
- La página deja de renderizarse como hero editorial + grid genérico.
- Existe un arquetipo activo visible al cargar la página.
- Hover, focus o tap actualizan claramente el estado activo.
- El preview dinámico refleja el arquetipo activo usando campos reales del contrato público.
- Cada card o acción principal enlaza correctamente a `/identity/[archetype]`.
- `/pantheon/[god]` sigue existiendo y no se rompe.
- `/identity/[archetype]` sigue existiendo y no se rompe.
- Metadata y canonical actuales no se degradan.
- Si falta imagen o video, la experiencia usa fallback visual sin romper layout.
- Si faltan símbolos o palette limitada, el stage mantiene una presentación coherente.
- Mobile funciona sin overflow horizontal ni cards inutilizables.
- Navegación por teclado permite recorrer el selector y activar la entrada al portal.
- `prefers-reduced-motion` desactiva animaciones ambientales no esenciales.
- No se introducen dependencias pesadas sin aprobación.
- No hay datos mock productivos.
- No hay errores TypeScript.
- Lighthouse no sufre una degradación grave frente al estado actual.

## 9. Riesgos técnicos

### Riesgos por contrato de datos

- El contrato de lista no trae campos dedicados para una experiencia hero por arquetipo.
- `symbols[]` puede no ser suficientemente robusto para representar iconografía premium consistente.
- `galleryPreview[]` puede venir vacío o con assets desiguales entre arquetipos.

Mitigación:

- Diseñar toda la experiencia con fallbacks de primer nivel y derivación visual desde `palette`, `visualMood`, `corePhrase` y `shortManifesto`.

### Riesgos por imágenes

- Las imágenes pueden no compartir proporción o calidad.
- Puede haber `videoUrl` pero no `imageUrl`, o viceversa.
- `img` actual sugiere que aún no hay pipeline optimizado unificado para preview de pantheon.

Mitigación:

- En fase 1, usar marcos robustos con crop controlado, lazy loading y fallback abstracto.

### Riesgos por animaciones

- Un stage inmersivo puede volverse caro si se abusa de blur, gradients complejos o pointer tracking global.

Mitigación:

- Limitar animación a pocas capas, evitar recalcular demasiados nodos y usar solo propiedades baratas.

### Riesgos responsive

- Un desktop cinematográfico puede colapsar en mobile si se intenta conservar la misma composición.

Mitigación:

- Diseñar `PantheonMobileSelector` como experiencia propia, no como reducción pobre.

### Riesgos de performance

- El stage puede aumentar el costo visual inicial.
- Si todas las imágenes cargan de golpe, el grid-selector puede castigar LCP/INP.

Mitigación:

- Priorizar solo el preview activo.
- Lazy load del resto.
- Evitar video autoplay y assets decorativos pesados.

## 10. Recomendación final

La ruta más segura es implementar primero un `PantheonExperience` client-side que reutilice el contrato actual de `PantheonArchetype`, mantenga `/identity/[archetype]` como destino principal y derive toda la épica visual desde `palette`, `galleryPreview`, `symbols`, `visualMood`, `coreEnergy` y `corePhrase`.

Eso permite lograr una primera versión fuerte sin tocar backend/admin, sin romper SEO ni rutas existentes y sin sobreingeniería. La clave es no intentar resolver “la versión definitiva del panteón” en el primer paso, sino construir una arquitectura de selector inmersivo con buenos fallbacks y una capa ambiental sobria, para luego enchufar campos más maduros cuando el contrato público los tenga.

## Recomendaciones futuras separadas para backend/admin

- Exponer campo público de asset hero para selector.
- Exponer orden editorial explícito.
- Exponer símbolo/insignia curada por arquetipo.
- Exponer preset de aura o ambient theme para `/pantheon`.
- Exponer copy corto específico para selector, distinto del landing.
