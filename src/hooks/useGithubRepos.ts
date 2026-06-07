import { useState, useEffect } from 'react'
import { fetchGithubRepos } from '@/lib/github'
import type { Project } from '@/types'

const CACHE_KEY = 'pandxy_github_repos'
const CACHE_DURATION = 60 * 60 * 1000

function mapRepoToProject(repo: any): Project {
  return {
    id: String(repo.id),
    name: repo.name,
    description: repo.description || 'Tidak ada deskripsi',
    url: repo.html_url,
    demo_url: repo.homepage || undefined,
    tags: [repo.language].filter(Boolean),
    stars: repo.stargazers_count,
    language: repo.language || 'Unknown',
  }
}

export function useGithubRepos(username: string) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!username) {
      setLoading(false)
      return
    }

    async function loadRepos() {
      try {
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const { data, timestamp } = JSON.parse(cached)
          if (Date.now() - timestamp < CACHE_DURATION) {
            setProjects(data)
            setLoading(false)
            return
          }
        }

        const repos = await fetchGithubRepos(username)
        const mapped = repos.map(mapRepoToProject)
        setProjects(mapped)

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: mapped, timestamp: Date.now() })
        )
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Gagal memuat repositori')
      } finally {
        setLoading(false)
      }
    }

    loadRepos()
  }, [username])

  return { projects, loading, error }
}
