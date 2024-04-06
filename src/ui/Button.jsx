import { Link } from "react-router-dom"

function Button({ children, disabled, to, type }) {

    


    const base = 'bg-yellow-400 uppercase font-semibold text-stone-800 tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:bg-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';
    
    const styles = {
        primary: base + ' px-4 py-3 sm:px-6 sm:py-4',

        small: base + ' py-2 px-4 md:py-2.5 md:px-5 text-xs'
    }
    
    if (to) return <Link className={styles[type]} to={to}>{ children}</Link>
    
    return (
        <button to={to} disabled={disabled} className={styles[type]} >
            {children}
        </button>
    )
}

export default Button
