interface InputProps {
  placeholder?: string;
  value?: string;
  type?: string;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  type = "text",
  onChange,
  disabled,
  label,
}) => {
  return (
    <div className="w-full">
      {label && (
        <p className="text-xl text-white font-semibold mb-2">{label}</p>
      )}
      <input
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="
        px-2
        form-input
        bg-transparent
        block 
        w-full 
        border-0 
        py-1.5 
        text-white 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        placeholder:text-gray-400 
        focus:ring-2 
        focus:ring-inset 
        focus:primary
        sm:text-sm 
        sm:leading-6
        "
      />
    </div>
  );
};

export { Input };
