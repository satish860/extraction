import { TabsContent } from "@/components/ui/tabs"
import { ExtractionTable } from "@/components/extraction-table"

export default function Home() {
  return (
    <div>
      <TabsContent value="build">
        <ExtractionTable />
      </TabsContent>
      <TabsContent value="review">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Review</h1>
          <p>Review content goes here</p>
        </div>
      </TabsContent>
      <TabsContent value="automate">
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Automate</h1>
          <p>Automate content goes here</p>
        </div>
      </TabsContent>
    </div>
  )
}
