import classNames from "classnames";
import React from "react";
import styles from "./button.module.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  Icon?: React.ElementType;
  iconLeft?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, disabled, onClick, Icon, iconLeft, children, ...props },
    ref
  ) => {
    const renderIconLeft = Icon && iconLeft;
    const renderIconRight = Icon && !iconLeft;
    const buttonIcon = Icon && <Icon className={styles.icon} />;
    return (
      <button
        {...props}
        ref={ref}
        className={classNames(styles.wrapper, className, {
          [styles.disabled]: disabled,
        })}
        onClick={disabled ? undefined : onClick}
      >
        {renderIconLeft ? buttonIcon : null}
        {children && (
          <span
            className={classNames({
              [styles.labelRight]: renderIconLeft,
              [styles.labelLeft]: renderIconRight,
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
