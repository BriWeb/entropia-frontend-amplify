interface ErrorMessageProps {
  error: unknown;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  if (!error) return null;

  return (
    <div style={styles.container}>
      <p style={styles.error}>{String(error)}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
  },
  error: {
    color: "#b00020",
    fontSize: "1rem",
    fontWeight: 500,
  },
};
