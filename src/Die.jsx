export default function Die(props) {
    return (
        <div 
            className={"die" + (props.isFrozen ? " frozen" : "")}
            onClick={props.toggleDie}
        >
            {props.value}
        </div>
    )
}
