interface InputProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  placeholder?: string;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  onBlur?: (
    e: React.FocusEvent<HTMLInputElement>
  ) => void;

  disabled?: boolean;
}

export function Input({
  label,
  name,
  value,
  type = "text",
  onChange,
  placeholder,
  onBlur,
  disabled = false,
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-gray-700"> {label} </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}