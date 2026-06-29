interface SelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}

export function Select({
  label,
  name,
  value,
  onChange,
  options
}: SelectProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-gray-700"> {label} </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-red-500" >
        <option value=""> Selecione </option>
        {options.map((option) => ( <option key={option} value={option}> {option} </option> ))}
      </select>
    </div>
  );
}