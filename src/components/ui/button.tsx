import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium duration-700 transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-size-200 bg-pos-0 hover:bg-pos-100",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-blue shadow hover:bg-blue hover:text-white font-bold",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input text-blue bg-transparent shadow-sm hover:scale-[105%]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-primary hover:text-secondary",
        link: "text-transparent bg-gradient-to-r from-blue to-primary bg-clip-text hover:text-primary rounded-none underline-offset-4 font-bold border-b-2 border-transparent hover:border-primary text-2xl",
        vote: " hover:text-gold focus:text-gold",
        group:
          "shadow-xl border-2 border-dashed border-blue text-blue hover:border-solid hover:bg-blue hover:text-white font-bold flex flex-col items-center justify-center",
        decision:
          "shadow-inner border-blue border-2 bg-white/50 hover:bg-blue hover:text-white text-blue hover:scale-[106%] font-bold text-2xl",
      },
      size: {
        default: "h-9 p-3",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        decision: "h-80",
        group: "p-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
