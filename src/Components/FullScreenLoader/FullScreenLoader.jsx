// components/FullScreenLoader/GlobalLoaderPortal.jsx
import ReactDOM from 'react-dom';
import { useLoader } from '../../Context/LoaderContext';
import './FullScreenLoader.css';

const FullScreenLoader = () => {
    const { loading } = useLoader();

    if (!loading) return null;

    return ReactDOM.createPortal(
        <div className="loader-backdrop">
            <div className="loader-spinner"></div>
        </div>,
        document.getElementById('loader-root') || document.body
    );
};

export default FullScreenLoader;
