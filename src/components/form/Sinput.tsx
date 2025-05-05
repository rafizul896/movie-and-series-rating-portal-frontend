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
    register?: any;
    error?: any;
    rules?: any;
  };
  
  export default function Sinput({
    type = "text",
    name,
    label,
    placeholder,
    step,
    className,
    disabled = false,
    register,
    error,
    rules,
  }: TInputProps) {
    const methods = useFormContext();
    const form = methods || { control: undefined };
  
    if (register) {
      // If register is passed directly (for non-Controller inputs)
      return (
        <div className={cn("space-y-2", className)}>
          {label && <Label htmlFor={name}>{label}</Label>}
          <Input
            type={type}
            id={name}
            placeholder={placeholder}
            step={step}
            disabled={disabled}
            className={cn(
              error && "border-destructive focus-visible:ring-destructive"
            )}
            {...register(name, rules)}
          />
          {error && <FormMessage>{error.message}</FormMessage>}
        </div>
      );
    }
  
    // Default Controller-based implementation
    return (
      <Controller
        name={name}
        control={form.control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <div className={cn("space-y-2", className)}>
            {label && <Label htmlFor={name}>{label}</Label>}
            <Input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              step={step}
              disabled={disabled}
              className={cn(
                error && "border-destructive focus-visible:ring-destructive"
              )}
            />
            {error && <FormMessage>{error.message}</FormMessage>}
          </div>
        )}
      />
    );
  }