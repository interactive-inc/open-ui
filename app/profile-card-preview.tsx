"use client"

import { useState } from "react"
import { IntaProfileCard } from "@/registry/new-york/blocks/inta-profile-card/inta-profile-card"

const COLOR_PRESETS = [
  { label: "Default", card: "", border: "" },
  { label: "Blue", card: "bg-blue-950", border: "border-blue-800" },
  { label: "Green", card: "bg-emerald-950", border: "border-emerald-800" },
  { label: "Purple", card: "bg-purple-950", border: "border-purple-800" },
  { label: "Rose", card: "bg-rose-950", border: "border-rose-800" },
  { label: "Amber", card: "bg-amber-950", border: "border-amber-800" },
] as const

export function ProfileCardPreview() {
  const [colorIndex, setColorIndex] = useState(0)
  const [showGithub, setShowGithub] = useState(true)
  const [watermark, setWatermark] = useState("Acme Inc.")
  const [watermarkPosition, setWatermarkPosition] = useState<
    "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  >("bottom-right")

  const preset = COLOR_PRESETS[colorIndex]
  const cardClassName = [preset.card, preset.border].filter(Boolean).join(" ")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 px-2">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">{"Color:"}</span>
          <div className="flex gap-1.5">
            {COLOR_PRESETS.map((preset, index) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => setColorIndex(index)}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  index === colorIndex
                    ? "border-foreground bg-foreground text-background"
                    : "border-border text-muted-foreground hover:border-foreground"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
        <label className="flex items-center gap-2 text-muted-foreground text-sm">
          <input
            type="checkbox"
            checked={showGithub}
            onChange={() => setShowGithub(!showGithub)}
            className="accent-foreground"
          />
          {"GitHub link"}
        </label>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">{"Watermark:"}</span>
          <input
            type="text"
            value={watermark}
            onChange={(event) => setWatermark(event.target.value)}
            placeholder="Company name"
            className="rounded-md border border-border bg-transparent px-2 py-1 text-foreground text-xs placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">{"Position:"}</span>
          <select
            value={watermarkPosition}
            onChange={(event) =>
              setWatermarkPosition(
                event.target.value as typeof watermarkPosition,
              )
            }
            className="rounded-md border border-border bg-transparent px-2 py-1 text-foreground text-xs"
          >
            <option value="top-left">{"Top Left"}</option>
            <option value="top-right">{"Top Right"}</option>
            <option value="bottom-left">{"Bottom Left"}</option>
            <option value="bottom-right">{"Bottom Right"}</option>
            <option value="center">{"Center"}</option>
          </select>
        </div>
      </div>
      <div className="relative flex min-h-[400px] items-center justify-center">
        <IntaProfileCard
          name="John Doe"
          title="Software Engineer"
          bio="Building great software with passion. Love open source and community-driven development."
          avatarUrl="https://github.com/github.png"
          githubUrl={showGithub ? "#" : undefined}
          watermark={watermark || undefined}
          watermarkPosition={watermarkPosition}
          className={cardClassName}
        />
      </div>
    </div>
  )
}
