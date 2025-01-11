

import clsx from "clsx";
import { IButtonProps } from "../types/Input";

const Button: React.FC<IButtonProps> = ({
    type,
    fullWidth,
    onClick,
    disabled,
    loading,
    danger,
    secondary,
    children,
}) => {
    return (
        <button
            type={type}
            disabled={loading}
            onClick={onClick}
            className={clsx(
                `
        flex
        justify-center
        gap-3  
        px-3
        py-4
        text-sm
        font-semibold
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
    
        shadow-lg
        whitespace-nowrap
        my-4
        rounded-[25px]
        bg-[#57BB45]
          
    `,

                fullWidth && "w-full",

                secondary &&
                "bg-slate-300 text-black hover:bg-neutral-400 hover:text-white active:bg-pink-400 active:scale-95",
                // danger &&
                // "bg-[rgb(38,37,78)] hover:bg-[rgb(64,63,134)] text-white focus-visible:outline-blue-600  dark:bg-slate-800",

                !secondary &&
                !danger &&
                " text-white  hover:bg-[#449436] transition active:bg-green-500 hover:text-white focus-visible:outline-[rgb(89,100,199)]",

                disabled && "opacity-50 bg-red-500 cursor-default"
            )}
        >
            {children}

            {loading && <div className="animate-spin">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
                    <path d="M 25 5 C 14.351563 5 5.632813 13.378906 5.054688 23.890625 C 5.007813 24.609375 5.347656 25.296875 5.949219 25.695313 C 6.550781 26.089844 7.320313 26.132813 7.960938 25.804688 C 8.601563 25.476563 9.019531 24.828125 9.046875 24.109375 C 9.511719 15.675781 16.441406 9 25 9 C 29.585938 9 33.699219 10.925781 36.609375 14 L 34 14 C 33.277344 13.988281 32.609375 14.367188 32.246094 14.992188 C 31.878906 15.613281 31.878906 16.386719 32.246094 17.007813 C 32.609375 17.632813 33.277344 18.011719 34 18 L 40.261719 18 C 40.488281 18.039063 40.71875 18.039063 40.949219 18 L 44 18 L 44 8 C 44.007813 7.460938 43.796875 6.941406 43.414063 6.558594 C 43.03125 6.175781 42.511719 5.964844 41.96875 5.972656 C 40.867188 5.988281 39.984375 6.894531 40 8 L 40 11.777344 C 36.332031 7.621094 30.964844 5 25 5 Z M 43.03125 23.972656 C 41.925781 23.925781 40.996094 24.785156 40.953125 25.890625 C 40.488281 34.324219 33.558594 41 25 41 C 20.414063 41 16.304688 39.074219 13.390625 36 L 16 36 C 16.722656 36.011719 17.390625 35.632813 17.753906 35.007813 C 18.121094 34.386719 18.121094 33.613281 17.753906 32.992188 C 17.390625 32.367188 16.722656 31.988281 16 32 L 9.71875 32 C 9.507813 31.96875 9.296875 31.96875 9.085938 32 L 6 32 L 6 42 C 5.988281 42.722656 6.367188 43.390625 6.992188 43.753906 C 7.613281 44.121094 8.386719 44.121094 9.007813 43.753906 C 9.632813 43.390625 10.011719 42.722656 10 42 L 10 38.222656 C 13.667969 42.378906 19.035156 45 25 45 C 35.648438 45 44.367188 36.621094 44.945313 26.109375 C 44.984375 25.570313 44.800781 25.039063 44.441406 24.636719 C 44.078125 24.234375 43.570313 23.996094 43.03125 23.972656 Z"></path>
                </svg>
            </div>}
        </button>
    );
};

export default Button;
