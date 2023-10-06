import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Toast.module.scss";

type ToastProps = {
  message: string;
  showToast: boolean;
  setShowToast: Dispatch<SetStateAction<boolean>>;
};

const Toast = ({
  message,
  showToast,
  setShowToast,
}: ToastProps): JSX.Element => {
  const [checkInactive, setInactive] = useState(false);

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setInactive(true);
        setShowToast(false);
      }, 3000);
    }
  }, [showToast]);

  return (
    <div
      className={`${styles.toast} ${
        showToast
          ? styles["toast--active"]
          : checkInactive
          ? styles["toast--inactive"]
          : ""
      }`}
    >
      <span className={styles.toast__message}>{message}</span>
    </div>
  );
};

export default Toast;
