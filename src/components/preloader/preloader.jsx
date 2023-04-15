import { TailSpin } from "react-loader-spinner";
import styles from "./preloader.module.css";

function Preloader() {
  return (
    <div className={styles.preloader_container}>
      <TailSpin
        height="80"
        width="80"
        color="#4ffae9"
        ariaLabel="tail-spin-loading"
        radius="1"
        visible={true}
      />
    </div>
  );
}

export default Preloader;