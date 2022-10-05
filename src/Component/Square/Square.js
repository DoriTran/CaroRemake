import "./Square.css"

const Square = (props) => {
    return (
        <button className={"square" + (props.isBold ? " bold-square" : "") + (props.isHighlight ? " highlight-square" : "")} onClick={props.onClick}>
          {props.value}
        </button>
    );
}
 
export default Square;