interface FieldLabelProps {
  fieldName: string;
  title: string;
  required: boolean;
}

const FieldLabel: React.FC<FieldLabelProps> = ({
  fieldName,
  title,
  required,
}) => (
  <label htmlFor={fieldName} className="block text-gray-700">
    {title} {required && "*"}
  </label>
);

export default FieldLabel;
