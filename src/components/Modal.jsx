import { useNavigate } from 'react-router-dom';
import classes from "./Module.module.css";

// Burada onClose'u kaldırırsak, div: Link değil; tıklayınca action oluşuyor.
// o yüzden manuel olarak navigation kısmını halletmeliyiz : PROGRAMMATIC NAVIGATION

function Modal({
    children, 
    // onClose
}){
    
    const navigate = useNavigate();

    function closeHandler(){
        navigate('..'); // cd .. ile aynı şekilde. 1 route yukarı çıkar.
    }

    return(
        <>
            <div 
                className={classes.backdrop} 
                // onClick={onClose}
                onClick={closeHandler}
            />
            
            <dialog 
                className={classes.modal} 
                open
                >

                {children}
            
            </dialog>
        </>
    )
};

export default Modal;