import { InputType } from "../types/Input"

const Input: React.FC<InputType> = ({
	name,
	placeholder,
	type,
	fullwidth,
	onChange
}) => {
	return (
		<div className={`${fullwidth && "w-full"} my-4`}>
			<input
				className={` transition-all py-[12px] md:py-[14px] px-[16px] md:px-[20px] text-[12px] lg:text-[14px] 
                   w-full rounded-[25px]  
                   border-t border-l border-r 
				 bg-[#EBEBEB] ring-1 
                 focus:ring-green-500 outline-none 
                   hover:ring-offset-2 ring-white font-[550]
				 text-neutral-600
				   ${type === "password" ? "select-none" : ""} `}
				type={type}
				placeholder={placeholder}
				name={name}
				onChange={onChange}
			/>
		</div>
	)
}

export default Input