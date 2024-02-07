import { Vortex } from 'react-loader-spinner';
import styles from './Loader.module.css';

export const Loader = () => {
    return(
        <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass={styles.Loader}
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
            />)
}

