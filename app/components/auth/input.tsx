import { Eye, EyeOff, type LucideIcon } from "lucide-react";
import { useState, type ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  label: string;
  icon: LucideIcon;
  type: "text" | "email" | "password";
}

export default function Input({
  label,
  icon: Icon,
  type,
  id,
  name,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      <label
        htmlFor={id || name}
        className="block mb-2 text-sm text-slate-600 lg:text-base cursor-pointer"
      >
        {label}
      </label>
      <div className="flex items-center gap-3 border p-2 rounded border-gray-300 focus-within:border-main transition-colors">
        <Icon className="text-gray-500 lg:size-7" />

        <input
          {...props}
          id={id || name}
          name={name}
          type={inputType}
          className="w-full outline-none lg:text-lg bg-transparent"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="focus:outline-none"
          >
            {showPassword ? (
              <EyeOff className="text-gray-500 lg:size-6 cursor-pointer" />
            ) : (
              <Eye className="text-gray-500 lg:size-6 cursor-pointer" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
