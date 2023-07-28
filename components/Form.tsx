import React, { useState, ChangeEvent, FormEvent } from "react";
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
  const methods = useForm();
  const [formData, setFormData] = useState<SiteType>(data);
  const handleFormSubmit = methods.handleSubmit(async (data) => {
    const operation = await fetch("/api/site", {
      method: "POST",
      body: JSON.stringify(data),
    });

    if (operation.ok) {
      onSubmitCb();
    } else {
      console.log(operation);
    }
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;
    const fieldValue =
      type === "checkbox" ? (event.target as HTMLInputElement).checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  return (
    <FormProvider {...methods}>
      <form
        className="space-y-8"
        onSubmit={(e) => e.preventDefault()}
        noValidate
      >
        {Object.keys(schema.properties).map((fieldName: SiteProperties) => (
          <FieldRenderer
            key={fieldName}
            value={formData[fieldName]}
            fieldName={fieldName}
            schema={schema}
            handleInputChange={handleInputChange}
          />
        ))}
        <div>
          <button
            onClick={handleFormSubmit}
            disabled={!methods.formState.isValid}
            className={`py-2 px-4  text-white rounded-md focus:ring-2 focus:ring-offset-2 ${
              methods.formState.isValid
                ? "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
                : "bg-gray-200 hover:bg-gray-300 focus:ring-gray-200"
            }`}
          >
            Submit
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
