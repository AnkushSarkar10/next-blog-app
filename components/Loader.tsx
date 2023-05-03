interface IShow {
    show: Boolean;
}

export default function Loader({ show }: IShow) {
    return show ? (
        <div
            className="inline-block h-14 w-14 animate-spin rounded-full border-[10px] border-blue-600 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    ) : null;
}
