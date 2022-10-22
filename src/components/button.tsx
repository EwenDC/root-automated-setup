import classNames from "classnames";
import { forwardRef } from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  Icon?: React.ElementType;
  iconLeft?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, onClick, Icon, iconLeft = false, children, ...props }, ref) => {
    const renderIconLeft = Icon && iconLeft;
    const renderIconRight = Icon && !iconLeft;
    const buttonIcon = Icon && <Icon className="label-icon" />;
    return (
      <button
        {...props}
        ref={ref}
        className={classNames("button", { disabled }, className)}
        onClick={disabled ? undefined : onClick}
      >
        {renderIconLeft ? buttonIcon : null}
        {children && (
          <span
            className={classNames("label", {
              right: renderIconLeft,
              left: renderIconRight,
            })}
          >
            {children}
          </span>
        )}
        {renderIconRight ? buttonIcon : null}
      </button>
    );
  }
);

export default Button;
