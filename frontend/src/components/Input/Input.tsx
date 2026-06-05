interface InputProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  label,
  name,
  value,
  type = "text",
  onChange
}: InputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="font-medium text-gray-700"> {label} </label>
      <input
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
    </div>
  );
}