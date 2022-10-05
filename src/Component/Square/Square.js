import "./Square.css"

import Button from '@mui/material/Button';

const Square = (props) => {
    return (
        <Button 
          variant="contained"
          className={"square" + (props.isBold ? " bold-square" : "") 
                          + (props.isHighlight ? " highlight-square" : "")
                          + (props.value === "X" ? " x-color" : " o-color" )} 
          onClick={props.onClick}>
          {props.value}
        </Button>
    );
}
 
export default Square;