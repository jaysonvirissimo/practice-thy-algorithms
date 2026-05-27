// Ambient declaration for the single-source-of-truth JSON imported via the
// `@shared` Vite alias. Declaring the module here lets `tsc -b` type the import
// without pulling a file outside `src/` into the project's rootDir/include.
declare module '@shared/problems.json' {
  import type { RawProblem } from './types';
  const value: Record<string, RawProblem>;
  export default value;
}
