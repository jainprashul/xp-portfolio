export type HistoryPushResult = {
  stack: string[]
  index: number
}

export function normalizeUrl(input: string): string {
  const trimmed = input.trim()
  if (!trimmed) {
    return trimmed
  }

  // Relative / root-relative paths (e.g. ./resume.pdf, /resume.pdf)
  if (
    trimmed.startsWith('./') ||
    trimmed.startsWith('../') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  ) {
    return trimmed
  }

  // Already has a scheme (http:, https:, blob:, data:, etc.)
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    return trimmed
  }

  return `https://${trimmed}`
}

export function isPdfUrl(url: string): boolean {
  const withoutHash = url.split('#')[0] ?? url
  const withoutQuery = withoutHash.split('?')[0] ?? withoutHash
  return withoutQuery.toLowerCase().endsWith('.pdf')
}

export function pushHistory(
  stack: string[],
  index: number,
  url: string,
): HistoryPushResult {
  const truncated = stack.slice(0, index + 1)
  if (truncated[truncated.length - 1] === url) {
    return { stack: truncated, index: truncated.length - 1 }
  }
  const next = [...truncated, url]
  return { stack: next, index: next.length - 1 }
}
