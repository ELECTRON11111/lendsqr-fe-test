const Card = (props: {
    imgSrc: string, 
    title: string, 
    numbers: string | number, 
    className?: string
}) => {
    return (
        <div className='card'>
            <img src={props.imgSrc} alt='card icon'/>
            <p>{props.title}</p>
            <h3>{props.numbers}</h3>
        </div>
    );
}

export default Card;
