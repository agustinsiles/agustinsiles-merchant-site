import React from "react";
import { SiteProperties } from "../schema/page";
import { FieldErrors, FieldValues } from "react-hook-form";

interface IProps {
  name: SiteProperties;
  errors: FieldErrors<FieldValues>;
}
const ErrorMessage: React.FC<IProps> = ({ name, errors }) => {
  const error = errors[name];

  if (!error) return null;

  return <span className="text-red-800 bold">{error.message!}</span>;
};

export default ErrorMessage;
