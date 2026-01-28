# TanStack Query Guild Session Presentation

An interactive tutorial and presentation application for learning TanStack Query v5 (React Query), now converted to a lightning-fast **Vite + React** setup.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Mock Server (Port 5000)
TanStack Query needs a real API to show off its magic. We use `json-server` to mock the backend.
```bash
npm run server
```

### 3. Start the Development Server (Port 5173)
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to start the presentation.

---

## 📚 Presentation Flow

The presentation is structured as a series of interactive sections:

| Section | Topic | Path |
|---------|-------|------|
| 1 | Client vs Server State | `/state-management` |
| 2 | Introduction to TanStack Query | `/what-is-tanstack-query` |
| 3 | The Problems with useEffect | `/problems-with-use-effect` |
| 4 | Basic useQuery Demo | `/basic-react-query` |
| 5 | Query Key Factory Pattern | `/query-keys` |
| 6 | Debounced Search Query | `/search-query` |
| 7 | Infinite Scroll Implementation | `/infinite-query` |
| 8 | Mutations & Optimistic Updates | `/mutations` |
| 9 | Caching & Stale Time Mastery | `/caching` |
| 10 | The Complete Terminology Glossary | `/terminology` |

---

## 🎯 Key Features Demonstrated

- **Side-by-side comparisons**: Directly compare standard `useEffect` bugs with TanStack Query solutions.
- **Interactive Demos**: Live environments for testing caching, invalidation, and optimistic updates.
- **Simulated Network Conditions**: Built-in 2.5s delays and random errors to show how the library handles real-world chaos.
- **React Query DevTools**: Integrated and open by default to inspect your cache in real-time.
- **Smooth UX Patterns**: Stabilized lists using `clientId` keys and manual cache updates to eliminate "shaking".

---

## 🛠️ Presentation Tips

### Before the Session
1. Ensure `npm run server` is running.
2. Have the **React Query DevTools** tray visible (floating button at bottom).
3. Open the browser **Network** tab to show data deduplication and background refetches.

### Great Talking Points
- **Zero Boilerplate**: Notice how much code we removed when switching from `useEffect` to `useQuery`.
- **Query Keys**: Use the factory pattern in `src/lib/query-keys.ts` to manage your keys centrally.
- **Smart Caching**: Demonstrate how `staleTime` prevents redundant requests while exploring the app.
- **Optimistic Updates**: Show the instant feedback when posting a comment, and the smooth rollback if the server fails.

---

## 📁 Project Structure

```
src/
├── pages/                 # Interactive presentation routes
│   ├── home/              # Hero page
│   ├── basic-react-query/ # Simple useQuery examples
│   ├── infinite-query/    # Infinite scroll & custom hooks
│   └── ...                # Other tutorial topics
├── components/
│   ├── ui/                # Premium shadcn/ui components
│   └── navigation-card.tsx
├── lib/
│   ├── query-keys.ts      # Query key factory (important!)
│   └── fetch-utils.ts     # API wrappers
├── providers/
│   └── ReactQueryProvider.tsx
└── types.ts               # Shared TypeScript definitions
```

---

## 📦 Tech Stack

- **Core**: React 19 + Vite 6
- **Routing**: React Router 7
- **Query Library**: @tanstack/react-query v5
- **DevTools**: @tanstack/react-query-devtools
- **Backend Mocking**: json-server v1 (beta)
- **Styling**: Tailwind CSS 4 + Lucide Icons

---

## 📖 Additional Resources

- [TanStack Query Documentation](https://tanstack.com/query/latest/docs)
- [Official Examples](https://tanstack.com/query/latest/docs/framework/react/examples/react/basic)
- [Community Discord](https://discord.com/invite/tanstack)
