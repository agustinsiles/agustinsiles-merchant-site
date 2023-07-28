import React, { useState } from "react";
import FieldRenderer from "./FieldRenderer";
import type { SchemaType, SiteProperties, SiteType } from "../schema/page";
import { FormProvider, useForm } from "react-hook-form";

interface FormProps {
  data: SiteType;
  schema: SchemaType;
  onSubmitCb: () => void;
}

const Form: React.FC<FormProps> = ({
  data = {} as SiteType,
  schema,
  onSubmitCb,
}) => {
  const [requestError, setRequestError] = useState(false);
  const methods = useForm({
    defaultValues: data,
    mode: "onChange",
  });
  const disableSubmit =
    !methods.formState.isValid || methods.formState.isSubmitting;

  const handleFormSubmit = methods.handleSubmit(async (data) => {
    const operation = await fetch("/api/site", {
      method: "POST",
      body: JSON.stringify(data),
    });

    setRequestError(!operation.ok);

    if (operation.ok) {
      onSubmitCb();
    } else {
      console.log(operation);
    }
  });

  return (
    <div>
      <FormProvider {...methods}>
        <form
          className="space-y-8"
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          noValidate
        >
          {Object.keys(schema.properties).map((fieldName: SiteProperties) => (
            <FieldRenderer
              key={fieldName}
              fieldName={fieldName}
              schema={schema}
            />
          ))}
          <div>
            <button
              disabled={disableSubmit}
              className={`py-2 px-4  text-white rounded-md focus:ring-2 focus:ring-offset-2 ${
                !disableSubmit
                  ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                  : "bg-gray-200"
              }`}
            >
              {methods.formState.isSubmitting ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </FormProvider>
      {requestError && (
        <div className="text-red-800  text-center bold">
          Oops! There was an error with the operation. Please try again.
        </div>
      )}
    </div>
  );
};

export default Form;
