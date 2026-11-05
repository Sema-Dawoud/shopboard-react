const API_BASE_URL = '/api';

export class ApiError extends Error {
  readonly status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export async function fetchJson(path: string): Promise<unknown> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`);
  } catch {
    throw new ApiError('Unable to connect to the product service.');
  }

  if (!response.ok) {
    throw new ApiError(
      `The product service returned ${response.status}.`,
      response.status,
    );
  }

  try {
    const body: unknown = await response.json();
    return body;
  } catch {
    throw new ApiError('The product service returned invalid JSON.');
  }
}
