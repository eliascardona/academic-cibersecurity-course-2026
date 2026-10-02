import { useEffect } from "react";
import {
  FieldTypeEnum,
  type FieldConfig,
} from "~/lib/various/form-retrieving/types";
import { FormTrigger } from "../forms/form-submission-trigger";
import { useActionData, useSubmit } from "react-router";
import { triggerBookCreation } from "~/lib/various/form-submission/chat/action-triggers";
import type { action } from "~/routes/create-book";
import type { CreatedBookDto } from "~/lib/book/response-types";
import { toast } from "sonner";

const createBookFields: FieldConfig[] = [
  {
    name: "title",
    label: "Title",
    type: FieldTypeEnum.enum.text,
    order: 1,
  },
  {
    name: "description",
    label: "Description",
    type: FieldTypeEnum.enum.text,
    order: 2,
  },
];

export function MainViewBookCreation() {
  // const [username, setUsername] = useState<AvailableUsername | null>(null);
  const submit = useSubmit();

  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData?.success) {
      toast.success("Libro creado con éxito", {
        description: (actionData.data as CreatedBookDto).bookId,
        duration: 2000,
      });
    }
  }, [actionData?.success]);

  function createBookWrapper(data: any) {
    const createBookCommand = {
      title: data.title,
      description: data.description,
    };

    triggerBookCreation(createBookCommand, submit);
  }

  return (
    <div className="space-y-8 pt-8">
      <h1 className="text-3xl">Sección para registrar libros</h1>

      <h2 className="text-xl">Crea un libro nuevo</h2>
      <span className="text-lg text-muted-foreground">
        Introduce sus datos básicos
      </span>

      <FormTrigger
        formId="create-book"
        containerClassName="border border-gray-100"
        className="py-6 px-4"
        fieldArray={createBookFields}
        onSubmit={createBookWrapper}
        disabled={false}
      />

      {/* <div className="mx-auto grid w-1/2 grid-cols-2 gap-2">
        <div
          className={cn(
            "cursor-pointer rounded-md border p-4 text-center",
            username != null && username === "Fulanito"
              ? "border-sky-100 bg-sky-50"
              : "",
          )}
          onClick={() => setUsername("Fulanito")}
        >
          Fulanito
        </div>

        <div
          className={cn(
            "cursor-pointer rounded-md border p-4 text-center",
            username != null && username === "Fulanita"
              ? "border-sky-100 bg-sky-50"
              : "",
          )}
          onClick={() => setUsername("Fulanita")}
        >
          Fulanita
        </div>
      </div> */}
    </div>
  );
}
