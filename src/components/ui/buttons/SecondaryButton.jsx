const SecondaryButton = ({ onClick, buttonTxt, buttonIcon: ButtonIcon }) => {
    return (
        <button
            onClick={onClick}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-full text-white font-medium flex items-center justify-center gap-2 transition-all duration-300"
        >
            <ButtonIcon className="text-sm" />
            <span>{buttonTxt}</span>
        </button>
    );
};

export default SecondaryButton;
