import React, { ChangeEvent } from "react";
import type { SchemaType, SiteProperties } from "../schema/page";

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
  const { title, type, placeholder } = schema.properties[fieldName];

  if (type === "string") {
    return (
      <div key={fieldName} className="mb-4">
        <label htmlFor={fieldName} className="block text-gray-700">
          {title}
        </label>
        <input
          type="text"
          id={fieldName}
          name={fieldName}
          value={value}
          onChange={handleInputChange}
          className="mt-1 px-4 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder={placeholder}
        />
      </div>
    );
  }

  if (type === "text") {
    return (
      <div key={fieldName} className="mb-4">
        <label htmlFor={fieldName} className="block text-gray-700">
          {title}
        </label>
        <textarea
          id={fieldName}
          name={fieldName}
          rows={8}
          value={value}
          onChange={handleInputChange}
          className="mt-1 px-4 py-2 block w-full border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder={placeholder}
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
            id={fieldName}
            name={fieldName}
            value={value}
            onChange={handleInputChange}
            className="mr-2 focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label htmlFor={fieldName} className="block text-gray-700">
            {title}
          </label>
        </div>
      </div>
    );
  }

  // we don't support this input type
  return null;
};

export default FieldRenderer;
