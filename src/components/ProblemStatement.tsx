import type { Problem } from '../data/types';

export default function ProblemStatement({ problem }: { problem: Problem }) {
  return (
    <article className="statement">
      <h2 className="statement-title">{problem.title}</h2>
      <p className="statement-complexity">
        Target complexity: <code>{problem.complexity}</code>
      </p>
      <p className="statement-description">{problem.description}</p>
    </article>
  );
}
