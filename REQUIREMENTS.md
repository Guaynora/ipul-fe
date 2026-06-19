# IPUL Frontend — Requerimientos Funcionales y Técnicos

> Versión: 1.1 · Fecha: 2026-06-18  
> Backend de referencia: `ipul-be` (NestJS + GraphQL + REST Auth)

---

## 1. Contexto del Proyecto

Aplicación de administración para una iglesia local (IPUL). Gestiona dos dominios principales:

- **Finanzas**: registro de ingresos (ofrendas, diezmos, otras ventas), egresos, descuentos sobre diezmos y reportes financieros.
- **Feligresía**: gestión de miembros (feligreses), incluyendo su estado de bautismo y datos de contacto.

El sistema tiene un **único rol de administrador**. No hay registro público de usuarios.

---

## 2. Stack Técnico

### Ya instalado
| Dependencia | Versión | Nota |
|-------------|---------|------|
| Next.js | 16.x | App Router |
| React | 19.x | |
| TypeScript | 5.x | |
| Tailwind CSS | 4.x | |
| pnpm | — | gestor de paquetes |

### A instalar (requeridos)

**Runtime**
| Dependencia | Propósito |
|-------------|-----------|
| `@apollo/client` | Cliente GraphQL (queries, mutations, caché) |
| `graphql` | Peer dep de Apollo |
| `react-hook-form` | Manejo de formularios |
| `zod` | Validación de esquemas |
| `@hookform/resolvers` | Integración zod ↔ react-hook-form |
| `lucide-react` | Iconos |

**Dev / Testing**
| Dependencia | Propósito |
|-------------|-----------|
| `vitest` | Test runner |
| `@vitejs/plugin-react` | Plugin de Vitest para React |
| `@testing-library/react` | Testing de componentes |
| `@testing-library/user-event` | Simulación de eventos en tests |
| `@testing-library/jest-dom` | Matchers adicionales (toBeInTheDocument, etc.) |
| `msw` | Mock Service Worker (mocking de API en tests) |
| `jsdom` | Entorno DOM para Vitest |

**Dev / GraphQL Code Generator**
| Dependencia | Propósito |
|-------------|-----------|
| `@graphql-codegen/cli` | CLI del generador |
| `@graphql-codegen/typescript` | Plugin: tipos base TypeScript |
| `@graphql-codegen/typescript-operations` | Plugin: tipos por operación (query/mutation) |
| `@graphql-codegen/typescript-react-apollo` | Plugin: hooks de Apollo tipados |

### A instalar (recomendados)
| Dependencia | Propósito |
|-------------|-----------|
| `clsx` | Utilidad de clases condicionales |
| `tailwind-merge` | Merge seguro de clases Tailwind |
| `date-fns` | Manipulación de fechas |
| `recharts` | Gráficas para reportes |

---

## 3. Arquitectura — Clean Architecture adaptada a Next.js

La arquitectura sigue el **principio de inversión de dependencias**: las capas externas dependen de las internas, nunca al revés.

```
src/
├── domain/           # Entidades, interfaces de repositorio, value objects
├── application/      # Casos de uso (hooks), puertos de salida
├── infrastructure/   # Implementaciones: Apollo client, fetch para REST
└── presentation/     # Next.js: pages, layouts, componentes (atomic design)
```

### Regla de dependencias

```
presentation → application → domain ← infrastructure
```

- `domain/` no importa nada externo.
- `application/` define interfaces (ports) y casos de uso en hooks de React.
- `infrastructure/` implementa los ports contra Apollo/fetch.
- `presentation/` consume los hooks de `application/`.

### Atomic Design en `presentation/`

```
presentation/
├── atoms/        # Button, Input, Badge, Spinner — sin estado propio
├── molecules/    # FormField, DataTable, StatCard — composición de atoms
├── organisms/    # ParishionerForm, IncomeForm, ReportChart — lógica de UI compleja
├── templates/    # AuthLayout, DashboardLayout — estructura de página
└── pages/        # Route components — componen templates + organisms
```

---

## 4. Estructura de Carpetas Completa

```
ipul-fe/
├── app/                          # Next.js App Router
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx            # DashboardLayout con sidebar + header
│   │   ├── page.tsx              # Dashboard / resumen
│   │   ├── parishioners/
│   │   │   ├── page.tsx          # Lista de feligreses
│   │   │   └── [id]/
│   │   │       └── page.tsx      # Detalle / edición
│   │   ├── incomes/
│   │   │   └── page.tsx          # Lista + formulario de ingreso
│   │   ├── expenses/
│   │   │   └── page.tsx          # Lista + formulario de egreso
│   │   ├── tithe-discounts/
│   │   │   └── page.tsx          # Versiones de descuento
│   │   └── reports/
│   │       └── page.tsx          # Reportes con filtros y gráficas
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts    # Route Handler: POST → sets httpOnly cookies
│   │       ├── refresh/route.ts  # Route Handler: refresca access token
│   │       └── logout/route.ts   # Route Handler: limpia cookies
│   ├── globals.css
│   └── layout.tsx
│
├── src/
│   ├── domain/
│   │   ├── parishioner.entity.ts
│   │   ├── income.entity.ts
│   │   ├── expense.entity.ts
│   │   ├── tithe-discount.entity.ts
│   │   ├── report.entity.ts
│   │   └── ports/
│   │       ├── parishioner.repository.port.ts
│   │       ├── income.repository.port.ts
│   │       ├── expense.repository.port.ts
│   │       ├── tithe-discount.repository.port.ts
│   │       └── report.repository.port.ts
│   │
│   ├── application/
│   │   ├── parishioners/
│   │   │   ├── use-parishioners.hook.ts
│   │   │   ├── use-parishioner.hook.ts
│   │   │   ├── use-create-parishioner.hook.ts
│   │   │   ├── use-update-parishioner.hook.ts
│   │   │   └── use-delete-parishioner.hook.ts
│   │   ├── incomes/
│   │   │   ├── use-incomes.hook.ts
│   │   │   └── use-create-income.hook.ts
│   │   ├── expenses/
│   │   │   ├── use-expenses.hook.ts
│   │   │   └── use-create-expense.hook.ts
│   │   ├── tithe-discounts/
│   │   │   ├── use-tithe-discounts.hook.ts
│   │   │   ├── use-create-tithe-discount.hook.ts
│   │   │   └── use-activate-tithe-discount.hook.ts
│   │   ├── reports/
│   │   │   ├── use-income-report.hook.ts
│   │   │   ├── use-expense-report.hook.ts
│   │   │   └── use-balance-report.hook.ts
│   │   └── auth/
│   │       └── use-auth.hook.ts
│   │
│   ├── infrastructure/
│   │   ├── graphql/
│   │   │   ├── apollo-client.ts       # Instancia de ApolloClient (authLink + errorLink)
│   │   │   ├── apollo-provider.tsx    # ApolloProvider para Client Components
│   │   │   ├── generated.ts           # AUTO-GENERADO por codegen — no editar a mano
│   │   │   └── operations/            # Archivos .graphql — fuente de verdad de las ops
│   │   │       ├── parishioner.graphql
│   │   │       ├── income.graphql
│   │   │       ├── expense.graphql
│   │   │       ├── tithe-discount.graphql
│   │   │       └── report.graphql
│   │   └── auth/
│   │       └── auth.client.ts         # fetch wrapper para REST /auth/*
│   │
│   └── presentation/
│       ├── atoms/
│       │   ├── Button/
│       │   │   ├── Button.tsx
│       │   │   └── Button.test.tsx
│       │   ├── Input/
│       │   ├── Badge/
│       │   ├── Spinner/
│       │   └── index.ts
│       ├── molecules/
│       │   ├── FormField/
│       │   ├── DataTable/
│       │   ├── StatCard/
│       │   └── ConfirmDialog/
│       ├── organisms/
│       │   ├── ParishionerForm/
│       │   ├── IncomeForm/
│       │   ├── ExpenseForm/
│       │   ├── TitheDiscountForm/
│       │   ├── ReportFilters/
│       │   └── Sidebar/
│       └── templates/
│           ├── AuthLayout/
│           └── DashboardLayout/
│
├── tests/
│   └── setup.ts                   # Configuración global de Vitest + MSW
│
├── vitest.config.ts
└── REQUIREMENTS.md
```

---

## 5. Autenticación y Sesiones

### Flujo de autenticación

```
1. Usuario envía email + password en /login
2. Next.js Route Handler (POST /api/auth/login) llama al backend REST POST /auth/login
3. Backend responde { accessToken: string, refreshToken: string }
4. Route Handler setea dos httpOnly cookies:
   - access_token  → httpOnly, Secure, SameSite=Strict, maxAge=15*60
   - refresh_token → httpOnly, Secure, SameSite=Strict, maxAge=7*24*60*60
5. Apollo Client lee el access_token de cookie (SSR) o lo obtiene del contexto de sesión
6. Todas las peticiones GraphQL llevan: Authorization: Bearer <access_token>
```

### Renovación de token (token refresh)

- El Apollo Client tiene un **auth link** que intercepta errores `UNAUTHENTICATED`.
- Al recibir ese error, llama a `POST /api/auth/refresh` (Route Handler interno).
- El Route Handler usa el `refresh_token` de la cookie para llamar al backend `POST /auth/refresh`.
- Actualiza la cookie `access_token` y reintenta la operación original.
- Si el refresh falla → redirige a `/login`.

### Middleware de protección de rutas

Archivo: `middleware.ts` en la raíz del proyecto.

```typescript
// Protege todas las rutas bajo (dashboard)
// Redirige a /login si no hay access_token en cookies
// Redirige a /dashboard si ya está autenticado y visita /login
```

### Contrato REST de autenticación

| Método | URL | Body | Respuesta exitosa |
|--------|-----|------|-------------------|
| POST | `/auth/login` | `{ email, password }` | `{ accessToken, refreshToken }` |
| POST | `/auth/refresh` | `{ refreshToken }` body ó cookie | `{ accessToken }` |
| POST | `/auth/logout` | — (requiere Bearer token) | `{ success: true }` |

---

## 6. Módulos y Pantallas

### 6.1 Login

**Ruta**: `/login`  
**Pantalla única** con formulario centrado.

**Campos**:
- Email (requerido, formato email)
- Password (requerido, mínimo 6 caracteres)

**Validación**: zod + react-hook-form.

**Comportamiento**:
- Submit → llama a `/api/auth/login` (Route Handler).
- Éxito → redirige a `/dashboard`.
- Error 401 → muestra mensaje "Credenciales incorrectas".
- Loading state en el botón durante la petición.

---

### 6.2 Dashboard

**Ruta**: `/dashboard` (raíz del área protegida)

**Propósito**: resumen ejecutivo del estado financiero.

**Widgets**:
- `StatCard` con balance neto total (TITHE + NON_TITHE)
- `StatCard` con total de ingresos del mes
- `StatCard` con total de egresos del mes
- `StatCard` con total de feligreses activos
- Gráfica de barras: ingresos por tipo (OFFERING / TITHE / SALE_OTHER)
- Gráfica de torta o barras: egresos por fondo (TITHE / NON_TITHE)

**Datos**: `balanceReport`, `incomeReport`, `expenseReport` con filtro del mes en curso.

---

### 6.3 Feligreses

**Ruta**: `/dashboard/parishioners`

#### Lista

- Tabla con columnas: Nombre, Email, Teléfono, Bautizado (badge), Acciones (editar / eliminar).
- Búsqueda local por nombre (filtro en cliente, no requiere endpoint dedicado).
- Botón "Nuevo feligrés" → abre modal con `ParishionerForm`.
- Confirmación antes de eliminar (`ConfirmDialog`).

#### Formulario (create / update)

**Campos**:
| Campo | Tipo | Validación |
|-------|------|------------|
| Nombre | text | requerido, mín. 2 chars |
| Email | email | opcional, formato email |
| Teléfono | text | opcional |
| Dirección | text | opcional |
| Bautizado | checkbox/toggle | requerido (boolean) |

#### Detalle

**Ruta**: `/dashboard/parishioners/[id]`  
Vista con datos completos del feligrés. Desde aquí se puede editar o eliminar.

#### GraphQL

```graphql
# Queries
query GetParishioners {
  parishioners {
    id name email phone address baptized createdAt updatedAt
  }
}

query GetParishioner($id: ID!) {
  parishioner(id: $id) {
    id name email phone address baptized createdAt updatedAt
  }
}

# Mutations
mutation CreateParishioner($input: CreateParishionerInput!) {
  createParishioner(input: $input) {
    id name email phone address baptized
  }
}

mutation UpdateParishioner($id: ID!, $input: UpdateParishionerInput!) {
  updateParishioner(id: $id, input: $input) {
    id name email phone address baptized
  }
}

mutation DeleteParishioner($id: ID!) {
  deleteParishioner(id: $id)
}
```

---

### 6.4 Ingresos

**Ruta**: `/dashboard/incomes`

#### Lista

- Tabla con columnas: Tipo (badge), Monto, Fecha, Descripción, Feligrés (si es TITHE), Registrado por.
- Filtro por tipo de ingreso (select).
- Botón "Registrar ingreso" → abre modal con `IncomeForm`.

#### Formulario

**Campos**:
| Campo | Tipo | Validación | Condición |
|-------|------|------------|-----------|
| Tipo | select | requerido | — |
| Monto | number | requerido, > 0 | — |
| Fecha | date | requerido | — |
| Descripción | text | opcional | — |
| Feligrés | select | **requerido** si tipo = TITHE | Solo visible cuando tipo = TITHE |

**Tipos de ingreso** (enum `IncomeType`):
- `OFFERING` — Ofrenda
- `TITHE` — Diezmo (requiere seleccionar un feligrés)
- `SALE_OTHER` — Venta / Otros

**Nota importante**: cuando `type = TITHE`, el campo `parishionerId` es obligatorio. El selector de feligrés debe cargarse desde `parishioners`.

#### GraphQL

```graphql
query GetIncomes {
  incomes {
    id type amount date description parishionerId createdBy
  }
}

mutation CreateIncome($input: CreateIncomeInput!, $createdBy: String!) {
  createIncome(input: $input, createdBy: $createdBy) {
    id type amount date description parishionerId createdBy
  }
}
```

---

### 6.5 Egresos

**Ruta**: `/dashboard/expenses`

#### Lista

- Tabla con columnas: Descripción, Monto, Fecha, Categoría, Fondo (badge), Registrado por.
- Filtro por fondo (`TITHE` / `NON_TITHE`).
- Botón "Registrar egreso" → modal con `ExpenseForm`.

#### Formulario

**Campos**:
| Campo | Tipo | Validación |
|-------|------|------------|
| Descripción | text | requerido, mín. 2 chars |
| Monto | number | requerido, > 0 |
| Fecha | date | requerido |
| Categoría | text | requerido (libre, ej: "Servicios", "Mantenimiento") |
| Fondo | select | requerido: TITHE \| NON_TITHE |

**Fuentes de fondo** (enum `FundSource`):
- `TITHE` — Fondo del Diezmo
- `NON_TITHE` — Fondo General

#### GraphQL

```graphql
query GetExpenses {
  expenses {
    id description amount date category fundSource createdBy
  }
}

mutation CreateExpense($input: CreateExpenseInput!, $createdBy: String!) {
  createExpense(input: $input, createdBy: $createdBy) {
    id description amount date category fundSource createdBy
  }
}
```

---

### 6.6 Descuentos de Diezmo

**Ruta**: `/dashboard/tithe-discounts`

#### Descripción

Permite versionar las reglas de cálculo del descuento sobre diezmos. Solo puede haber una versión `ACTIVE` a la vez. Al activar una, la anterior pasa a `RETIRED`.

**Ciclo de vida**:
```
DRAFT → ACTIVE (al activar) → RETIRED (al ser reemplazada)
```

#### Lista

- Tabla con columnas: Versión, Estado (badge por estado), Efectivo desde, Reglas (resumen), Activado en, Registrado por.
- Badge de estado:
  - `DRAFT` → gris
  - `ACTIVE` → verde
  - `RETIRED` → rojo/naranja
- Botón "Activar" solo visible en filas con estado `DRAFT`.
- Botón "Nueva versión" → modal con `TitheDiscountForm`.

#### Formulario

**Campos**:
| Campo | Tipo | Validación |
|-------|------|------------|
| Efectivo desde | date | requerido, formato ISO string |
| Reglas | textarea (JSON) | requerido, mín. 2 chars |

> Las reglas son un JSON libre (el backend las almacena como string). La UI debe mostrar el textarea con monospace font. Validar que sea JSON válido antes de enviar.

#### GraphQL

```graphql
query GetTitheDiscounts {
  titheDiscounts {
    id version status effectiveFrom rules createdBy createdAt activatedAt
  }
}

query GetActiveTitheDiscount {
  activeTitheDiscount {
    id version status effectiveFrom rules createdBy createdAt activatedAt
  }
}

mutation CreateTitheDiscount($input: CreateTitheDiscountInput!, $createdBy: String!) {
  createTitheDiscount(input: $input, createdBy: $createdBy) {
    id version status effectiveFrom rules createdBy createdAt
  }
}

mutation ActivateTitheDiscount($id: String!) {
  activateTitheDiscount(id: $id) {
    id version status activatedAt
  }
}
```

---

### 6.7 Reportes

**Ruta**: `/dashboard/reports`

#### Filtros

- Fecha desde (`from`: YYYY-MM-DD, opcional)
- Fecha hasta (`to`: YYYY-MM-DD, opcional)
- Botón "Aplicar" → re-ejecuta las 3 queries con el filtro

#### Secciones

**Reporte de Ingresos**
- `StatCard` con total general.
- Tabla y gráfica de barras: total por tipo (OFFERING / TITHE / SALE_OTHER).

**Reporte de Egresos**
- `StatCard` con total general.
- Tabla: total por fondo (TITHE / NON_TITHE).
- Tabla: total por categoría.

**Balance General**
- `StatCard` con balance neto (ingreso total − egreso total).
- Tabla por fondo: totalIncome, totalExpense, net.

#### GraphQL

```graphql
query GetIncomeReport($filter: ReportFilterInput) {
  incomeReport(filter: $filter) {
    byType { type total }
    grandTotal
  }
}

query GetExpenseReport($filter: ReportFilterInput) {
  expenseReport(filter: $filter) {
    byFund { fundSource total }
    byCategory { category total }
    grandTotal
  }
}

query GetBalanceReport($filter: ReportFilterInput) {
  balanceReport(filter: $filter) {
    byFund { fund totalIncome totalExpense net }
    totalIncome
    totalExpense
    netBalance
  }
}
```

---

## 7. Entidades de Dominio

```typescript
// src/domain/parishioner.entity.ts
export interface Parishioner {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  baptized: boolean;
  createdAt: string;
  updatedAt: string;
}

// src/domain/income.entity.ts
export type IncomeType = 'OFFERING' | 'TITHE' | 'SALE_OTHER';

export interface Income {
  id: string;
  type: IncomeType;
  amount: string;
  date: string;
  description?: string;
  parishionerId?: string;
  createdBy: string;
}

// src/domain/expense.entity.ts
export type FundSource = 'TITHE' | 'NON_TITHE';

export interface Expense {
  id: string;
  description: string;
  amount: string;
  date: string;
  category: string;
  fundSource: FundSource;
  createdBy: string;
}

// src/domain/tithe-discount.entity.ts
export type DiscountStatus = 'DRAFT' | 'ACTIVE' | 'RETIRED';

export interface TitheDiscount {
  id: string;
  version: number;
  status: DiscountStatus;
  effectiveFrom: string;
  rules: string;
  createdBy: string;
  createdAt: string;
  activatedAt?: string;
}
```

---

## 8. Infraestructura GraphQL

### Flujo de GraphQL Code Generator

El proyecto **NO escribe queries GQL como strings a mano**. En su lugar:

```
schema.gql (del backend) ──┐
                            ├──► pnpm codegen ──► generated.ts
*.graphql (operaciones)  ──┘         (types + hooks tipados)
```

**Paso 1 — Configuración** (`codegen.ts` en la raíz):

```typescript
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3001/graphql',
  documents: 'src/infrastructure/graphql/operations/**/*.graphql',
  generates: {
    'src/infrastructure/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,           // genera useXxxQuery / useXxxMutation
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;
```

Script en `package.json`:
```json
{
  "scripts": {
    "codegen": "graphql-codegen --config codegen.ts"
  }
}
```

**Paso 2 — Archivos de operaciones** (`src/infrastructure/graphql/operations/`):

```
operations/
├── parishioner.graphql
├── income.graphql
├── expense.graphql
├── tithe-discount.graphql
└── report.graphql
```

Ejemplo de `parishioner.graphql`:

```graphql
query GetParishioners {
  parishioners {
    id name email phone address baptized createdAt updatedAt
  }
}

query GetParishioner($id: ID!) {
  parishioner(id: $id) {
    id name email phone address baptized createdAt updatedAt
  }
}

mutation CreateParishioner($input: CreateParishionerInput!) {
  createParishioner(input: $input) {
    id name email phone address baptized
  }
}

mutation UpdateParishioner($id: ID!, $input: UpdateParishionerInput!) {
  updateParishioner(id: $id, input: $input) {
    id name email phone address baptized
  }
}

mutation DeleteParishioner($id: ID!) {
  deleteParishioner(id: $id)
}
```

**Paso 3 — Uso en hooks de aplicación**:

```typescript
// src/application/parishioners/use-parishioners.hook.ts
// Los hooks vienen de generated.ts — completamente tipados
import {
  useGetParishionersQuery,
  useCreateParishionerMutation,
} from '@infrastructure/graphql/generated';

export function useParishioners() {
  const { data, loading, error } = useGetParishionersQuery();
  return { parishioners: data?.parishioners ?? [], loading, error };
}
```

> **Regla**: nunca importar desde `generated.ts` en componentes de presentación.
> Solo los hooks de `application/` consumen el archivo generado.

---

### Apollo Client (`src/infrastructure/graphql/apollo-client.ts`)

Configuración requerida:

```typescript
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL,
});

// Inyecta el token en cada petición
const authLink = setContext((_, { headers }) => {
  const token = getAccessToken(); // lee de cookie o contexto de sesión
  return {
    headers: {
      ...headers,
      ...(token && { authorization: `Bearer ${token}` }),
    },
  };
});

// Intercepta errores UNAUTHENTICATED → refresca token → reintenta
const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  const isUnauth = graphQLErrors?.some(e => e.extensions?.code === 'UNAUTHENTICATED');
  if (isUnauth) {
    // llamar a /api/auth/refresh y reintentar
  }
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
```

### Variables de entorno requeridas

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## 9. Pruebas Unitarias

### Configuración

- **Test runner**: Vitest
- **Entorno**: jsdom
- **Mocking de API**: MSW (Mock Service Worker) con handlers por módulo
- **Setup file**: `tests/setup.ts` — importa `@testing-library/jest-dom` matchers y configura MSW server

### Convenciones

- Cada componente tiene su test en el mismo directorio: `Button.test.tsx` junto a `Button.tsx`.
- Los hooks de aplicación tienen tests en `src/application/**/*.test.ts`.
- No testear implementación, testear COMPORTAMIENTO.

### Cobertura mínima requerida

| Tipo | Cobertura mínima |
|------|-----------------|
| Hooks de aplicación | 80% |
| Atoms (componentes UI base) | 90% |
| Molecules | 70% |
| Utilities / helpers | 95% |

### Casos de test obligatorios por módulo

#### Auth Hook (`use-auth.hook.ts`)
- [ ] Login exitoso → guarda sesión y redirige
- [ ] Login con credenciales inválidas → muestra error
- [ ] Logout → limpia sesión y redirige a /login

#### Feligreses
- [ ] Lista renderiza correctamente los datos mockeados
- [ ] Formulario de creación valida campos requeridos
- [ ] Formulario de creación no permite envío con datos inválidos
- [ ] Eliminación requiere confirmación
- [ ] Campo Feligrés en ingreso es requerido solo cuando tipo = TITHE

#### Componentes Atoms
- [ ] `Button` renderiza con variantes (primary, secondary, danger)
- [ ] `Button` muestra spinner en estado `loading`
- [ ] `Button` está deshabilitado cuando `disabled={true}`
- [ ] `Badge` aplica color correcto según status (DRAFT/ACTIVE/RETIRED)
- [ ] `Input` muestra error message cuando hay error de validación

#### Reportes
- [ ] `ReportFilters` llama al callback con los filtros correctos
- [ ] `StatCard` muestra el valor formateado correctamente

### Ejemplo de estructura de test

```typescript
// src/presentation/atoms/Button/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('shows spinner when loading', () => {
    render(<Button loading>Click me</Button>);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

---

## 10. Convenciones de Código

### Nomenclatura

| Artefacto | Convención | Ejemplo |
|-----------|-----------|---------|
| Componentes | PascalCase | `ParishionerForm.tsx` |
| Hooks | camelCase con prefijo `use-` | `use-parishioners.hook.ts` |
| Entities | kebab-case con sufijo `.entity` | `parishioner.entity.ts` |
| Queries GQL | PascalCase descriptivo | `GetParishioners`, `CreateIncome` |
| Tests | mismo nombre + `.test` | `Button.test.tsx` |

### Imports

- Usar paths absolutos via `tsconfig.json` `paths`:
  ```json
  {
    "@domain/*": ["src/domain/*"],
    "@application/*": ["src/application/*"],
    "@infrastructure/*": ["src/infrastructure/*"],
    "@presentation/*": ["src/presentation/*"]
  }
  ```

### Formularios

- Siempre usar `react-hook-form` + `zod` para validación.
- Definir el schema Zod en un archivo separado junto al formulario: `parishioner-form.schema.ts`.
- Los errores de validación se muestran debajo del campo con el componente `FormField`.

### Montos (`amount`)

- El backend maneja `amount` como `String` (representación decimal exacta, ej: `"1500.00"`).
- En la UI, mostrar siempre formateado con separadores de miles y 2 decimales.
- Al enviar al backend, convertir el número a string con `toFixed(2)`.

### Fechas

- El backend acepta fechas como ISO string (`YYYY-MM-DD` o `YYYY-MM-DDTHH:mm:ssZ`).
- Usar `date-fns` para formateo y manipulación.
- Mostrar fechas en formato local `dd/MM/yyyy`.

### `createdBy`

- Todas las mutaciones que crean registros requieren `createdBy: String!`.
- Usar el email del usuario autenticado (extraído del JWT: campo `email`).
- El email debe estar disponible globalmente en un contexto de sesión (`AuthContext` o similar).

---

## 11. Navegación y Layout

### Sidebar (organismo)

Links de navegación:
- Dashboard (icono: LayoutDashboard)
- Feligreses (icono: Users)
- Ingresos (icono: TrendingUp)
- Egresos (icono: TrendingDown)
- Descuentos de Diezmo (icono: Percent)
- Reportes (icono: BarChart)

Header:
- Nombre de la app / logo
- Email del admin autenticado
- Botón de logout

### Responsive

- Sidebar visible en desktop (≥ 768px).
- En mobile: sidebar colapsado, accesible vía botón hamburguesa.

---

## 12. Manejo de Estado de UI

### Loading states

Toda operación async debe tener estado de carga visible:
- Tablas: skeleton rows mientras carga.
- Formularios: botón con spinner + `disabled` durante submit.
- Páginas: spinner centrado o skeleton del layout.

### Error states

- Errores de red o GraphQL: toast/notificación global no bloqueante.
- Errores de validación: inline bajo cada campo del formulario.
- Error 401 renovable: silencioso (refresh automático).
- Error 401 no renovable: redirige a `/login` con mensaje de sesión expirada.

### Empty states

- Tablas vacías: ilustración + texto descriptivo + botón de acción primaria.

---

## 13. Variables de Entorno

```env
# .env.local
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
NEXT_PUBLIC_API_URL=http://localhost:3001

# Solo en servidor (Route Handlers, no exponer al cliente)
JWT_COOKIE_SECURE=false  # true en producción
```

---

## 14. Checklist de Implementación

### Fase 1 — Base
- [ ] Instalar dependencias (runtime + dev + codegen)
- [ ] Configurar `tsconfig.json` con paths absolutos
- [ ] Configurar Vitest (`vitest.config.ts` + `tests/setup.ts`)
- [ ] Configurar MSW con handlers vacíos
- [ ] Crear `codegen.ts` y script `pnpm codegen`
- [ ] Crear archivos `.graphql` con todas las operaciones
- [ ] Ejecutar `pnpm codegen` → genera `generated.ts`
- [ ] Crear `apollo-client.ts` con authLink + errorLink
- [ ] Crear entidades de dominio
- [ ] Crear `AuthLayout` y `DashboardLayout`
- [ ] Implementar middleware de protección de rutas
- [ ] Implementar Route Handlers de auth (`/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`)
- [ ] Implementar pantalla de Login con validación

### Fase 2 — Feligreses
- [ ] Queries/mutations de feligreses
- [ ] Hooks `use-parishioners`, `use-create-parishioner`, `use-update-parishioner`, `use-delete-parishioner`
- [ ] Página de lista con tabla + búsqueda local
- [ ] Modal con formulario de create/update
- [ ] Página de detalle `[id]`
- [ ] Tests de hooks y componentes

### Fase 3 — Finanzas
- [ ] Hooks de ingresos + página
- [ ] Hooks de egresos + página
- [ ] Hooks de descuentos de diezmo + página
- [ ] Lógica de campo condicional en `IncomeForm` (parishionerId requerido si TITHE)
- [ ] Tests de formularios

### Fase 4 — Reportes y Dashboard
- [ ] Hooks de reportes con filtros opcionales
- [ ] Página de reportes con 3 secciones y filtros de fecha
- [ ] Dashboard con widgets de resumen y gráficas
- [ ] Integración `recharts` para visualizaciones

### Fase 5 — Pulido
- [ ] Loading skeletons en todas las tablas
- [ ] Empty states
- [ ] Toast notifications globales
- [ ] Responsive mobile (sidebar colapsable)
- [ ] Cobertura de tests al nivel requerido
