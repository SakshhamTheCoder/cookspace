import { Link } from 'react-router-dom';

const Button = ({ to, children, ...props }) => {
    if (to) {
        return (
            <Link to={to} className="primary-button" {...props}>
                {children}
            </Link>
        );
    }
    return (
        <button className="primary-button" {...props}>
            {children}
        </button>
    );
};

export default Button;

