# MiyakoStay improvement plan

This roadmap turns the technical review into small, independently testable changes. Each item should be delivered in its own branch and commit, pass the quality checks, and be verified on Vercel before it is marked complete.

- [x] 1. Make client-side routes reliable on Vercel with an SPA rewrite, a configuration test, and deployment documentation.
- [ ] 2. Fix the Google photo fallback so an unconfigured query is not presented as permanently loading; add regression tests.
- [ ] 3. Add GitHub Actions CI for clean install, lint, tests, and production build; expose the result in README.
- [ ] 4. Add the advertised MIT license and audit repository badges and metadata.
- [ ] 5. Move tests to Vitest and React Testing Library while preserving domain coverage and adding component tests.
- [ ] 6. Reduce Google Places work with viewport-based loading, controlled concurrency, and a documented cache strategy.
- [ ] 7. Improve accessibility and internationalization: synchronize the document language, localize photo attribution, and audit keyboard/ARIA behavior.
- [ ] 8. Add essential SEO metadata and document the indexing limits of a client-rendered SPA.
- [ ] 9. Replace parallel localized amenity arrays with one structurally safe data model and migrate the catalog.
- [ ] 10. Store filters in the URL so searches are shareable and browser Back/Forward navigation works predictably.
- [ ] 11. Add persistent, accessible favorites backed by Zustand and localStorage.
- [ ] 12. Perform a final production audit covering dependencies, bundle size, core journeys, deployment health, and README accuracy.

## Delivery rules

1. Complete only one numbered item per working day.
2. Keep every item in a dedicated branch, commit, and pull request.
3. Run `npm run lint`, `npm test`, and `npm run build` before publication.
4. Do not mark an item complete until its implementation and tests are in the same commit.
5. After merge, wait for Vercel to report a ready deployment and verify the affected user journey.
6. Report what changed, why the design was selected, how it was tested, remaining risks, and how to explain the decision in an interview.
