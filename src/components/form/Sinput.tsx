/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";

type TInputProps = {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  step?: string;
  className?: string;
  disabled?: boolean;
  rules?: any;
  valueAsNumber?: boolean;
};

export default function Sinput({
  type = "text",
  name,
  label,
  placeholder,
  step,
  className,
  disabled = false,
  rules,
  valueAsNumber = false,
}: TInputProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...rules,
        ...(valueAsNumber && { valueAsNumber: true }),
      }}
      render={({ field, fieldState: { error } }) => {
        // Handle number inputs specifically
        let value = field.value;
        
        if (type === 'number') {
          // Convert undefined/null to empty string for number inputs
          if (value === undefined || value === null) {
            value = '';
          }
          // Ensure value is not NaN
          if (isNaN(value)) {
            value = '';
          }
        } else {
          // For non-number inputs, convert undefined/null to empty string
          value = value === undefined || value === null ? '' : value;
        }

        return (
          <div className={cn("space-y-2", className)}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              {...field}
              type={type}
              id={name}
              value={value}
              placeholder={placeholder}
              step={step}
              disabled={disabled}
              onChange={(e) => {
                if (type === 'number' && valueAsNumber) {
                  // Handle number input with valueAsNumber
                  const numValue = e.target.valueAsNumber;
                  field.onChange(isNaN(numValue) ? undefined : numValue);
                } else if (type === 'number') {
                  // Handle number input without valueAsNumber
                  field.onChange(e.target.value);
                } else {
                  // Handle text inputs
                  field.onChange(e.target.value);
                }
              }}
              className={cn(
                error && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {error && (
              <FormMessage>
                {error.message}
              </FormMessage>
            )}
          </div>
        );
      }}
    />
  );
}