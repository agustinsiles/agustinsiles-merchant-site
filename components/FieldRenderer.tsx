import React, { ChangeEvent } from "react";
import type { SchemaType, SiteProperties } from "../schema/page";
import { useFormContext } from "react-hook-form";
import FieldLabel from "./FieldLabel";

interface FieldRendererProps {
  fieldName: SiteProperties;
  schema: SchemaType;
  value: string;
  handleInputChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  fieldName,
  schema,
  value,
  handleInputChange,
}) => {
  const { register } = useFormContext();
  const { title, type, placeholder } = schema.properties[fieldName];
  const required = schema.required.indexOf(fieldName) > -1;
  const inputProps = {
    id: fieldName,
    name: fieldName,
    value,
    placeholder,
  };

  if (type === "string") {
    return (
      <div key={fieldName} className="mb-4">
        <FieldLabel fieldName={fieldName} required={required} title={title} />
        <input
          type="text"
          required={true}
          className="mt-1 px-4 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          id={fieldName}
          value={value}
          {...register(fieldName, {
            onChange: handleInputChange,
            required: {
              value: true,
              message: "required",
            },
          })}
        />
      </div>
    );
  }

  if (type === "text") {
    return (
      <div key={fieldName} className="mb-4">
        <FieldLabel fieldName={fieldName} required={required} title={title} />
        <textarea
          rows={8}
          className="mt-1 px-4 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          {...inputProps}
          {...register(fieldName, {
            onChange: handleInputChange,
            required: {
              value: true,
              message: "required",
            },
          })}
        ></textarea>
      </div>
    );
  }

  if (type === "boolean") {
    return (
      <div key={fieldName} className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
            {...inputProps}
            {...register(fieldName, {
              onChange: handleInputChange,
              required: {
                value: true,
                message: "required",
              },
            })}
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
