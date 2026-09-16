# AgronOS Frontend Architecture & Data Flow


+---------------------------+
                 |    Root Layout / App      |
                 |     (app/layout.tsx)      |
                 +-------------+-------------+
                               |
            +------------------+------------------+
            |                                     |
   +--------v--------+                   +--------v--------+
   |   (auth) Group  |                   | (dashboard) Grp |
   | (login, signup) |                   | (dashboard, etc)|
   +-----------------+                   +--------+--------+
                                                  |
                                         +--------v--------+
                                         |  dashboard/page |
                                         +--------+--------+
                                                  |
        +-----------------------------------------+-----------------------------------------+
        |                                         |                                         |
+--------v--------+                       +--------v--------+                       +--------v--------+
|     Header      |                       |  Main Content   |                       |     Footer      |
| (ProfileMenu)   |                       +--------+--------+                       +-----------------+
+-----------------+                                |
+---------+---------+
|                   |
+--------v--------+ +--------v--------+
| FarmLocation    | |  Dashboard Grid |
|      Form       | | (When Loaded)   |
+-----------------+ +--------+--------+
|
+---------+---------+
|                   |
+--------v--------+ +--------v--------+
|  RegionProfile  | |  Environment    |
|      Card       | |    Metrics      |
+-----------------+ +-----------------+



### Layer Responsibilities

* **`types/`**: TypeScript interfaces defining data structures (`FarmLocation`, `EnvironmentalMetrics`).
* **`constants/`**: Immutable data fallbacks and mock data.
* **`hooks/`**: Encapsulated state management, side effects, and `localStorage` syncing.
* **`components/ui/`**: Low-level design system primitives (Buttons, Inputs, Cards).
* **`components/layout/`**: Global site headers, footers, and navigation wrappers.
* **`components/dashboard/`**: High-level feature-specific widgets.
* **`app/`**: Lightweight Next.js route endpoints that assemble components into views.












agronos-frontend/
├── app/                        # App Router Pages & Layouts ONLY
│   ├── (auth)/                 # Route Group for Auth (login/signup share layout)
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── (dashboard)/            # Route Group for Dashboard Layouts
│   │   ├── dashboard/
│   │   │   └── page.tsx        # Clean & tiny page (~30 lines)
│   │   ├── recommendations/
│   │   │   └── page.tsx
│   │   └── rotation/
│   │       └── page.tsx
│   ├── layout.tsx              # Root Layout
│   └── globals.css             # Base Styles
│
├── components/                 # UI Component Library
│   ├── ui/                     # Low-level primitives (Design System)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   ├── layout/                 # Global UI layouts
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   └── Footer.tsx
│   └── dashboard/              # Feature-specific high-level components
│       ├── EnvironmentMetrics.tsx
│       ├── FarmLocationForm.tsx
│       ├── ProfileDropdown.tsx
│       └── RegionProfileCard.tsx
│
├── hooks/                      # Custom React Hooks
│   ├── useFarmLocation.ts      # Manages local storage & state for farm location
│   ├── useTheme.ts             # Dark mode logic
│   └── useEnvMetrics.ts        # Data fetching logic
│
├── lib/                        # Utility functions & API clients
│   ├── utils.ts                # Helper functions (e.g., class names, formatters)
│   └── api.ts                  # Axios/Fetch client configuration
│
├── types/                      # TypeScript Interface Definitions
│   ├── farm.ts                 # Location & metric type definitions
│   └── user.ts                 # User profile types
│
└── constants/                  # Constant configuration variables
    └── farmData.ts             # Default mock metrics or initial state