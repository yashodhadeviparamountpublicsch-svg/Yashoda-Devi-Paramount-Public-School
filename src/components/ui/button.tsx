import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'accent' | 'destructive';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                    {
                        "bg-gradient-primary text-primary-foreground shadow hover:opacity-90 transition-opacity": variant === "default",
                        "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80": variant === "secondary",
                        "bg-accent text-accent-foreground shadow-sm hover:bg-accent/80": variant === "accent",
                        "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90": variant === "destructive",
                        "border border-input bg-transparent shadow-sm hover:bg-muted hover:text-muted-foreground": variant === "outline",
                        "hover:bg-muted hover:text-foreground": variant === "ghost",
                        "h-9 px-4 py-2 text-sm": size === "default",
                        "h-8 rounded-md px-3 text-xs": size === "sm",
                        "h-11 rounded-md px-8 text-base": size === "lg",
                        "h-9 w-9": size === "icon",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
