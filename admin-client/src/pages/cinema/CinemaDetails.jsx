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
      <div className="flex justify-center items-center h-[60vh] text-muted-foreground">
        Loading cinema details...
      </div>
    )
  }




  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">

      {/* Header */}
      <div className="text-center space-y-1">
        <PageHeader title={currentCinema.name} />
        <p className="text-sm text-muted-foreground">
          {currentCinema.location.name},{" "}
          {currentCinema.location.city},{" "}
          {currentCinema.location.state}
        </p>
      </div>

      {/* Seat Type Legend */}
      <div className="flex justify-center gap-3">
        <Badge className="bg-gray-100">Regular</Badge>
        <Badge className="bg-yellow-300 text-black">Premium</Badge>
        <Badge className="bg-purple-300 text-black">VIP</Badge>
      </div>

      {/* Screens Tabs */}
      {currentCinema.screens?.length > 0 && (
        <Tabs value={activeScreen} onValueChange={setActiveScreen}>

          <TabsList className="mb-4">
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
      )}


      {/* Add Screen Button */}
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Screen</Button>
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
