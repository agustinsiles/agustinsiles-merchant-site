import React, { useState, ChangeEvent, FormEvent } from "react";
import FieldRenderer from "./FieldRenderer";
import type { SchemaType, SiteProperties } from "../schema/page";

interface FormProps {
  schema: SchemaType;
  onSubmitCb: () => void;
}

const Form: React.FC<FormProps> = ({ schema, onSubmitCb }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const operation = await fetch("/api/site", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (operation.ok) {
      onSubmitCb();
    } else {
      console.log(operation);
    }
  };

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
    <form className="space-y-8" onSubmit={handleFormSubmit}>
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
          type="submit"
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;
