import { Card, CardContent } from "@/components/ui/card";
import { Graphviz } from "graphviz-react";
import Tabla from "./components/tables/table";
import AutomataForm from "./form";
import useDataStore from "./store/useDataStore";

export default function App() {
  const { grafoOriginal, grafoResultante, transitions, alphabet, resumeTransitions } = useDataStore()

  return (
    <main className="grid gap-10 grid-cols-1 md:grid-cols-12 m-4 md:m-12">
      <Card className="md:col-span-5">
        <CardContent>
          <p className="text-xl font-bold mt-7 mb-5">Datos de tu AFN</p>
          <AutomataForm />
        </CardContent>
      </Card>

      <Card className="md:col-span-7">
        <CardContent className="grid gap-5 py-5">
          <p className="text-xl font-bold">Grafo Inicial (AFN)</p>
          <Graphviz dot={grafoOriginal} />

          <p className="text-xl font-bold">Tabla de transiciones</p>
          <Tabla transitions={transitions} alphabet={alphabet} />

          {resumeTransitions && (
            <>
              <p className="text-xl font-bold">Tabla resumida</p>
              <Tabla transitions={resumeTransitions} alphabet={alphabet} />
            </>
          )}

          <p className="text-xl font-bold">Grafo Resultante (AFD)</p>
          <Graphviz dot={grafoResultante} />

        </CardContent>
      </Card>
    </main>
  )
}