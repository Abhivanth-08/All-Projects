
import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  animationStyle?: "pulse" | "float" | "bounce" | "glowing" | "ripple";
}

const animationVariants = {
  pulse: "hover:animate-[pulse_1.5s_ease-in-out_infinite] hover:shadow-lg active:animate-none",
  float: "transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:shadow-none",
  bounce: "transition-transform after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-white after:rounded-md after:opacity-0 hover:after:opacity-20 after:transform after:scale-150 after:animate-ping active:after:animate-none hover:animate-bounce active:animate-none",
  glowing: "relative overflow-hidden transition-all before:absolute before:bg-white before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-0 before:h-0 before:opacity-0 before:rounded-full hover:before:w-[250%] hover:before:h-[250%] hover:before:opacity-20 before:transition-all before:duration-500 active:before:opacity-0",
  ripple: "relative overflow-hidden transition-all active:bg-opacity-90 after:content-[''] after:absolute after:rounded-[50%] after:bg-white after:opacity-0 hover:shadow-lg hover:after:animate-[ripple_0.6s_ease-in-out]",
};

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ className, animationStyle = "pulse", children, ...props }, ref) => {
    return (
      <Button
        className={cn(
          "transition-all relative overflow-hidden", 
          animationVariants[animationStyle], 
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
