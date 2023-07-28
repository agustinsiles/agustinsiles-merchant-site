import React from "react";
import type { SchemaType, SiteProperties } from "../schema/page";
import { Controller, useFormContext } from "react-hook-form";
import FieldLabel from "./FieldLabel";
import ErrorMessage from "./ErrorMessage";

interface FieldRendererProps {
  fieldName: SiteProperties;
  schema: SchemaType;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({ fieldName, schema }) => {
  const required = schema.required.indexOf(fieldName) > -1;
  const { control, formState } = useFormContext();
  const { title, type, placeholder, requiredErrorMsg } =
    schema.properties[fieldName];

  if (type === "string") {
    return (
      <div key={fieldName} className="mb-4">
        <FieldLabel fieldName={fieldName} required={required} title={title} />
        <Controller
          name={fieldName}
          control={control}
          rules={{
            required: requiredErrorMsg,
          }}
          render={({ field }) => (
            <input
              {...field}
              className={`mt-1 px-4 py-2 block w-full border rounded-md shadow-sm sm:text-sm ${
                formState.errors[fieldName]
                  ? "bg-red-900"
                  : "focus:ring-blue-500 focus:border-blue-500"
              }`}
              placeholder={placeholder}
            />
          )}
        />
        <ErrorMessage name={fieldName} errors={formState.errors} />
      </div>
    );
  }

  if (type === "text") {
    return (
      <div key={fieldName} className="mb-4">
        <FieldLabel fieldName={fieldName} required={required} title={title} />
        <Controller
          name={fieldName}
          control={control}
          rules={{
            required: requiredErrorMsg,
          }}
          render={({ field }) => (
            <textarea
              {...field}
              rows={8}
              className="mt-1 px-4 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder={placeholder}
            />
          )}
        />
        <ErrorMessage name={fieldName} errors={formState.errors} />
      </div>
    );
  }

  if (type === "boolean") {
    return (
      <div key={fieldName} className="mb-4">
        <div className="flex items-center">
          <Controller
            name={fieldName}
            control={control}
            render={({ field }) => (
              <input
                {...field}
                id={fieldName}
                type="checkbox"
                className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
            )}
          />
          <FieldLabel fieldName={fieldName} required={required} title={title} />
        </div>
      </div>
    );
  }

  // we don't support this input type
  return null;
};

export default FieldRenderer;
