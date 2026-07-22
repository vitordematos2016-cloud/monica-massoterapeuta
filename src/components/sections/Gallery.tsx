import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { Modal } from '../ui/Modal'
import { galleryImages } from '../../data/gallery'

export function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeImage = activeIndex !== null ? galleryImages[activeIndex] : null

  if (galleryImages.length === 0) {
    return (
      <section className="bg-sand py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Ambiente"
            title="O espaço que recebe você"
            description="Estamos preparando uma galeria com fotografias reais do ambiente. Em breve, este espaço mostrará os detalhes que tornam cada atendimento especial."
          />
          <Reveal>
            <div className="mt-12 flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-sand-dark bg-cream/60 py-16 text-ink-soft/70">
              <ImageIcon size={28} strokeWidth={1.25} />
              <p className="text-sm">Galeria em preparação</p>
            </div>
          </Reveal>
        </Container>
      </section>
    )
  }

  return (
    <section className="bg-sand py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Ambiente" title="O espaço que recebe você" />

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((image, index) => (
            <Reveal key={image.id} delayMs={(index % 4) * 80}>
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="block aspect-square w-full overflow-hidden rounded-2xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Modal isOpen={!!activeImage} onClose={() => setActiveIndex(null)} labelledBy="gallery-modal-title">
        {activeImage && (
          <div className="p-4">
            <h3 id="gallery-modal-title" className="sr-only">
              {activeImage.alt}
            </h3>
            <img src={activeImage.src} alt={activeImage.alt} className="w-full rounded-2xl object-contain" />
            {activeImage.caption && <p className="mt-3 text-center text-sm text-ink-soft">{activeImage.caption}</p>}
          </div>
        )}
      </Modal>
    </section>
  )
}
