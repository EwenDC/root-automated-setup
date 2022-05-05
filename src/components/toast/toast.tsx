import { useTranslation } from "react-i18next";
import styles from "./toast.module.css";
import { ReactComponent as CloseIcon } from "../../images/close.svg";
import { useAppDispatch, useAppSelector } from "../hooks";
import { selectSetupParameters, setErrorMessage } from "../../features";
import { useState } from "react";
import classNames from "classnames";

export const Toast: React.FC = () => {
  const { errorMessage } = useAppSelector(selectSetupParameters);
  // Cache the error message to allow us to continue displaying it as we transition
  const [cachedMessage, setCachedMessage] = useState(errorMessage);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // Update the cached message if a new one came through
  if (errorMessage != null && errorMessage !== cachedMessage)
    setCachedMessage(errorMessage);

  return (
    <div
      className={classNames(styles.anchor, { [styles.hidden]: !errorMessage })}
      aria-hidden={!errorMessage}
      aria-live="assertive"
    >
      <div className={styles.container}>
        <span id="appError" className={styles.message}>
          {cachedMessage && t(cachedMessage)}.
        </span>
        <button
          className={styles.close}
          title={t("label.closeMessage")}
          onClick={() => dispatch(setErrorMessage(null))}
          disabled={!errorMessage}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};
