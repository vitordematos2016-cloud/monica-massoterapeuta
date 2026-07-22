export interface Service {
  id: string
  slug: string
  name: string
  shortSummary: string
  fullDescription: string
  benefits: string[]
  indicatedFor: string
  image: string
  imageAlt: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface Objective {
  id: string
  label: string
  description: string
  serviceSlugs: string[]
  isFallback?: boolean
}

export interface ProcessStep {
  id: string
  order: number
  title: string
  description: string
}

export interface GalleryImage {
  id: string
  src: string
  alt: string
  caption?: string
}

export interface Testimonial {
  id: string
  authorName: string
  text: string
  rating: 1 | 2 | 3 | 4 | 5
  source: 'google' | 'instagram' | 'facebook' | 'presencial'
}

export interface BookingFormData {
  name: string
  phone: string
  preferredDay: string
  preferredPeriod: 'manha' | 'tarde' | 'noite' | ''
  notes: string
  consent: boolean
}
