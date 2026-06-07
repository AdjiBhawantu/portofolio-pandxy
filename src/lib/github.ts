export async function fetchGithubRepos(username: string, perPage = 6) {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github.v3+json',
  }
  if (token) headers.Authorization = `Bearer ${token}`

  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage * 3}`,
    { headers }
  )

  if (!res.ok) throw new Error('Failed to fetch repos')

  const repos = await res.json()
  return repos
    .filter((r: any) => !r.fork)
    .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
    .slice(0, perPage)
}
