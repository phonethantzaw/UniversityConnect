import { useLocation} from 'react-router-dom';

export function useRouteMatch(paths) {
    const location = useLocation();
    return paths.some(path => path === location.pathname);

}