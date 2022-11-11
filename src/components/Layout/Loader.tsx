import styles from "./Loader.module.css";
import LoaderIcon from "../../assets/img/loader.png";

const Loader = () => (
    <div className={styles.scanner}>
        <img src={LoaderIcon} alt="LoaderIcon" className={styles.loaderIcon} />
        <h1>Loading...</h1>
    </div>
);

export default Loader