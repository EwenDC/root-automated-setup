import classNames from "classnames";
import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  Icon?: React.ElementType;
  iconLeft?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, onClick, Icon, iconLeft, children, ...props }, ref) => {
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

Button.defaultProps = {
  iconLeft: false,
};

export default Button;
