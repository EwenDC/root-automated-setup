import classNames from "classnames";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  Icon?: React.ElementType;
  iconLeft?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  disabled,
  onClick,
  Icon,
  iconLeft = false,
  children,
  ref,
  ...props
}) => {
  const renderIconLeft = Icon && iconLeft;
  const renderIconRight = Icon && !iconLeft;
  const buttonIcon = Icon && <Icon className="label-icon" />;

  return (
    <button
      {...props}
      ref={ref}
      className={classNames("button", { disabled }, className)}
      aria-disabled={disabled}
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
};

export default Button;
