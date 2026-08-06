"use client"

import { Github } from "lucide-react"
import { useRef, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

type Props = {
  name: string
  title: string
  bio: string
  avatarUrl: string
  githubUrl?: string
  watermark?: string
  watermarkPosition?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center"
  className?: string
}

type TiltState = {
  rotateX: number
  rotateY: number
  glareX: number
  glareY: number
  isHovering: boolean
}

const WATERMARK_POSITION_CLASS: Record<string, string> = {
  "top-left": "top-3 left-4",
  "top-right": "top-3 right-4",
  "bottom-left": "bottom-3 left-4",
  "bottom-right": "bottom-3 right-4",
  center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
}

const DEFAULT_TILT: TiltState = {
  rotateX: 0,
  rotateY: 0,
  glareX: 50,
  glareY: 50,
  isHovering: false,
}

export function IntaProfileCard(props: Props) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<TiltState>(DEFAULT_TILT)

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height
    setTilt({
      rotateX: (0.5 - y) * 20,
      rotateY: (x - 0.5) * 20,
      glareX: x * 100,
      glareY: y * 100,
      isHovering: true,
    })
  }

  function handleMouseLeave() {
    setTilt(DEFAULT_TILT)
  }

  const cardTransition = tilt.isHovering
    ? "transform 150ms ease-out, box-shadow 150ms ease-out"
    : "transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 600ms cubic-bezier(0.34, 1.56, 0.64, 1)"

  const cardShadow = tilt.isHovering
    ? `${tilt.rotateY * -0.5}px ${tilt.rotateX * 0.5}px 20px rgba(0,0,0,0.25)`
    : "0px 8px 20px rgba(0,0,0,0.15)"

  const cardTransform = tilt.isHovering
    ? `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    : "rotateX(5deg) rotateY(-3deg) scale3d(1, 1, 1)"

  const glareBackground = tilt.isHovering
    ? `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.25) 0%, transparent 60%)`
    : "none"

  const watermarkClass =
    WATERMARK_POSITION_CLASS[props.watermarkPosition ?? "bottom-right"]

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: mouse events are decorative (3D tilt effect)
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: "800px" }}
    >
      <Card
        className={`relative w-full max-w-sm overflow-hidden ${props.className ?? ""}`}
        style={{
          transformStyle: "preserve-3d",
          transition: cardTransition,
          boxShadow: cardShadow,
          transform: cardTransform,
        }}
      >
        <CardHeader className="flex flex-row items-center gap-4 pt-8 pb-0">
          <div className="shrink-0 rounded-full border-2 border-border p-1">
            {/* biome-ignore lint/performance/noImgElement: static export does not support next/image */}
            <img
              src={props.avatarUrl}
              alt={props.name}
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="text-lg">{props.name}</CardTitle>
            <CardDescription className="text-xs">{props.title}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-8 text-center">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {props.bio}
          </p>
        </CardContent>
        {props.githubUrl ? (
          <CardFooter className="justify-center pb-8">
            <a
              href={props.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-muted-foreground text-sm transition-colors hover:bg-accent hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              {"GitHub"}
            </a>
          </CardFooter>
        ) : null}
        {props.watermark ? (
          <span
            className={`pointer-events-none absolute select-none font-semibold text-sm uppercase tracking-widest opacity-[0.03] ${watermarkClass}`}
          >
            {props.watermark}
          </span>
        ) : null}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-150"
          style={{
            background: glareBackground,
            opacity: tilt.isHovering ? 1 : 0,
            transition: "opacity 200ms ease-out",
          }}
        />
      </Card>
    </div>
  )
}
