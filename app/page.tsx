import { ProfileCardPreview } from "@/app/profile-card-preview"
import { OpenInV0Button } from "@/components/open-in-v0-button"
import { HelloWorld } from "@/registry/new-york/blocks/inta-hello-world/inta-hello-world"

export default function Route() {
  return (
    <div className="mx-auto flex min-h-svh max-w-3xl flex-col gap-8 px-4 py-8">
      <header className="flex flex-col gap-1">
        <h1 className="font-bold text-3xl tracking-tight">Custom Registry</h1>
        <p className="text-muted-foreground">
          A custom registry for distributing code using shadcn.
        </p>
      </header>
      <main className="flex flex-1 flex-col gap-8">
        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-muted-foreground text-sm sm:pl-3">
              A simple hello world component
            </h2>
            <OpenInV0Button name="hello-world" className="w-fit" />
          </div>
          <div className="relative flex min-h-[400px] items-center justify-center">
            <HelloWorld />
          </div>
          <div>
            <code>
              {
                "bunx --bun shadcn@latest add https://interactive-inc.github.io/open-registry/r/hello-world.json"
              }
            </code>
          </div>
        </div>
        <div className="relative flex min-h-[450px] flex-col gap-4 rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-muted-foreground text-sm sm:pl-3">
              A profile card component
            </h2>
            <OpenInV0Button name="profile-card" className="w-fit" />
          </div>
          <ProfileCardPreview />
          <div>
            <code>
              {
                "bunx --bun shadcn@latest add https://interactive-inc.github.io/open-registry/r/profile-card.json"
              }
            </code>
          </div>
        </div>
      </main>
    </div>
  )
}
