# ShopBoard - Project Guidelines

## Project Overview

ShopBoard is a skincare store built with React, TypeScript, and Vite.

## Development Rules

1. Use React functional components and TypeScript.
2. Define clear TypeScript interfaces for component props.
3. Keep components small, reusable, and focused.
4. Keep product and cart logic inside their respective modules.
5. Keep cart data persistent using localStorage.
6. Use semantic HTML and accessible labels.
7. Use mobile-first responsive CSS.
8. Avoid `any`, type assertions, and non-null assertions.
9. Do not add dependencies without a clear need.
10. Run build, lint, and formatting checks after changes.

## Code Quality

- Use clear English names for files, variables, and functions.
- Follow the existing project structure.
- Avoid duplicated logic.
- Handle loading, error, empty, and success states.
- Explain every code change and why it is needed.

## Lessons Learned from Debugging

1. Always provide a unique and stable key when rendering lists. Prefer item IDs over array indexes.
2. Use explicit numeric conditions such as `stock > 0` in JSX instead of `stock &&` to avoid rendering zero.
3. Never use array indexes as keys when list items can be reordered.
4. Never mutate the original array when sorting. Create a copy using `[...items].sort()`.
5. Never mutate React state directly. Always create new arrays and objects when updating state.
