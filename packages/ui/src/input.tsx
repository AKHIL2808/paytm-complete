import { ChangeEventHandler } from "react";

interface Inputype {
  label: string;
  placeholder: string;
  type?: string;
  className?:string
  onchange: ChangeEventHandler<HTMLInputElement>;
}

export function Input({ label, placeholder, type, onchange }: Inputype) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
      </div>
      <div>
        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type={type || "text"}
          placeholder={placeholder}
          onChange={onchange}
        />
      </div>
    </div>
  );
}
