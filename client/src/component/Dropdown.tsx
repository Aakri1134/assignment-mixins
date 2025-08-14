type InputDropdownProps = {
  className : string
    ref: React.RefObject<HTMLSelectElement | null>
  options: { value: string; label: string }[]
}

export default function Dropdown({ options, ref, className }: InputDropdownProps) {
  return (
    <select ref={ref} className={`w-72 rounded-md p-2 ${className}`}>
      <option className=" text-gray-600" value="" disabled>
        Select Branch
      </option>
      {options.map((option) => (
        <option className="text-gray-600" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
