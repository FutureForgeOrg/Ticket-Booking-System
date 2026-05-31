import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useCinemaStore from "@/store/cinema.store"

import PageHeader from "@/components/common/PageHeader"
import ScreenSeatLayout from "@/components/cinema/ScreenSeatLayout"
import ScreenForm from "@/components/cinema/ScreenForm"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function CinemaDetails() {
  const { id } = useParams()
  const [activeScreen, setActiveScreen] = useState(null);
  const [open, setOpen] = useState(false);

  const { currentCinema, getCinemaById, addScreenToCinema } = useCinemaStore()

  useEffect(() => {
    getCinemaById(id)
  }, [id])

  useEffect(() => {
    if (currentCinema?.screens?.length) {
      setActiveScreen(currentCinema.screens[0].name);
    }
  }, [currentCinema]);

  if (!currentCinema) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-muted-foreground text-sm">
        Loading cinema details...
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <div className="text-center space-y-1.5">
        <PageHeader title={currentCinema.name} />
        <p className="text-sm text-text-secondary">
          {currentCinema.location.name},{" "}
          {currentCinema.location.city},{" "}
          {currentCinema.location.state}
        </p>
      </div>

      {/* Seat Type Legend */}
      <div className="flex justify-center gap-2">
        <Badge className="bg-canvas text-text-primary border border-border hover:bg-canvas font-normal px-3 py-1">Regular</Badge>
        <Badge className="bg-warning/10 text-warning border border-warning/20 hover:bg-warning/10 font-normal px-3 py-1">Premium</Badge>
        <Badge className="bg-primary/10 text-primary border border-primary/20 hover:bg-primary/10 font-normal px-3 py-1">VIP</Badge>
      </div>

      {/* Screens Tabs */}
      {currentCinema.screens?.length > 0 && (
        <div className="rounded-xl border border-border bg-surface p-5 shadow-sm">
          <Tabs value={activeScreen} onValueChange={setActiveScreen}>
            <TabsList className="mb-5">
              {currentCinema.screens.map((s) => (
                <TabsTrigger key={s._id} value={s.name}>
                  {s.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {currentCinema.screens.map((s) => (
              <TabsContent key={s._id} value={s.name}>
                <ScreenSeatLayout screen={s} />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}

      {/* Add Screen */}
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>+ Add Screen</Button>
          </DialogTrigger>

          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Screen</DialogTitle>
            </DialogHeader>

            <ScreenForm
              onSubmit={async (data) => {
                await addScreenToCinema(id, data);
                await getCinemaById(id);
                setOpen(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

    </div>
  )
}

export default CinemaDetails