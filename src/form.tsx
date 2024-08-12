import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { obtenerCombinacionesTransiciones } from "@/lib/combinaciones-transiciones"
import { ComplexDotConverter } from "@/lib/complexDotConverter"
import { formatearTransiciones } from "@/lib/formatearTransiciones"
import { SimpleDotConverter } from "@/lib/simpleDotConverter"
import { cn } from "@/lib/utils"
import useDataStore from "@/store/useDataStore"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { convertirAFDAArreglo } from "./lib/formatearSimplificarAfd"
import { simplificarAFDtest } from "./lib/simplificarAfd"
import { convertirArregloAAFD } from "./lib/transicionarAFD"

const formSchema = z.object({
  alphabet: z.string(),
  states: z.string(),
  initialState: z.string(),
  finalStates: z.string(),
  transitions: z
    .array(
      z.object({
        value: z.string(),
      })
    )
})

type FormValues = z.infer<typeof formSchema>

const defaultValues: Partial<FormValues> = {
  states: "q0,q1,q2",
  initialState: "q0",
  finalStates: "q2",
  alphabet: "0,1",
  transitions: [
    { value: "q0,0,q0" },
    { value: "q0,0,q1" },
    { value: "q0,1,q0" },
    { value: "q1,0,q2" },
    { value: "q1,1,q0" },
    { value: "q1,1,q2" },
    { value: "q2,0, " },
    { value: "q2,1, " },
  ],
}

export default function AutomataForm() {
  const {
    setStates,
    setAlphabet,
    setInitialState,
    setFinalStates,
    setTransitions,
    setGrafoOriginal,
    setGrafoResultante,
    setResumeTransitions,
  } = useDataStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "transitions",
    control: form.control,
  })

  function onSubmit(data: FormValues) {
    const states = data.states.split(",")
    const alphabet = data.alphabet.split(",")
    const initialState = data.initialState
    const finalStates = data.finalStates.split(",")

    const transitions = formatearTransiciones(data.transitions)
    const transicionesCombinadas = obtenerCombinacionesTransiciones(transitions)

    setGrafoResultante("")

    const grafoOriginal = SimpleDotConverter(transitions, initialState, finalStates)


    setStates(states)
    setAlphabet(alphabet)
    setInitialState(initialState)
    setFinalStates(finalStates)
    setTransitions(transicionesCombinadas)
    setGrafoOriginal(grafoOriginal)


    toast.success("Datos guardados correctamente")

    //
    console.log("Transiciones completas", transicionesCombinadas)

    const afdsilvana = convertirArregloAAFD(transicionesCombinadas)
    const afdsilvanafinal = simplificarAFDtest(afdsilvana, initialState)

    const afdsilvanafinalfinal = convertirAFDAArreglo(afdsilvanafinal)

    const grafoResultante = ComplexDotConverter(afdsilvanafinalfinal, initialState)
    setGrafoResultante(grafoResultante)

    setResumeTransitions(afdsilvanafinalfinal)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <FormField
          control={form.control}
          name="alphabet"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lenguaje</FormLabel>
              <FormDescription>
                Añade los simbolos separados por comas, por ejemplo: 0,1
              </FormDescription>
              <FormControl>
                <Input placeholder="0,1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="states"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estados</FormLabel>
              <FormDescription>
                Añade los estados separados por comas, ejemplo: q0, q1
              </FormDescription>
              <FormControl>
                <Input placeholder="q0, ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="initialState"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado Inicial</FormLabel>
              <FormDescription>
                Añade el estado inicial, por defecto es q0
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="finalStates"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estados Finales</FormLabel>
              <FormDescription>
                Añade los estados finales separados por comas, ejemplo: q0, q1
              </FormDescription>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`transitions.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Transiciones
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Añade las transiciones de cada estado separadas por comas,
                    utilizando el siguiente formato: estado, simbolo, estado,
                    por ejemplo: q0,0,q1
                    Si necesitas poner un conjunto vacio da un espacio
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex gap-2 mt-2">
            <Button
              variant="outline"
              onClick={() => append({ value: "" })}
            >
              Añadir transicion
            </Button>

            <Button
              variant="outline"
              onClick={() => remove(fields.length - 1)}
            >
              Eliminar transicion
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full">
          Generar AFN
        </Button>
      </form>
    </Form>
  )
}