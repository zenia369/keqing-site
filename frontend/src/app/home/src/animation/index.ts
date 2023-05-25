import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { AnimationNodes } from '../constants'

gsap.registerPlugin(ScrollTrigger)

const TL = gsap.timeline({ defaults: { duration: 0.75, ease: 'power1.out' } })

TL.fromTo(
  AnimationNodes.mainPhoto,
  {
    x: '-200px',
    opacity: 0.3,
  },
  {
    x: '0',
    opacity: 1,
  },
  '<'
)
TL.fromTo(
  AnimationNodes.mainText,
  { x: '50px', opacity: 0.3 },
  { x: '0', opacity: 1 },
  '<'
)

// ScrollTrigger
gsap.set(AnimationNodes.pictures, {
  opacity: 0.1,
  scale: 0.8,
})
gsap.to(AnimationNodes.pictures, {
  scrollTrigger: AnimationNodes.pictures,
  opacity: 1,
  immediateRender: false,
  duration: 1.5,
  scale: 1,
})

gsap.set(AnimationNodes.kInfo, {
  opacity: 0.6,
  y: '50px',
})
gsap.to(AnimationNodes.kInfo, {
  scrollTrigger: AnimationNodes.kInfo,
  opacity: 1,
  y: '0',
  immediateRender: false,
  duration: 1,
})
