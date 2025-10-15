import { useParams } from 'react-router-dom';

const Recipe = () => {
    const { id } = useParams();
    return <div>Recipe ID: {id}</div>;
};

export default Recipe;

