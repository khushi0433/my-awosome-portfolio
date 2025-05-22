export function handleError(error: unknown, contextMessage = "An error occurred") {
  console.error(contextMessage, error);
  const message = error instanceof Error ? error.message : String(error);
  return {
    status: 500,
    body: { error: message || contextMessage },
  };
}
