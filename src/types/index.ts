export interface Project {
  id: string
  name: string
  description: string
  url: string
  demo_url?: string
  tags: string[]
  stars: number
  language: string
  image_url?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Skill {
  name: string
  category: 'Frontend' | 'Backend' | 'Tools' | 'Design'
  level: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar_url?: string
  rating: number
}
