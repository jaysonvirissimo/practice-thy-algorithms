interface StatementProblem {
  title: string;
  description: string;
  /** Omitted for analysis problems, where it could give away an answer. */
  complexity?: string;
  /** A procedure to analyze (analysis problems only). */
  code?: string;
}

export default function ProblemStatement({
  problem,
}: {
  problem: StatementProblem;
}) {
  return (
    <article className="statement">
      <h2 className="statement-title">{problem.title}</h2>
      {problem.complexity && (
        <p className="statement-complexity">
          Target complexity: <code>{problem.complexity}</code>
        </p>
      )}
      <p className="statement-description">{problem.description}</p>
      {problem.code && (
        <pre className="statement-code">
          <code>{problem.code}</code>
        </pre>
      )}
    </article>
  );
}
