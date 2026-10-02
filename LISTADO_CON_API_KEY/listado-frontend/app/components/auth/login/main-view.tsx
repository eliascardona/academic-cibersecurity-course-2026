import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useActionData, useFetcher, useSubmit } from "react-router";
import { toast } from "sonner";
import { FormTrigger } from "~/components/forms/form-submission-trigger";
import type { LoginCommand } from "~/lib/login/request-types";
import {
    FieldTypeEnum,
    type FieldConfig,
} from "~/lib/various/form-retrieving/types";
import { triggerLoginAction } from "~/lib/various/form-submission/login/action-triggers";
import type { action } from "~/routes/login";

export function MainViewLogin() {
    const actionData = useActionData<typeof action>();
    const submit = useSubmit();

    const formFields: FieldConfig[] = [
        {
            name: "username",
            label: "Enter you Distinguished Name",
            type: FieldTypeEnum.enum.text,
            order: 1,
        },
        {
            name: "password",
            label: "Enter you password",
            type: FieldTypeEnum.enum.pass,
            order: 2,
        },
    ];

    useEffect(() => {
        if (actionData?.success) {
            toast.success("Iniciaste sesión con éxito");
            console.log(actionData.response?.access_token);
        }
    }, [actionData?.success]);

    function createBookWrapper(data: any) {
        console.log('data from HF', data);

        const loginCommand: LoginCommand = {
            username: data.username,
            password: data.password,
        };

        triggerLoginAction(loginCommand, submit);
    }

    const form = useForm();

    return (
        <div className="grid w-full place-items-center pt-8">
            <div className="w-1/2 rounded border">
                <h2 className="text-xl font-medium">
                    Ingresa tus credenciales
                </h2>
                <FormProvider {...form}>
                    <FormTrigger
                        formId="login-form"
                        containerClassName="border border-gray-100"
                        className="py-6 px-4"
                        fieldArray={formFields}
                        onSubmit={createBookWrapper}
                        disabled={false}
                    />
                </FormProvider>
            </div>
        </div>
    );
}
