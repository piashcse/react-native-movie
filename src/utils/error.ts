export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') {
    return error;
  }

  if (error && typeof error === 'object') {
    const candidate = error as {
      message?: string;
      data?: { message?: string; status_message?: string } | string;
    };
    if (typeof candidate.data === 'string') {
      return candidate.data;
    }
    return (
      candidate.data?.message ??
      candidate.data?.status_message ??
      candidate.message ??
      'Something went wrong. Please try again.'
    );
  }

  return 'Something went wrong. Please try again.';
};
