export default function CartItem(props) {

  return (
    <>
      <div className="flex items-center">
        <img
          className="h-full w-[50px] object-contain rounded-lg"
          src={props.imgSrc}
          alt=""
        />
        <div className="px-2">
          <div>{props.name}</div>
          <div>
            <span>{props.price}</span> x{" "}
            <span>
              {props.quantity} <span>{props.total}</span>
            </span>
          </div>
        </div>
        <img
          className="object-contain ml-auto "
          src={"../../images/icon-delete.svg"}
          alt=""
        />
      </div>
    </>
  );
}
