import { FaArrowRight } from "react-icons/fa";

const OutlineButton = ({ onClick, buttonTxt, buttonIcon: ButtonIcon }) => {
    return (
        <button
            onClick={onClick}
            className="px-6 py-3 border border-purple-600 hover:border-purple-500 rounded-full text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 flex items-center justify-center gap-2"
        >
            <ButtonIcon className="text-sm" />
            <span>{buttonTxt}</span>
            <FaArrowRight />
        </button>
    );
};

export default OutlineButton;
