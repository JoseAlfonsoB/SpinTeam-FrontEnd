import React from 'react';
import Label from '../atoms/Label';
import Input from '../atoms/Input';

export default function FormField({
    label,
    id,
    required = false,
    error,
    icon,
    ...props
}) {
    return (
        <div className="w-full flex flex-col">
            {/* Reutilizamos el Átomo Label */}
            {label && (
                <Label htmlFor={id} required={required}>
                    {label}
                </Label>
            )}

            {/* Reutilizamos el Átomo Input pasando el icono y el estado de error */}
            <Input
                id={id}
                icon={icon}
                error={!!error}
                {...props}
            />

            {/* Mensaje de error del campo */}
            {error && (
                <span className="text-xs text-red-500 mt-1 font-medium animate-pulse">
                    {error}
                </span>
            )}
        </div>
    );
}